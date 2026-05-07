import os
import time
from flask import Flask, jsonify
from flask_cors import CORS
from supabase import create_client
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

# Basic CORS for the product API
RAW_ORIGINS = os.environ.get("CORS_ALLOWED_ORIGINS", "")
ALLOWED_ORIGINS = [o.strip() for o in RAW_ORIGINS.split(",") if o.strip()]
CORS(app, resources={r"/*": {"origins": ALLOWED_ORIGINS}})

SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")
supabase = create_client(SUPABASE_URL, SUPABASE_KEY) if SUPABASE_URL and SUPABASE_KEY else None

def is_positive(val):
    if val is True: return True
    if val is False or val is None: return False
    s = str(val).lower().strip().replace('"', '').replace("'", "")
    return s in ['true', '1', 't', 'yes', 'en stock', 'oui', 'vrai', 'on', 'available']

@app.route('/api/products', methods=['GET'])
@app.route('/api/products.py', methods=['GET'])
def get_products():
    if not supabase:
        return jsonify({"status": "error", "message": "Supabase not configured"}), 500

    try:
        res = supabase.table('products').select('*').execute()
        products = res.data if res.data else []
        
        formatted = []
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
                "ref": p.get('ref'),
                "specs": p.get('specs') or {}
            })
        
        response = jsonify({"status": "success", "products": formatted})
        response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
        return response
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
