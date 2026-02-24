import os
from supabase import create_client
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

def test_chat_context():
    try:
        print("Fetching products for AI context...")
        response = supabase.table('products').select("*").execute()
        products = response.data
        
        print(f"Retrieved {len(products)} products.")
        
        # Simulate context generation as per api/chat.py
        context_rows = []
        for item in products[:5]: # Check first 5
            in_stock_bool = str(item.get('inStock')).lower() in ['true', '1', 'yes', 'en stock']
            status_label = "STATUS: EN STOCK" if in_stock_bool else "STATUS: RUPTURE DE STOCK"
            
            details = (
                f"Produit: {item.get('name')} | Ref: {item.get('ref')} | "
                f"Détails: {item.get('description', '')} | {status_label}"
            )
            context_rows.append(details)
            print(f"Sample Context: {details}")
            
        return True
    except Exception as e:
        print(f"Chat Context Sync Failed: {e}")
        return False

test_chat_context()
