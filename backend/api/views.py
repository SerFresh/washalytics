from django.http import JsonResponse
from django.contrib.auth.hashers import make_password, check_password
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken, BlacklistedToken
import pandas as pd
from .models import Customer, Machine, Usage, Maintenance, Expense
from .serializers import CustomerSerializer, MachineSerializer, UsageSerializer, MaintenanceSerializer, ExpenseSerializer
from .utils import load_excel, save_excel
from django.views.decorators.csrf import csrf_exempt
import json
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
import os
from rest_framework.permissions import IsAuthenticated
from .models import Customer
from .serializers import CustomerSerializer

#มีอีกทีคือบรรทัด301 pathอะ
# ✅ Path ไฟล์ Excel
FILE_PATH = r'C:\Users\Modmint\Desktop\washalytics\washalytics.xlsx'


# ✅ ดึงข้อมูล Home ตาม CustomerID
def get_home_data(request, customer_id):
    try:
        print(f"🔍 Fetching data for CustomerID: {customer_id}")  # ✅ Debug log

        df = pd.read_excel(FILE_PATH, sheet_name="home", engine="openpyxl")

        print("📂 Columns in Excel:", df.columns)  # ✅ เช็กว่ามีคอลัมน์อะไรบ้าง
        print("👀 First 5 Rows:", df.head())  # ✅ ดูข้อมูลตัวอย่าง

        if "CustomerID" not in df.columns:
            return JsonResponse({"error": "Column 'CustomerID' not found"}, status=400)

        df["CustomerID"] = df["CustomerID"].astype(int)  # 🔹 แปลงเป็น int เพื่อให้เช็คค่าได้ถูกต้อง

        user_data = df[df["CustomerID"] == int(customer_id)][["photo", "Owner_name"]]

        if user_data.empty:
            print("❌ User Not Found in Excel!")  # ✅ Debug log
            return JsonResponse({"error": "User not found"}, status=404)

        print("✅ User Data Found:", user_data.to_dict(orient="records"))  # ✅ Debug log
        return JsonResponse(user_data.to_dict(orient="records")[0], safe=False)
    
    except Exception as e:
        print("❌ Error:", str(e))  # ✅ Debug log
        return JsonResponse({"error": str(e)}, status=500)




# ✅ สมัครสมาชิก (Signup API)
@csrf_exempt
def signup(request):
    try:
        data = json.loads(request.body)
        email = data.get("email")
        password = data.get("password")

        print("✅ Signup request received:", data)  # ✅ Debug Log

        # ✅ โหลดข้อมูลทุก Sheet
        xls = pd.ExcelFile(FILE_PATH, engine="openpyxl")
        all_sheets = {sheet: xls.parse(sheet) for sheet in xls.sheet_names}

        df = all_sheets.get("home", pd.DataFrame())  # ✅ โหลด Sheet "home" ถ้าไม่มีให้สร้างใหม่

        # ตรวจสอบว่า email มีอยู่แล้วหรือไม่
        if "email" in df.columns and email in df["email"].values:
            return JsonResponse({"error": "email already exists"}, status=400)

        # สร้าง CustomerID ใหม่ (max+1)
        new_id = df["CustomerID"].max() + 1 if not df["CustomerID"].isna().all() else 1

        # เพิ่มข้อมูลใหม่ลง DataFrame
        new_user = pd.DataFrame([{
            "CustomerID": new_id,
            "email": email,
            "password": make_password(password),  # ✅ Hash Password
            "Laundry_name": "",
            "Registration_number": "",
            "address": "",
            "Owner_name": "",
            "telephone": ""
        }])

        df = pd.concat([df, new_user], ignore_index=True)

        # ✅ บันทึกข้อมูลกลับไปที่ Excel โดยไม่ลบ Sheet อื่น ๆ
        all_sheets["home"] = df  # ✅ อัปเดต Sheet "home"
        
        with pd.ExcelWriter(FILE_PATH, engine="openpyxl", mode="w") as writer:
            for sheet_name, sheet_data in all_sheets.items():
                sheet_data.to_excel(writer, sheet_name=sheet_name, index=False)

        print("✅ Signup successful, CustomerID:", new_id)  # ✅ Debug Log
        return JsonResponse({
            "message": "Signup successful",
            "CustomerID": int(new_id)  # ✅ บังคับให้เป็น int
        }, status=201)

    except Exception as e:
        print("❌ Signup Error:", str(e))  # ✅ Debug Log
        return JsonResponse({"error": str(e)}, status=500)

    

# ✅ ล็อกอิน (Login API)
@api_view(["POST"])
def login_view(request):
    try:
        data = json.loads(request.body)
        email = data.get("email")
        password = data.get("password")

        df = load_excel("home")  # โหลดข้อมูลผู้ใช้จาก Excel
        if df is not None and (df["email"] == email).any():
            user_row = df[df["email"] == email].iloc[0]  # ดึงข้อมูลผู้ใช้ที่ตรงกับอีเมล
            stored_password = user_row["password"]  # อ่านค่ารหัสผ่านที่บันทึกไว้

            if check_password(password, stored_password):  # ✅ เช็คว่ารหัสผ่านตรงกันหรือไม่
                customer_id = int(user_row["CustomerID"])  # ✅ แปลงค่า int64 เป็น int

                return JsonResponse({
                    "message": "Login successful!",
                    "CustomerID": customer_id  # ✅ แก้ให้เป็น `int`
                }, status=200)

            else:
                return JsonResponse({"error": "Invalid credentials"}, status=401)

        return JsonResponse({"error": "User not found"}, status=404)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


# ✅ ล็อกเอาท์ (Logout API)
@api_view(["POST"])
def logout_view(request):
    try:
        refresh_token = request.data.get("refresh")
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response({"message": "Logout successful!"}, status=status.HTTP_200_OK)
    except Exception:
        return Response({"error": "Invalid token or already logged out!"}, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
def user_info(request, customer_id=None):
    try:
        # ✅ ตรวจจับ OPTIONS request สำหรับ CORS
        if request.method == "OPTIONS":
            response = JsonResponse({"message": "CORS Preflight OK"})
            response["Access-Control-Allow-Origin"] = "*"
            response["Access-Control-Allow-Methods"] = "GET, POST, PUT, OPTIONS"
            response["Access-Control-Allow-Headers"] = "*"
            return response

        df = pd.read_excel(FILE_PATH, sheet_name="home", engine="openpyxl")

        if request.method == "GET":
            if customer_id is None:
                return JsonResponse({"error": "Customer ID is required"}, status=400)
            
            user = df[df["CustomerID"] == customer_id].to_dict(orient="records")
            return JsonResponse(user[0] if user else {"error": "User not found"}, status=200 if user else 404)

        elif request.method in ["POST", "PUT"]:  # ✅ รองรับ PUT
            data = json.loads(request.body)

            if customer_id is None:
                return JsonResponse({"error": "Customer ID is required"}, status=400)

            user_index = df[df["CustomerID"] == customer_id].index

            if not user_index.empty:
                df.loc[user_index, "Laundry_name"] = data["laundryname"]
                df.loc[user_index, "registration_number"] = data["rgtnumber"]
                df.loc[user_index, "address"] = data["address"]
                df.loc[user_index, "owner_name"] = data["ownername"]
                df.loc[user_index, "telephone"] = data["telephone"]
            else:
                return JsonResponse({"error": "Customer ID not found"}, status=404)

            # ✅ บันทึกข้อมูลกลับ Excel
            with pd.ExcelWriter(FILE_PATH, mode="w", engine="openpyxl") as writer:
                df.to_excel(writer, sheet_name="home", index=False)

            return JsonResponse({"message": "Data updated successfully"}, status=200)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)



# ✅ ดึงข้อมูลลูกค้าตาม CustomerID
@api_view(['GET', 'PUT'])
def get_customer_by_id(request, customer_id):
    df = load_excel('home')  # โหลดข้อมูลจาก Excel

    customer_index = df.index[df["CustomerID"] == int(customer_id)].tolist()
    
    if not customer_index:
        return Response({"error": "Customer not found"}, status=404)

    if request.method == "PUT":
        print(f"📤 Received data: {request.data}")  # ✅ Debug ข้อมูลที่ส่งมา

        # แก้ไขข้อมูลใน DataFrame
        for key, value in request.data.items():
            if key in df.columns:
                df.at[customer_index[0], key] = value
        
        print(f"📂 Updated DataFrame: {df.iloc[customer_index[0]]}")  # ✅ Debug DataFrame

        save_excel(df, 'home')  # 🔹 ต้องบันทึกกลับไปที่ Excel
        return Response({"message": "Customer updated successfully"}, status=200)

    return Response(df.iloc[customer_index[0]].to_dict(), status=200)



@api_view(['GET'])
def get_machines(request, customer_id):
    df = load_excel('machine')
    filtered_df = df[df["CustomerID"] == customer_id]  # ✅ กรองเฉพาะของลูกค้า
    return Response(filtered_df.to_dict(orient='records'))


@api_view(['POST'])
def add_machine(request, customer_id):
    try:
        df = load_excel('machine')  # โหลดข้อมูลจาก Sheet "Machine"
        new_data = request.data
        new_data["CustomerID"] = customer_id  # ✅ เพิ่ม CustomerID ลงไปในข้อมูล

        # ✅ Debug Log: ดูค่าก่อนบันทึก
        print("🔍 New Data Before Append:", new_data)

        # ✅ เช็กว่า CustomerID มีอยู่ในระบบไหม
        df_home = load_excel('home')
        if str(customer_id) not in df_home["CustomerID"].astype(str).values:
            return Response({"error": "CustomerID not found"}, status=400)

        df = df.append(new_data, ignore_index=True)

        # ✅ เช็กว่า df เป็น DataFrame จริงหรือไม่
        if not isinstance(df, pd.DataFrame):
            print("❌ Error: df is not a DataFrame!", type(df))
            return Response({"error": "Internal Server Error: df is not a DataFrame"}, status=500)

        save_excel('machine', df)  # ✅ บันทึกลง Excel

        return Response({"message": "Machine added successfully"})
    
    except Exception as e:
        print("❌ Error adding machine:", str(e))  # ✅ Debug Log
        return Response({"error": str(e)}, status=500)




# ✅ บันทึกการใช้งานเครื่อง (Add Usage API)
@api_view(["POST"])
def add_usage(request):
    df = load_excel('Usage')  # ใช้ Sheet "Usage"
    new_data = request.data
    df = df.append(new_data, ignore_index=True)
    save_excel('Usage', df)
    return Response({"message": "Usage recorded successfully!"}, status=status.HTTP_201_CREATED)

# ✅ ดึงข้อมูลการใช้งานเครื่อง (Get Usages API)
@api_view(["GET"])
def get_usages(request):
    df = load_excel('Usage')  # ใช้ Sheet "Usage"
    return Response(df.to_dict(orient='records'))

# ✅ เพิ่มข้อมูลการซ่อมบำรุง (Add Maintenance API)
@api_view(["POST"])
def add_maintenance(request):
    df = load_excel('Maintenance')  # ใช้ Sheet "Maintenance"
    new_data = request.data
    df = df.append(new_data, ignore_index=True)
    save_excel('Maintenance', df)
    return Response({"message": "Maintenance record added!"}, status=status.HTTP_201_CREATED)

# ✅ ดึงข้อมูลการซ่อมบำรุง (Get Maintenances API)
@api_view(["GET"])
def get_maintenances(request):
    df = load_excel('Maintenance')  # ใช้ Sheet "Maintenance"
    return Response(df.to_dict(orient='records'))


def save_excel(df, sheet_name):
    file_path = "C:/Users/Modmint/Desktop/washalytics/washalytics.xlsx"
    print(f"📂 Saving to Excel: {file_path} (Sheet: {sheet_name})")  # ✅ Debug
    with pd.ExcelWriter(file_path, mode='a', if_sheet_exists='replace', engine='openpyxl') as writer:
        df.to_excel(writer, sheet_name=sheet_name, index=False)
    print("✅ Excel saved successfully!")  # ✅ Debug


from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from .utils import update_excel

from django.conf import settings

path = "C:/Users/Modmint/Desktop/washalytics/backend/media/uploads/"
if not os.path.exists(path):
    os.makedirs(path)
    
def handle_uploaded_file(f, filename):
    save_path = os.path.join(settings.MEDIA_ROOT, "uploads", filename)
    
    # Debug ดู path ที่จะเซฟ
    print(f"Saving file to: {save_path}")

    with open(save_path, "wb+") as destination:
        for chunk in f.chunks():
            destination.write(chunk)


from django.http import JsonResponse

def upload_photo(request):
    if request.method == "POST" and request.FILES.get("photo"):
        uploaded_file = request.FILES["photo"]
        filename = uploaded_file.name
        print(f"📤 Received file: {filename}")  # Debug

        handle_uploaded_file(uploaded_file, filename)

        return JsonResponse({"message": "Upload successful", "photo": f"/media/uploads/{filename}"})

    return JsonResponse({"error": "No file uploaded"}, status=400)


