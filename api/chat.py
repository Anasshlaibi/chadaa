import os
import tempfile
import time
from google import genai
from flask import Flask, request, jsonify
from flask_cors import CORS
from supabase import create_client
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
# Restrict CORS to specific origins for security
CORS(app, resources={r"/*": {"origins": ["https://chadaalyasmin.ma", "https://*.vercel.app", "http://localhost:5173"]}})

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

# --- 2. Caching Layer ---
_cache: dict = {"data": None, "timestamp": 0.0, "instruction": ""}
CACHE_TTL = 300.0 # 5 minutes for freshness

def get_db_products() -> tuple:
    """Unified fetch with in-memory caching for performance."""
    global _cache
    now = time.time()
    
    # Check if cache is valid
    if _cache["data"] is not None and (now - _cache["timestamp"] < CACHE_TTL):
        return _cache["data"], _cache["instruction"]

    if not supabase:
        print("Supabase client not initialized.")
        return [], None
        
    try:
        response = supabase.table('products').select("*").execute()
        products = response.data
        
        # Pre-build system instruction for speed
        rows = []
        for item in products:
            status = "STOCK" if is_positive(item.get('inStock')) else "OUT"
            rows.append(f"{item.get('name')}:{status}")
        
        context = "|".join(rows)
        instruction = f"Chada Alyasmin Assistant. Concise. ONLY stock items. Data: {context}"
        
        _cache["data"] = products
        _cache["instruction"] = instruction
        _cache["timestamp"] = now
        return products, instruction
    except Exception as e:
        print(f"Supabase Fetch Error: {e}")
        return _cache["data"] or [], _cache["instruction"]

# --- 3. Vertex AI Initialization ---
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

# --- 4. Helpers ---
def is_positive(val):
    if val is True: return True
    if val is False: return False
    if val is None: return False
    s = str(val).lower().strip().replace('"', '').replace("'", "")
    return s in ['true', '1', 't', 'yes', 'en stock', 'oui', 'vrai', 'on', 'available']

# --- 5. Endpoints ---

@app.route('/api/products', methods=['GET'])
@app.route('/products', methods=['GET'])
def get_products():
    products, _ = get_db_products()
    formatted = []
    # Safety: ensure products is iterable
    if not products:
        return jsonify({"status": "success", "products": []})
        
    for p in products:
        in_stock_bool = is_positive(p.get('inStock'))
        formatted.append({
            "id": p.get('id') or p.get('ref'),
            "name": p.get('name'),
            "category": p.get('category'),
            "description": p.get('description', ''),
            "image": p.get('mainImage') or p.get('image', ''),
            "inStock": in_stock_bool,
            "stockStatus": "En Stock" if in_stock_bool else "En Rupture",
            "ref": p.get('ref')
        })
    return jsonify({"status": "success", "products": formatted})

@app.route('/api/chat', methods=['POST'])
@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        user_msg = data.get("message", "")
        products, system_instruction = get_db_products()
        
        if not system_instruction:
            system_instruction = "Chada Alyasmin Assistant."

        response = client.models.generate_content(
            model="gemini-2.0-flash-001",
            contents=user_msg,
            config={'system_instruction': system_instruction, 'temperature': 0.1}
        )
        
        return jsonify({"response": response.text, "status": "success"})
    except Exception as e:
        return jsonify({"response": "Technical error. Call +212 661-138204.", "status": "error"}), 500

@app.route('/', methods=['GET'])
def health():
    return jsonify({"status": "online"})
