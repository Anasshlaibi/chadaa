import { mockProducts } from '@/data/products';
import { createClient } from '@supabase/supabase-js';

export const revalidate = 3600; // Hourly revalidation for Google Merchant Center

export async function GET() {
  const baseUrl = 'https://chadaalyasmin.ma';

  let products = mockProducts;
  try {
    const cleanEnv = (val: string | undefined) => (val && val.trim() !== "") ? val.trim() : undefined;
    const supabaseUrl = cleanEnv(process.env.NEXT_PUBLIC_SUPABASE_URL) || cleanEnv(process.env.SUPABASE_URL);
    const supabaseKey = cleanEnv(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) || cleanEnv(process.env.SUPABASE_KEY);
    
    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { data, error } = await supabase.from('products').select('*');

      if (data && !error && data.length > 0) {
        products = data.map((p: any) => ({
          id: p.id || p.ref,
          name: p.name || "Produit",
          category: p.category || "Matériaux de Construction",
          description: p.description || p.name,
          image: p.mainImage || p.image || "",
          stockStatus: p.inStock ? "En Stock" : "En Rupture"
        }));
      }
    }
  } catch (err) {
    console.error("Merchant feed generation error:", err);
  }

  const itemsXml = products.map(p => {
    const imageUrl = p.image
      ? (p.image.startsWith('http') ? p.image : `${baseUrl}${p.image}`)
      : `${baseUrl}/logo.png`;

    const productUrl = `${baseUrl}/products/${p.id}`;
    const availability = p.stockStatus === 'En Rupture' ? 'out_of_stock' : 'in_stock';

    return `    <item>
      <g:id>${escapeXml(p.id)}</g:id>
      <g:title>${escapeXml(p.name)}</g:title>
      <g:description>${escapeXml(p.description || p.name)}</g:description>
      <g:link>${productUrl}</g:link>
      <g:image_link>${imageUrl}</g:image_link>
      <g:condition>new</g:condition>
      <g:availability>${availability}</g:availability>
      <g:price>150.00 MAD</g:price>
      <g:brand>Chada Alyasmin</g:brand>
      <g:google_product_category>Building Materials</g:google_product_category>
      <g:identifier_exists>no</g:identifier_exists>
    </item>`;
  }).join('\n');

  const feedXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Chada Alyasmin Products</title>
    <link>${baseUrl}</link>
    <description>Catalogue Second Oeuvre et Matériaux de Construction au Maroc</description>
${itemsXml}
  </channel>
</rss>`;

  return new Response(feedXml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=600'
    }
  });
}

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}
