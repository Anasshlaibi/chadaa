import os
import time
import hashlib
from collections import defaultdict
from flask import Flask, request, jsonify
from flask_cors import CORS

# Optional Supabase import to avoid crash if missing
try:
    from supabase import create_client
except ImportError:
    create_client = None

# Resend Init
RESEND_API_KEY = os.environ.get("RESEND_API_KEY")
if RESEND_API_KEY:
    try:
        import resend
        resend.api_key = RESEND_API_KEY
    except ImportError:
        resend = None
else:
    resend = None

def generate_pdf(client_name, client_email, client_phone, cart):
    """Generates a PDF using fpdf2 and returns its bytes."""
    try:
        from fpdf import FPDF
        import base64
        
        pdf = FPDF()
        pdf.add_page()
        
        # Header - Logo (using remote URL or placeholder)
        # pdf.image("https://chadaalyasminma.vercel.app/logo.png", 10, 10, 30) # URL image can be slow or fail
        pdf.set_font("Helvetica", "B", 20)
        pdf.cell(0, 10, "CHADA ALYASMIN", ln=True, align="C")
        pdf.set_font("Helvetica", "I", 10)
        pdf.cell(0, 10, "Construction & Design - Devis Proforma", ln=True, align="C")
        pdf.ln(10)
        
        # Client Details
        pdf.set_font("Helvetica", "B", 12)
        pdf.cell(0, 10, "Informations Client :", ln=True)
        pdf.set_font("Helvetica", "", 10)
        pdf.cell(0, 8, f"Nom/Société : {client_name}", ln=True)
        pdf.cell(0, 8, f"Email : {client_email}", ln=True)
        pdf.cell(0, 8, f"Téléphone : {client_phone or 'Non fourni'}", ln=True)
        pdf.cell(0, 8, f"Date : {time.strftime('%Y-%m-%d %H:%M')}", ln=True)
        pdf.ln(10)
        
        # Table Header
        pdf.set_fill_color(30, 58, 138) # Dark blue
        pdf.set_text_color(255, 255, 255)
        pdf.set_font("Helvetica", "B", 10)
        pdf.cell(140, 10, "Produit", 1, 0, "L", fill=True)
        pdf.cell(50, 10, "Quantité", 1, 1, "C", fill=True)
        
        # Table Contents
        pdf.set_text_color(0, 0, 0)
        pdf.set_font("Helvetica", "", 10)
        for item in cart:
            name = item.get('name', 'Produit inconnu')
            qty = str(item.get('quantity', 0))
            pdf.cell(140, 10, name, 1)
            pdf.cell(50, 10, qty, 1, 1, "C")
        
        pdf.ln(15)
        pdf.set_font("Helvetica", "I", 9)
        pdf.multi_cell(0, 5, "Ce document est un devis proforma généré automatiquement. Veuillez nous contacter pour la version finale et les modalités de paiement.")
        
        # Output as bytes
        return pdf.output()
    except Exception as e:
        print(f"PDF ERROR: {e}")
        return None

app = Flask(__name__)
CORS(app)

# Supabase Init with safety
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")

def get_supabase():
    if not create_client or not SUPABASE_URL or not SUPABASE_KEY:
        return None
    try:
        return create_client(SUPABASE_URL, SUPABASE_KEY)
    except Exception as e:
        print(f"FAILED TO INIT SUPABASE: {e}")
        return None

supabase = get_supabase()

# Rate Limiting
_rate_store = defaultdict(list)
RATE_LIMIT_WINDOW = 600
RATE_LIMIT_MAX = 5

@app.route('/api/quotes', methods=['POST'])
def handle_quotes():
    # POST Logic
    try:
        data = request.json or {}
        if not data:
            return jsonify({"status": "error", "message": "No data received"}), 400

        if not supabase:
            return jsonify({"status": "error", "message": "Database disconnected"}), 503

        # Extraction and validation
        client_name = data.get("companyName") or data.get("contactName")
        client_email = data.get("email")
        client_phone = data.get("phone")
        cart = data.get("cart")

        if not client_name or not client_email or not cart:
            return jsonify({"status": "error", "message": "Information manquante (Nom, Email ou Panier)"}), 400

        # Insert into Supabase
        result = supabase.table("quotes").insert({
            "client_name": client_name,
            "client_email": client_email,
            "client_phone": client_phone,
            "cart": cart,
            "status": "pending"
        }).execute()

        # Send Email via Resend
        if resend:
            try:
                # Format cart for email HTML
                cart_rows = ""
                for item in cart:
                    name = item.get('name', 'Produit inconnu')
                    qty = item.get('quantity', 0)
                    cart_rows += f"<tr><td style='border:1px solid #ddd;padding:8px'>{name}</td><td style='border:1px solid #ddd;padding:8px'>{qty}</td></tr>"

                html_content = f"""
                <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    <div style="text-align: center; margin-bottom: 20px;">
                        <img src="https://next-app-indol-two.vercel.app/logo.png" alt="Chada Alyasmin" style="height: 80px; width: auto;">
                        <h1 style="color: #1e3a8a; margin-top: 10px; font-size: 24px;">CHADA ALYASMIN</h1>
                        <p style="color: #d97706; text-transform: uppercase; letter-spacing: 2px; font-size: 10px; font-weight: bold; margin: 0;">Construction & Design</p>
                    </div>
                    
                    <h2 style="color: #2e7d32; border-bottom: 2px solid #eee; padding-bottom: 10px;">📋 Nouvelle Demande de Devis</h2>
                    <p>Une nouvelle demande de devis a été enregistrée en base de données. Vous trouverez le récapitulatif PDF en pièce jointe.</p>
                    
                    <div style="background-color: #f9fafb; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                        <p style="margin: 5px 0;"><strong>Client :</strong> {client_name}</p>
                        <p style="margin: 5px 0;"><strong>Email :</strong> {client_email}</p>
                        <p style="margin: 5px 0;"><strong>Téléphone :</strong> {client_phone or 'Non fourni'}</p>
                    </div>
                    
                    <h3 style="margin-top: 20px; color: #1e3a8a;">Produits demandés :</h3>
                    <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                        <thead>
                            <tr style="background-color: #1e3a8a; color: white;">
                                <th style="border:1px solid #ddd;padding:12px;text-align:left">Produit</th>
                                <th style="border:1px solid #ddd;padding:12px;text-align:center">Quantité</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart_rows}
                        </tbody>
                    </table>
                    
                    <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #6b7280; font-size: 11px;">
                        <p>Ce message a été généré automatiquement par le portail Chada Alyasmin.</p>
                        <p>&copy; {time.strftime("%Y")} Chada Alyasmin. Tous droits réservés.</p>
                    </div>
                </div>
                """

                # Generate PDF and encode to list of bytes for Resend
                pdf_bytes = generate_pdf(client_name, client_email, client_phone, cart)
                
                email_params = {
                    "from": "Chada Alyasmin <onboarding@resend.dev>",
                    "to": "anasshlaibi@gmail.com",
                    "subject": f"📋 Nouveau Devis: {client_name}",
                    "html": html_content
                }

                if pdf_bytes:
                    email_params["attachments"] = [
                        {
                            "filename": f"Devis_{client_name.replace(' ', '_')}.pdf",
                            "content": list(pdf_bytes)
                        }
                    ]

                resend.Emails.send(email_params)
            except Exception as mail_err:
                print(f"Mail Error: {mail_err}")

        return jsonify({"status": "success", "message": "Demande de devis enregistrée."})

    except Exception as e:
        import traceback
        print("======== SUPABASE QUOTES ERROR ========")
        print(f"Exception Type: {type(e).__name__}")
        print(f"Exception Args: {e.args}")
        traceback.print_exc()
        print("=======================================")
        return jsonify({
            "status": "error", 
            "message": "Une erreur est survenue lors de l'enregistrement.",
            "type": type(e).__name__,
            "details": getattr(e, 'details', None) or getattr(e, 'message', None) or str(e.args)
        }), 500
