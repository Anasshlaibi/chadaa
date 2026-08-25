import { getAllProducts } from '@/lib/products';

export const revalidate = 3600; // Hourly revalidation for Google Merchant Center

export async function GET() {
  const baseUrl = 'https://chadaalyasmin.ma';
  const products = await getAllProducts();

  const itemsXml = products.map((p) => {
    const imageUrl = p.image
      ? (p.image.startsWith('http') ? p.image : `${baseUrl}${p.image}`)
      : `${baseUrl}/logo.png`;

    const productUrl = `${baseUrl}/products/${p.slug}`;
    const availability = p.stockStatus === 'En Rupture' ? 'out_of_stock' : 'in_stock';
    const brand = p.brand || 'Chada Alyasmin';
    const priceStr = p.pricing.price ? `${p.pricing.price.toFixed(2)} MAD` : '100.00 MAD';

    return `    <item>
      <g:id>${escapeXml(p.id)}</g:id>
      <g:title>${escapeXml(p.name)}</g:title>
      <g:description>${escapeXml(p.description || p.name)}</g:description>
      <g:link>${productUrl}</g:link>
      <g:image_link>${imageUrl}</g:image_link>
      <g:condition>new</g:condition>
      <g:availability>${availability}</g:availability>
      <g:price>${priceStr}</g:price>
      <g:brand>${escapeXml(brand)}</g:brand>
      <g:google_product_category>Hardware &gt; Building Materials</g:google_product_category>
      <g:identifier_exists>no</g:identifier_exists>
      <g:shipping>
        <g:country>MA</g:country>
        <g:service>Livraison Standard Maroc</g:service>
        <g:price>0.00 MAD</g:price>
      </g:shipping>
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
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=600',
    },
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
