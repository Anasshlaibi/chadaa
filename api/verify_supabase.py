import os
from supabase import create_client
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

try:
    print("Testing Supabase connection...")
    response = supabase.table('products').select("count", count="exact").execute()
    print(f"Connection Successful! Total products in DB: {response.count}")
    
    # Fetch a few items to verify structure
    results = supabase.table('products').select("*").limit(3).execute()
    for p in results.data:
        print(f"- {p.get('name')} (Ref: {p.get('ref')})")
        
except Exception as e:
    print(f"Verification Failed: {e}")
