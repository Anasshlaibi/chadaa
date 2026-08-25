import { type Product, mockProducts } from "../data/products";
import { normalizeProductImage } from "../lib/products";

const mockMap = new Map(mockProducts.map((p) => [p.id, p]));

export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch("/api/products", { cache: "no-store" });
    
    if (!response.ok) {
      let errorPayload = "Unknown error";
      try {
        const errorData = await response.json();
        errorPayload = JSON.stringify(errorData);
      } catch {
        errorPayload = await response.text();
      }
      throw new Error(`Supabase API Error (${response.status}): ${errorPayload}`);
    }

    const result = await response.json();
    if (result.status === "success" && Array.isArray(result.products)) {
      return result.products.map((rawItem: unknown) => {
        const p = rawItem as Record<string, unknown>;
        const id = String(p.id || p.ref || '');
        const mock = mockMap.get(id);
        const name = String(p.name || mock?.name || "Produit sans nom");
        const inStock = Boolean(p.inStock ?? (p.stockStatus === "En Stock"));

        const rawImg = String(p.image || p.mainImage || mock?.image || "/logo.png");
        const image = normalizeProductImage(rawImg);

        const thumbnails = Array.isArray(p.thumbnails)
          ? (p.thumbnails as string[]).map(normalizeProductImage)
          : mock?.thumbnails?.map(normalizeProductImage);

        return {
          id,
          ref: String(p.ref || mock?.ref || id),
          slug: mock?.slug || id,
          name,
          category: String(p.category || mock?.category || "Général"),
          description: String(p.description || mock?.description || ""),
          image,
          thumbnails,
          stockStatus: inStock ? "En Stock" : "En Rupture",
          availability: inStock
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
          inStock,
          brand: mock?.brand,
          manufacturer: mock?.manufacturer,
          sku: mock?.sku || `CA-${id.toUpperCase()}`,
          specs: { ...(mock?.specs || {}), ...((p.specs as Record<string, string>) || {}) },
          pricing: mock?.pricing || {
            currency: "MAD",
            unit: "pièce",
            priceType: "quote",
            isVerifiedPrice: false,
          },
          applications: mock?.applications,
          features: mock?.features,
          relatedProductIds: mock?.relatedProductIds,
        } as Product;
      });
    }
    return mockProducts;
  } catch (error) {
    console.error("Failed to fetch products from Supabase API, using fallback:", error);
    return mockProducts;
  }
}

export async function sendQuoteRequest(payload: {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  cart: Array<{ id: string; name: string; quantity: number }>;
}): Promise<boolean> {
  try {
    const response = await fetch("/api/quotes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      let errorPayload = "Unknown error";
      try {
        const errorData = await response.json();
        errorPayload = JSON.stringify(errorData);
      } catch {
        errorPayload = await response.text();
      }
      throw new Error(`Supabase API Error (${response.status}): ${errorPayload}`);
    }

    const result = await response.json();
    return result.status === "success";
  } catch (error) {
    console.error("Failed to send quote to Supabase API:", error);
    return false;
  }
}
