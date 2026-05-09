import { type Product, mockProducts } from "../data/products";

export async function fetchProducts(): Promise<Product[]> {
  try {
    // Calling the internal Supabase-backed API
    const response = await fetch("/api/products", { cache: "no-store" });
    
    if (!response.ok) {
      // Try to parse the exact error payload returned by our Python API
      let errorPayload = "Unknown error";
      try {
        const errorData = await response.json();
        errorPayload = JSON.stringify(errorData);
      } catch (e) {
        errorPayload = await response.text();
      }
      throw new Error(`Supabase API Error (${response.status}): ${errorPayload}`);
    }

    const result = await response.json();
    if (result.status === "success" && Array.isArray(result.products)) {
      return result.products.map((p: any) => ({
        id: p.id || p.ref,
        name: p.name || "Produit sans nom",
        category: p.category || "Général",
        description: p.description || "",
        image: p.image || "",
        stockStatus: p.stockStatus || (p.inStock ? "En Stock" : "En Rupture"),
        availability: p.inStock
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
        specs: p.specs || {},
      })) as Product[];
    }
    return mockProducts;
  } catch (error) {
    console.error("================ SUPABASE FETCH ERROR ================");
    console.error("Failed to fetch products from Supabase API:");
    console.error(error);
    console.error("======================================================");
    // Fallback to mock data if API fails
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
      } catch (e) {
        errorPayload = await response.text();
      }
      throw new Error(`Supabase API Error (${response.status}): ${errorPayload}`);
    }

    const result = await response.json();
    return result.status === "success";
  } catch (error) {
    console.error("================ SUPABASE QUOTE ERROR ================");
    console.error("Failed to send quote to Supabase API:");
    console.error(error);
    console.error("======================================================");
    return false;
  }
}
