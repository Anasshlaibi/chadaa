import os
import tempfile
from google import genai
from flask import Flask, request, jsonify
from flask_cors import CORS
from supabase import create_client
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# --- 1. Supabase Initialization ---
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY") 

if not SUPABASE_URL or not SUPABASE_KEY:
    print("CRITICAL: Supabase credentials missing.")
    supabase = None
else:
    try:
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
    except Exception as e:
        print(f"Supabase Init Error: {e}")
        supabase = None

# --- 2. Vertex AI Initialization ---
service_account_json = os.environ.get("GCP_SERVICE_ACCOUNT_JSON")
if service_account_json:
    try:
        creds_fd, creds_path = tempfile.mkstemp(suffix=".json", dir="/tmp")
        with os.fdopen(creds_fd, 'w') as f:
            f.write(service_account_json)
        os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = creds_path
    except Exception as e:
        print(f"Auth Error: {e}")

client = genai.Client(
    vertexai=True, 
    project="REDACTED_GCP_PROJECT", 
    location="us-central1"
)

# --- 3. Global Synchronized Helper ---
def is_positive(val):
    """Handles ALL variants of truthy indicators from DB."""
    if val is True: return True
    if val is False: return False
    if val is None: return False
    s = str(val).lower().strip().replace('"', '').replace("'", "")
    # Robust matching for any affirmative B2B indicator
    return s in ['true', '1', 't', 'yes', 'en stock', 'oui', 'vrai', 'on', 'available']

def get_db_products():
    """Unified fetch from Supabase."""
    if not supabase:
        print("Supabase client not initialized.")
        return []
    try:
        response = supabase.table('products').select("*").execute()
        return response.data
    except Exception as e:
        print(f"Supabase Fetch Error: {e}")
        return []

# --- 4. Endpoints ---

@app.route('/api/products', methods=['GET'])
@app.route('/api/index', methods=['GET'])
def get_products():
    """Syncs frontend UI with 100% accuracy."""
    products = get_db_products()
    formatted = []
    print(f"--- UI SYNC LOG: Total {len(products)} items ---")
    for p in products:
        # STEP 2: Use helper immediately
        in_stock_bool = is_positive(p.get('inStock'))
        
        # Verbose logging for debugging the 'manchon' bug
        if p.get('ref') == 'af-manchon':
            print(f"DEBUG SYNC [af-manchon]: Raw={p.get('inStock')} -> Parsed={in_stock_bool}")

        formatted.append({
            "id": p.get('id') or p.get('ref'),
            "name": p.get('name'),
            "category": p.get('category'),
            "description": p.get('description', ''),
            "image": p.get('mainImage') or p.get('image', ''),
            "inStock": in_stock_bool, # STEP 5: Clean boolean for UI
            "stockStatus": "En Stock" if in_stock_bool else "En Rupture",
            "ref": p.get('ref'),
            "specs": {
                "Référence": p.get('ref', ''),
                "Matériau": p.get('material', 'Standard'),
                "Finition": p.get('finish', 'Standard'),
                "Usage": p.get('usage', 'Second Œuvre'),
                "Origine": p.get('origin', 'Certifié')
            }
        })
    return jsonify({"status": "success", "products": formatted})

@app.route('/api/products/health', methods=['GET'])
def health():
    return jsonify({"status": "products api online"})
