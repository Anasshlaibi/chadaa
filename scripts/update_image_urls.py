"""Update product mainImage URLs to Supabase CDN."""
import os
from supabase import create_client
from dotenv import load_dotenv

load_dotenv()
sb = create_client(os.environ["SUPABASE_URL"], os.environ["SUPABASE_KEY"])
BUCKET_URL = os.environ["SUPABASE_URL"] + "/storage/v1/object/public/product-images/"

prods = sb.table("products").select("id, name, mainImage").execute()
updated = 0

for p in prods.data:
    old = p.get("mainImage", "")
    if not old or old.startswith("http"):
        continue
    # /assets/img/portfolio/topic prime.jpg -> img/portfolio/topic-prime.jpg
    clean = old.replace("/assets/", "").replace(" ", "-").lower()
    new_url = BUCKET_URL + clean
    sb.table("products").update({"mainImage": new_url}).eq("id", p["id"]).execute()
    updated += 1
    print("  " + p["name"] + " -> " + clean)

print("Updated " + str(updated) + " products to Supabase CDN URLs")
