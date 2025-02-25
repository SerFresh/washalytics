import json
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from openai import OpenAI
from django.conf import settings
# Create your views here.
# Assuming OpenAI is initialized
client = OpenAI(api_key=settings.OPENAI_API_KEY)

# Define available functions for OpenAI to use
from openai import OpenAI

client = OpenAI()

tools = [{
    "type": "function",
    "function": {
        "name": "get_weather",
        "description": "Get current temperature for a given location.",
        "parameters": {
            "type": "object",
            "properties": {
                "location": {
                    "type": "string",
                    "description": "City and country e.g. Bogotá, Colombia"
                }
            },
            "required": [
                "location"
            ],
            "additionalProperties": False
        },
        "strict": True
    }
}]
# Your existing chat view method
@csrf_exempt
def chat_view(request):
    if request.method == 'POST':
        user_message = request.POST.get('message', '')
        
        # OpenAI API call with function calling capability
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": '''คุณคือผู้ช่วยผู้ใช้แอพพลิเคชัน WashAlytics'''},  # Your system instructions
                {"role": "user", "content": user_message},
              ],
            tools=tools  # Use the correct 'functions' key here
        )
        
        # Extract the function call response
        reply = response.choices[0].message.tool_calls

        if reply:
            func_name = reply['name']
            args = json.loads(reply['arguments'])
            
            # Handle the function call (for testing, we will just print them)
            print(f"Function called: {func_name}")
            print(f"Arguments: {args}")
            
            # Simulate the response from your function (e.g., weather)
            function_response = "The weather is sunny in the specified location."
            
            return JsonResponse({"message": function_response})

        # If no function call was triggered, return the AI's default response
        ai_message = response.choices[0].message['content']
        return JsonResponse({'message': ai_message})

    return render(request, 'chat/chat.html')