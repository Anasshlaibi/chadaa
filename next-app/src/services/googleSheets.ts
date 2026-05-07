import Papa from "papaparse";
import { type Product, mockProducts } from "../data/products";
import { is_positive } from "../lib/utils";

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSR9MIqRC2LxaiiYo02usrWate9sunPDTfmYSEhfeZ5_mSIs4iEUvi0S2cIoW8yYKbcwdO7sYshCZuF/pub?output=csv";

export async function fetchCatalogFromSheet(): Promise<Product[]> {
  try {
    const response = await fetch(SHEET_URL);
    if (!response.ok) {
      console.warn(
        `Failed to fetch sheet: ${response.statusText}. Falling back to local data.`,
      );
      return mockProducts;
    }
    const csvData = await response.text();

    return new Promise((resolve) => {
      Papa.parse(csvData, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const data = results.data as Record<string, string>[];

          if (
            !data ||
            data.length === 0 ||
            (data.length === 1 && !data[0].id && !data[0].name)
          ) {
            console.warn(
              "Google Sheet is empty or invalid. Falling back to local data.",
            );
            resolve(mockProducts);
            return;
          }

          const products: Product[] = data
            .filter((row) => row.id || row.name || row.ref)
            .map((row) => {
              const inStock = is_positive(row.inStock);

              return {
                id:
                  row.id ||
                  row.ref ||
                  `prod-${Math.random().toString(36).substr(2, 9)}`,
                name: row.name || "Produit sans nom",
                category: row.category || "Général",
                description: row.description || "",
                image: row.mainImage || row.image || "",
                stockStatus: inStock
                  ? "En Stock"
                  : row.stockStatus || "Sur Commande",
                oldUrl: row.oldUrl || "",
                specs: {
                  Référence: row.ref || row.id || "",
                  Matériau: row.material || "Standard",
                  Finition: row.finish || "Standard",
                  Usage: row.usage || "Second Œuvre",
                  Origine: row.origin || "Certifié",
                },
                availability: inStock
                  ? "https://schema.org/InStock"
                  : "https://schema.org/OutOfStock",
              };
            });

          // Final safety check: if mapping resulted in no valid products, use mockProducts
          if (products.length === 0) {
            console.warn(
              "No valid products found in Google Sheet mapping. Falling back to local data.",
            );
            resolve(mockProducts);
          } else {
            resolve(products);
          }
        },
        error: (error: Error) => {
          console.error("Papa Parse Error:", error);
          resolve(mockProducts); // Still fallback on parse error
        },
      });
    });
  } catch (error) {
    console.error("Error fetching catalog from Google Sheets:", error);
    return mockProducts; // Fallback on network/fetch error
  }
}

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzOxmeZ2zm8AXhVqgjY60E19agw9pMrrubOJBZ6zPB8tX5uJJv7PC1q4ebVNMUt59tq0w/exec";

export async function fetchProducts(): Promise<Product[]> {
  try {
    // Calling the internal Supabase-backed API instead of Apps Script
    const response = await fetch("/api/products", { cache: "no-store" });
    if (!response.ok) throw new Error("Network response was not ok");

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
    console.error("Error fetching products from Supabase API:", error);
    // Fallback to CSV if API fails
    return fetchCatalogFromSheet();
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

    if (!response.ok) throw new Error("Network response was not ok");

    const result = await response.json();
    return result.status === "success";
  } catch (error) {
    console.error("Error sending quote request to Supabase API:", error);
    return false;
  }
}
