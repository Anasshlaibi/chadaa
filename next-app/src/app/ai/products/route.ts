import { getAllProducts } from '@/lib/products';

export const revalidate = 3600;

export async function GET() {
  const products = await getAllProducts();

  const data = {
    total: products.length,
    products: products.map((p) => ({
      id: p.id,
      ref: p.ref,
      slug: p.slug,
      name: p.name,
      category: p.category,
      brand: p.brand || null,
      price: p.pricing.price || null,
      currency: p.pricing.currency,
      unit: p.pricing.unit,
      priceType: p.pricing.priceType,
      isVerifiedPrice: p.pricing.isVerifiedPrice,
      stockStatus: p.stockStatus,
      url: `https://chadaalyasmin.ma/products/${p.slug}`,
      image: p.image.startsWith('http') ? p.image : `https://chadaalyasmin.ma${p.image}`,
      specs: p.specs || {},
      applications: p.applications || [],
    })),
  };

  return new Response(JSON.stringify(data, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
