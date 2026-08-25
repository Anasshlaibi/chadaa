import { getAllProducts } from '@/lib/products';
import { CATEGORY_GROUPS } from '@/data/products';

export const revalidate = 3600;

export async function GET() {
  const products = await getAllProducts();

  const data = {
    metadata: {
      generatedAt: new Date().toISOString(),
      source: 'https://chadaalyasmin.ma',
      company: 'Chada Alyasmin',
      country: 'Morocco',
      currency: 'MAD',
      totalProducts: products.length,
      totalCategories: CATEGORY_GROUPS.length,
    },
    company: {
      name: 'Chada Alyasmin',
      legalName: 'Chada Alyasmin SARL',
      nameArabic: 'شادي الياسمين',
      address: 'Boulevard Mohammed VI, Casablanca, Maroc',
      city: 'Casablanca',
      country: 'Morocco',
      phone: '+212661138204',
      website: 'https://chadaalyasmin.ma',
      yearEstablished: 2017,
      serviceAreas: ['Casablanca', 'Rabat', 'Tanger', 'Marrakech', 'Fès', 'Agadir', 'Oujda', 'National'],
      specialties: [
        'Trappes de visite',
        'Plaques de plâtre BA13',
        'Faux plafonds suspendus et modulaires',
        'Ossatures métalliques F60, M48, R48, T24',
        'Joints creux aluminium',
        'Isolation thermique et acoustique en laine de roche et laine de verre',
        'Planchers techniques surélevés',
      ],
    },
    categories: CATEGORY_GROUPS.map((g) => ({
      name: g.name,
      slug: g.slug,
      description: g.description,
      subcategories: g.categories,
      url: `https://chadaalyasmin.ma/products/${g.slug}`,
      pricingUrl: `https://chadaalyasmin.ma/prix/${g.slug}`,
    })),
    products: products.map((p) => ({
      id: p.id,
      ref: p.ref,
      name: p.name,
      slug: p.slug,
      url: `https://chadaalyasmin.ma/products/${p.slug}`,
      category: p.category,
      brand: p.brand || null,
      manufacturer: p.manufacturer || null,
      description: p.description,
      stockStatus: p.stockStatus,
      availability: p.availability,
      pricing: {
        price: p.pricing.price || null,
        currency: p.pricing.currency,
        unit: p.pricing.unit,
        priceType: p.pricing.priceType,
        isVerifiedPrice: p.pricing.isVerifiedPrice,
        priceUpdatedAt: p.pricing.priceUpdatedAt || null,
      },
      specifications: p.specs || {},
      applications: p.applications || [],
      image: p.image.startsWith('http') ? p.image : `https://chadaalyasmin.ma${p.image}`,
    })),
  };

  return new Response(JSON.stringify(data, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
