import { CATEGORY_GROUPS } from '@/data/products';

export const revalidate = 86400;

export async function GET() {
  const data = {
    total: CATEGORY_GROUPS.length,
    categories: CATEGORY_GROUPS.map((g) => ({
      name: g.name,
      slug: g.slug,
      description: g.description,
      subcategories: g.categories,
      url: `https://chadaalyasmin.ma/products/${g.slug}`,
      pricingUrl: `https://chadaalyasmin.ma/prix/${g.slug}`,
    })),
  };

  return new Response(JSON.stringify(data, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
