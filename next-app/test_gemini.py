import os
from google import genai
from dotenv import load_dotenv

load_dotenv()

key = os.environ.get("GEMINI_API_KEY")
print("GEMINI_API_KEY length:", len(key) if key else 0)

try:
    client = genai.Client(api_key=key, vertexai=False)
    print("Testing generate_content with gemini-2.5-flash...")
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents="Hello, respond in one short sentence.",
    )
    print("Response:")
    print(response.text)
except Exception as e:
    import traceback
    traceback.print_exc()
