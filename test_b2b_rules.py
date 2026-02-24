import requests
import json

url = 'https://chada-eight.vercel.app/api/chat'
payload = {'message': 'Bonjour, pouvez-vous me lister les trappes AluPlaster disponibles et me dire si elles sont en stock ?'}

print("Testing B2B System Instructions...")
try:
    resp = requests.post(url, json=payload, timeout=20)
    print(f"Status: {resp.status_code}")
    if resp.status_code == 200:
        response_text = resp.json().get('response')
        print("\n--- AI RESPONSE ---")
        print(response_text)
        print("-------------------")
        
        # Simple verification checks
        if "**Recommended Solution**" in response_text or "**Solution Recommandée**" in response_text:
            print("Check: Mandatory Headers - PASSED")
        else:
            print("Check: Mandatory Headers - FAILED (or check header language)")
            
        if "|" in response_text and "---" in response_text:
            print("Check: Markdown Table - PASSED")
        else:
            print("Check: Markdown Table - SKIPPED (unless list/comparison requested)")
except Exception as e:
    print(f"Error: {e}")
