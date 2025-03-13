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


# ✅ Path ไฟล์ Excel
FILE_PATH = r'C:\Users\Modmint\Desktop\washalytics\washalytics.xlsx'

# ✅ สมัครสมาชิก (Signup API)
@api_view(["POST"])
def signup(request):
    try:
        df = load_excel("home")

        email = request.data.get("email")
        password = request.data.get("password")
        

        if df is not None and (df["email"] == email).any():
            return Response({"error": "Email already exists"}, status=400)

        hashed_password = make_password(password)

        # ✅ ตรวจสอบว่า DataFrame มีข้อมูลเดิมไหม
        if df is None or df.empty:
            df = pd.DataFrame(columns=["CustomerID", "email",  "password"])

        new_customer_id = 1 if df.empty else df["CustomerID"].max() + 1  # ✅ ใช้ `CustomerID` ต่อจากเลขสูงสุด

        new_user = pd.DataFrame([{
            "CustomerID": new_customer_id,
            "email": email,
            "password": hashed_password,
            
        }])

        df = pd.concat([df, new_user], ignore_index=True)  # ✅ ใช้ `concat()` เพื่อไม่ให้ข้อมูลหาย

        save_excel(df, "home")  # ✅ บันทึกข้อมูลใหม่โดยไม่ลบของเก่า

        return Response({"message": "User created successfully!", "CustomerID": new_customer_id}, status=201)

    except Exception as e:
        return Response({"error": str(e)}, status=500)
    
@api_view(["GET"])
def get_user_info(request):
    try:
        email = request.query_params.get("email")  # รับ email จาก query string
        if not email:
            return Response({"error": "Email is required"}, status=400)

        df = load_excel("home")  # โหลดข้อมูลจาก Excel
        if df is None or df.empty:
            return Response({"error": "No user data found"}, status=404)

        user_data = df[df["email"] == email]  # ค้นหาข้อมูลผู้ใช้ที่ตรงกับ email
        if user_data.empty:
            return Response({"error": "User not found"}, status=404)

        user_info = user_data.iloc[0].to_dict()  # แปลงเป็น dict
        return Response(user_info, status=200)

    except Exception as e:
        return Response({"error": str(e)}, status=500)



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
                return JsonResponse({"message": "Login successful!"}, status=200)
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
    except Exception as e:
        return Response({"error": "Invalid token or already logged out!"}, status=status.HTTP_400_BAD_REQUEST)

   

# ✅ ดึงข้อมูลลูกค้า (Get Customers API)
@api_view(["GET"])
def get_customers(request):
    df = load_excel('Home')  # ใช้ Sheet "Home"
    return Response(df.to_dict(orient='records'))

# ✅ ดึงข้อมูลเครื่องซักผ้า (Get Machines API)
@api_view(['GET'])
def get_machines(request):
    df = load_excel('Machine')  # ใช้ Sheet "Machine"
    return Response(df.to_dict(orient='records'))

# ✅ เพิ่มเครื่องซักผ้าใหม่ (Add Machine API)
@api_view(['POST'])
def add_machine(request):
    df = load_excel('Machine')  # ใช้ Sheet "Machine"
    new_data = request.data
    df = df.append(new_data, ignore_index=True)
    save_excel('Machine', df)
    return Response({"message": "Machine added successfully"})

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