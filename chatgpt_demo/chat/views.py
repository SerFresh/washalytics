#API LOGIC FOR CHAT RESPONSE
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from openai import OpenAI
from django.conf import settings
# Create your views here.
client = OpenAI(api_key=settings.OPENAI_API_KEY)
@csrf_exempt
def chat_view(request):
    if request.method == 'POST':
        user_message = request.POST.get('message', '')
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": '''คุณคือผู้ช่วยผู้ใช้แอพพลิเคชัน WashAlytics ซึ่งเป็นแอปพลิเคชันสำหรับการจัดการดูแลระบบหลังบ้าน
         ของร้านซักผ้าหยอดเหรียญโดยมีฟังก์ชันการทำงานที่ทำให้ผู้ประกอบได้เห็นถึงภาพรวมของธุรกิจแล้วนำข้อมูลที่ได้มาวิเคราะห์เพื่อให้ผู้ประกอบการได้นำไปใช้ในการตัดสินใจและในการขยายธุรกิจ
         
         โดยมีฟังก์ชันหลักภายในแอพพลิเคชัน ดังนี้WashAlytics มีฟังก์ชันหลักภายในแอพพลิเคชัน ดังนี้ 
        1.Login and Register จะเป็นฟังก์ชันที่ถูกใช้งานเพียงครั้งเดียวเมื่อผู้ใช้เริ่มต้นใช้แอพพลิเคชัน โดยในการลงทะเบียน(Register)แรกเริ่ม 
         ผู้ใช้ จะต้องใส่ชื่อร้านซักอบของตนเอง รวมถึงรหัสการลงทะเบียน (แฟรนช์ไชส์) ที่อยู่ และชื่อเจ้าของ(ผู้ใช้) ซึ่งข้อมูลอื่นๆสามารถแก้ไขได้ในหน้า Profile ภายหลัง 
        2.Home หน้าหลักที่จะพาไปหน้าต่างๆ
        3.Analytics สำหรับใช้ดูประวัติการใช้งานเครื่องซักและเครื่องอบภายในร้าน รวมถึงประวัติรายรับรายจ่าย ทั้งรายวัน รายเดือน และรายปี
        4.Machine สำหรับใช้ดูสถานะ ข้อมูลประจำเครื่อง ของเครื่องซัก และเครื่องอบภายในร้าน ทั้งจำนวน,รุ่น,ขนาด รวมถึงประสิทธิภาพ
        5.Finance ช่วยให้ผู้ใช้สามารถติดตามและอัพเดตรายรับ(จากการใช้งานเครื่องซัก เครื่องอบของผู้บริโภคในร้าน) รวมถึงรายจ่าย เช่น ค่าน้ำ ค่าไฟ ค่าบำรุงรักษา
        6.Predictions เป็นฟังก์ชันที่จะช่วยทำนายแนวโน้มของข้อมูลในอนาคตโดยอ้างอิงจากประวัติที่มี อย่างเช่น ทำนายรายได้ในอนาคต , 
         ความถี่ในการใช้งานเครื่องซักและเครื่องอบในเดือนหน้า, แนวโน้มประสิทธิภาพของเครื่องอบหรือเครื่องซักในอนาคต'''},
                {"role": "user", "content": user_message},
            ],
            max_tokens=100
        )
        ai_message = response.choices[0].message.content
        return JsonResponse({'message': ai_message})
    return render(request, 'chat/chat.html')