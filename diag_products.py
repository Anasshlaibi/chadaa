import requests
import json

url = "https://chadaalyasminma.vercel.app/api/products"
print(f"Fetching: {url}")

try:
    # Use headers to mimic browser
    headers = {
        "Cache-Control": "no-cache",
        "Pragma": "no-cache"
    }
    response = requests.get(url, headers=headers)
    
    print(f"Status Code: {response.status_code}")
    print(f"Headers: {dict(response.headers)}")
    
    data = response.json()
    products = data.get('products', [])
    print(f"Total Products: {len(products)}")
    
    # Check specific product
    target = "fp-hydro-ba13"
    matches = [p for p in products if p.get('id') == target]
    if matches:
        p = matches[0]
        print(f"Product Match: {p.get('name')}")
        print(f"inStock: {p.get('inStock')}")
        print(f"stockStatus: {p.get('stockStatus')}")
    else:
        print(f"Product {target} not found in API response.")
        if products:
            print("First product in response:")
            print(json.dumps(products[0], indent=2))

except Exception as e:
    print(f"Error: {e}")
