import { mockProducts } from '@/data/products';
import { createClient } from '@supabase/supabase-js';

export const revalidate = 3600; // Cache sitemap statically, revalidate hourly

export async function GET() {
  const baseUrl = 'https://chadaalyasmin.ma';
  
  // Try to fetch products from Supabase using public credentials without cookies
  let products = mockProducts;
  try {
    const cleanEnv = (val: string | undefined) => (val && val.trim() !== "") ? val.trim() : undefined;
    const supabaseUrl = cleanEnv(process.env.NEXT_PUBLIC_SUPABASE_URL) || cleanEnv(process.env.SUPABASE_URL);
    const supabaseKey = cleanEnv(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) || cleanEnv(process.env.SUPABASE_KEY);
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Supabase credentials missing in env");
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await supabase.from('products').select('*');

    if (data && !error) {
      products = data.map((p: any) => ({
        id: p.id || p.ref,
        name: p.name || "Produit",
        category: p.category || "",
        description: p.description || "",
        image: p.mainImage || p.image || "",
        stockStatus: p.inStock ? "En Stock" : "En Rupture"
      }));
    }
  } catch (err) {
    console.error("Sitemap generation error:", err);
  }

  const urls = [
    { loc: `${baseUrl}/`, priority: '1.0', changefreq: 'monthly', image: null as string | null, title: '', description: '' },
    { loc: `${baseUrl}/products`, priority: '0.9', changefreq: 'weekly', image: null as string | null, title: 'Catalogue Produits', description: 'Trappes de visite, faux plafonds, isolation, dalles au Maroc.' },
    ...products.map(p => ({
      loc: `${baseUrl}/products/${p.id}`,
      priority: '0.8',
      changefreq: 'monthly',
      image: p.image ? (p.image.startsWith('http') ? p.image : `${baseUrl}${p.image}`) : null as string | null,
      title: p.name,
      description: p.description || ''
    }))
  ];

  const xmlItems = urls.map(item => {
    let imageXml = '';
    if (item.image) {
      const captionXml = item.description ? `\n      <image:caption>${escapeXml(item.description.slice(0, 200))}</image:caption>` : '';
      imageXml = `\n    <image:image>\n      <image:loc>${item.image.startsWith('http') ? item.image : `${baseUrl}${item.image}`}</image:loc>\n      <image:title>${escapeXml(item.title)}</image:title>${captionXml}\n    </image:image>`;
    }
    
    return `  <url>
    <loc>${item.loc}</loc>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>${imageXml}
  </url>`;
  }).join('\n');

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${xmlItems}
</urlset>`;

  return new Response(sitemapXml, {
    headers: {
      'Content-Type': 'application/xml',
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
