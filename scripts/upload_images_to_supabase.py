"""
Upload Product Images to Supabase Storage
==========================================
Scans portal/public/assets/ and assetstrappe/ for product images,
uploads them to Supabase Storage bucket 'product-images',
and updates the 'mainImage' column in the products table with CDN URLs.

PREREQUISITES:
1. Go to Supabase Dashboard → Storage → Create bucket named 'product-images'
2. Set the bucket to PUBLIC (so images load without auth)
3. Make sure your .env has SUPABASE_URL and SUPABASE_KEY set

USAGE:
  cd c:\Downloaded Web Sites\chadaalyasmin.ma
  python scripts/upload_images_to_supabase.py
"""

import os
import sys
import mimetypes
from pathlib import Path
from supabase import create_client
from dotenv import load_dotenv

# Load env from project root
load_dotenv(Path(__file__).parent.parent / ".env")

SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")
BUCKET_NAME = "product-images"

if not SUPABASE_URL or not SUPABASE_KEY:
    print("ERROR: SUPABASE_URL and SUPABASE_KEY must be set in .env")
    sys.exit(1)

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# Image directories to scan
PROJECT_ROOT = Path(__file__).parent.parent
IMAGE_DIRS = [
    PROJECT_ROOT / "portal" / "public" / "assets" / "img" / "portfolio",
    PROJECT_ROOT / "portal" / "public" / "assetstrappe" / "img",
]

SUPPORTED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"}


def get_content_type(filepath: str) -> str:
    mime, _ = mimetypes.guess_type(filepath)
    return mime or "application/octet-stream"


def upload_image(local_path: Path, storage_path: str) -> str | None:
    """Upload a single image and return the public URL."""
    try:
        with open(local_path, "rb") as f:
            file_data = f.read()

        # Upload to storage
        supabase.storage.from_(BUCKET_NAME).upload(
            path=storage_path,
            file=file_data,
            file_options={
                "content-type": get_content_type(str(local_path)),
                "upsert": "true",
            },
        )

        # Get public URL
        public_url = supabase.storage.from_(BUCKET_NAME).get_public_url(storage_path)
        return public_url

    except Exception as e:
        print(f"  ❌ Failed: {e}")
        return None


def main():
    print(f"🚀 Uploading images to Supabase Storage bucket: '{BUCKET_NAME}'")
    print(f"   Supabase URL: {SUPABASE_URL}\n")

    # Collect all images
    images = []
    for img_dir in IMAGE_DIRS:
        if not img_dir.exists():
            print(f"⚠️  Directory not found: {img_dir}")
            continue
        for f in img_dir.rglob("*"):
            if f.is_file() and f.suffix.lower() in SUPPORTED_EXTENSIONS:
                # Create a clean storage path: "portfolio/image-name.jpg"
                relative = f.relative_to(img_dir.parent.parent)  # relative to assets/
                storage_path = str(relative).replace("\\", "/").replace(" ", "-").lower()
                images.append((f, storage_path))

    print(f"📸 Found {len(images)} images to upload\n")

    uploaded = 0
    url_map = {}  # old_path -> new_url

    for local_path, storage_path in images:
        print(f"  ⬆️  {storage_path}...", end=" ")
        url = upload_image(local_path, storage_path)
        if url:
            print(f"✅")
            uploaded += 1
            # Map the old /assets/ path to new Supabase URL
            old_web_path = "/" + str(local_path.relative_to(PROJECT_ROOT / "portal" / "public")).replace("\\", "/")
            url_map[old_web_path] = url
        else:
            print(f"❌")

    print(f"\n📊 Uploaded {uploaded}/{len(images)} images")

    # Now update the products table
    if url_map:
        print(f"\n🔄 Updating product mainImage URLs in database...")
        try:
            products = supabase.table("products").select("id, name, mainImage").execute()
            updated_count = 0

            for product in products.data:
                old_image = product.get("mainImage", "")
                if old_image in url_map:
                    new_url = url_map[old_image]
                    supabase.table("products").update({"mainImage": new_url}).eq("id", product["id"]).execute()
                    print(f"  ✅ {product['name']}: {new_url[:60]}...")
                    updated_count += 1

            print(f"\n📊 Updated {updated_count} product URLs")
        except Exception as e:
            print(f"  ❌ DB update error: {e}")

    # Save URL map for reference
    map_file = PROJECT_ROOT / "scripts" / "image_url_map.txt"
    with open(map_file, "w") as f:
        for old, new in url_map.items():
            f.write(f"{old} → {new}\n")
    print(f"\n💾 URL map saved to: {map_file}")

    print(f"\n✅ DONE! Next steps:")
    print(f"   1. Verify images load on the site")
    print(f"   2. Delete next-app/public/assets/ and next-app/public/assetstrappe/")
    print(f"   3. Commit and push")


if __name__ == "__main__":
    main()
