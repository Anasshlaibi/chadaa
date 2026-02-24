"""
/api/contact — Secure Contact Form Endpoint
Saves form submissions directly to Supabase instead of Google Sheets.
Includes CORS lockdown, rate limiting, and input validation.
"""
import os
import re
import time
import hashlib
from collections import defaultdict
from flask import Flask, request, jsonify, abort
from flask_cors import CORS
from supabase import create_client
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

# ── CORS: Exact origins only ──
RAW_ORIGINS = os.environ.get("CORS_ALLOWED_ORIGINS", "")
ALLOWED_ORIGINS = [o.strip() for o in RAW_ORIGINS.split(",") if o.strip()]
if not ALLOWED_ORIGINS:
    ALLOWED_ORIGINS = ["http://localhost:5173", "http://localhost:3000"]

CORS(app, resources={r"/*": {"origins": ALLOWED_ORIGINS}})


@app.before_request
def enforce_origin():
    if request.method == "OPTIONS":
        return
    origin = request.headers.get("Origin", "")
    if origin and origin not in ALLOWED_ORIGINS:
        abort(403, description="Origin not allowed.")


# ── Rate Limiting: 5 submissions per 10 minutes per IP ──
CONTACT_RATE_WINDOW = int(os.environ.get("CONTACT_RATE_WINDOW", 600))
CONTACT_RATE_MAX = int(os.environ.get("CONTACT_RATE_MAX", 5))
_rate_store: dict = defaultdict(list)


def _hash_ip(ip: str) -> str:
    return hashlib.sha256(ip.encode()).hexdigest()[:16]


def is_rate_limited(ip: str) -> bool:
    key = _hash_ip(ip)
    now = time.time()
    _rate_store[key] = [t for t in _rate_store[key] if now - t < CONTACT_RATE_WINDOW]
    if len(_rate_store[key]) >= CONTACT_RATE_MAX:
        return True
    _rate_store[key].append(now)
    return False


# ── Supabase Init ──
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


# ── Input Validation ──
EMAIL_REGEX = re.compile(r"^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$")


def sanitize_text(text: str, max_len: int = 500) -> str:
    """Strip dangerous chars and truncate."""
    text = text.strip()
    text = re.sub(r'[<>{}\[\]\\]', '', text)
    return text[:max_len]


def validate_contact(data: dict) -> tuple:
    """Returns (is_valid, error_message, sanitized_data)."""
    name = data.get("name", "").strip()
    email = data.get("email", "").strip()
    subject = data.get("subject", "").strip()
    message = data.get("message", "").strip()

    if not name or len(name) < 2:
        return False, "Name is required (min 2 characters).", None
    if not email or not EMAIL_REGEX.match(email):
        return False, "Valid email is required.", None
    if not message or len(message) < 5:
        return False, "Message is required (min 5 characters).", None

    return True, None, {
        "name": sanitize_text(name, 100),
        "email": email.lower()[:254],
        "subject": sanitize_text(subject, 200),
        "message": sanitize_text(message, 2000),
    }


# ── Endpoint ──
@app.route('/api/contact', methods=['POST'])
@app.route('/contact', methods=['POST'])
def contact():
    # Rate limit check
    client_ip = request.headers.get("X-Forwarded-For", request.remote_addr or "0.0.0.0")
    if is_rate_limited(client_ip):
        return jsonify({"status": "error", "message": "Too many submissions. Please try again later."}), 429

    # Parse body (support both JSON and form-encoded)
    if request.is_json:
        data = request.json or {}
    else:
        data = {
            "name": request.form.get("name", ""),
            "email": request.form.get("email", ""),
            "subject": request.form.get("subject", ""),
            "message": request.form.get("message", ""),
        }

    # Validate
    is_valid, error_msg, clean_data = validate_contact(data)
    if not is_valid:
        return jsonify({"status": "error", "message": error_msg}), 400

    # Save to Supabase
    if not supabase:
        print("ERROR: Supabase client not initialized, cannot save contact.")
        return jsonify({"status": "error", "message": "Service temporarily unavailable."}), 503

    try:
        result = supabase.table("contacts").insert({
            "name": clean_data["name"],
            "email": clean_data["email"],
            "subject": clean_data["subject"],
            "message": clean_data["message"],
            "ip_hash": _hash_ip(client_ip),
            "created_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        }).execute()

        return jsonify({
            "status": "success",
            "message": "Your message has been sent successfully. We will respond shortly."
        })
    except Exception as e:
        print(f"Contact Save Error: {e}")
        return jsonify({"status": "error", "message": "Failed to submit. Please try again."}), 500


@app.route('/api/contact/health', methods=['GET'])
def health():
    return jsonify({"status": "contact-api-online", "timestamp": time.time()})


def handler(request):
    """Vercel serverless entry point."""
    return app(request)


if __name__ == "__main__":
    app.run(port=5002, debug=(os.environ.get("FLASK_DEBUG", "0") == "1"))
