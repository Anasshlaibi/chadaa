import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import {
  type Product,
  type ProductPricing,
  type CategoryGroup,
  mockProducts,
  ID_TO_SLUG_MAP,
  CATEGORY_GROUPS,
} from '../data/products';

const mockMap = new Map(mockProducts.map((p) => [p.id, p]));
const slugMap = new Map(mockProducts.map((p) => [p.slug, p]));

/**
 * Standardized slugify utility
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Normalize image URL to ensure local assets are served directly and reliably
 */
export function normalizeProductImage(rawImage?: string | null): string {
  if (!rawImage) return '/logo.png';
  let img = rawImage;
  if (img.includes('supabase.co/storage/v1/object/public/product-images/')) {
    const relative = img.split('product-images/')[1];
    if (relative) {
      if (relative.startsWith('img/')) img = `/assets/${relative}`;
      else if (relative.startsWith('assetstrappe/')) img = `/${relative}`;
      else img = `/assets/${relative}`;
    }
  }
  // Fix casing and special character inconsistencies
  if (img.toLowerCase().includes('laine-ti212.jpg')) {
    img = img.replace(/laine-ti212\.jpg/i, 'laine-TI212.jpg');
  }
  if (img.includes("corniere-d'angle-metal.jpg") || img.includes("corniere-d&#x27;angle-metal.jpg")) {
    img = '/assets/img/portfolio/corniere.jpg';
  }
  return img;
}

/**
 * Get product slug from either an existing slug, ID, or generated name
 */
export function getProductSlug(idOrRef: string, name?: string): string {
  if (ID_TO_SLUG_MAP[idOrRef]) {
    return ID_TO_SLUG_MAP[idOrRef];
  }
  const found = mockMap.get(idOrRef);
  if (found && found.slug) {
    return found.slug;
  }
  if (name) {
    return slugify(name);
  }
  return slugify(idOrRef);
}

/**
 * Format price for human display (B2B Price Strategy)
 */
export function formatPriceDisplay(pricing?: ProductPricing): {
  display: string;
  isQuoteOnly: boolean;
  rawPrice?: number;
  unit?: string;
  badge: string;
} {
  const unitSuffix = pricing?.unit ? ` / ${pricing.unit}` : '';
  return {
    display: `Tarif Pro sur Devis${unitSuffix}`,
    isQuoteOnly: true,
    badge: 'Prix Direct Usine',
    unit: pricing?.unit,
  };
}

export async function getAllProducts(): Promise<Product[]> {
  try {
    const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { data, error } = await supabase.from('products').select('*');

      if (data && !error && data.length > 0) {
        const enriched: Product[] = data.map((rawItem: unknown) => {
          const dbProduct = rawItem as Record<string, unknown>;
          const id = String(dbProduct.id || dbProduct.ref || '');
          const mock = mockMap.get(id);

          const name = String(dbProduct.name || mock?.name || 'Produit sans nom');
          const category = String(dbProduct.category || mock?.category || 'Général');
          const slug = String(dbProduct.slug || ID_TO_SLUG_MAP[id] || slugify(name));
          const inStock = Boolean(dbProduct.inStock ?? mock?.inStock ?? true);

          const rawImg = String(dbProduct.mainImage || dbProduct.image || mock?.image || '/logo.png');
          const image = normalizeProductImage(rawImg);

          const thumbnails = Array.isArray(dbProduct.thumbnails)
            ? (dbProduct.thumbnails as string[]).map(normalizeProductImage)
            : mock?.thumbnails?.map(normalizeProductImage);

          // Combine specs
          const specs: Record<string, string> = {
            ...(mock?.specs || {}),
          };
          if (dbProduct.material) specs['Matériau'] = String(dbProduct.material);
          if (dbProduct.finish) specs['Finition'] = String(dbProduct.finish);
          if (dbProduct.usage) specs['Usage'] = String(dbProduct.usage);
          if (dbProduct.origin) specs['Origine'] = String(dbProduct.origin);

          const pricing = mock?.pricing || {
            currency: 'MAD' as const,
            unit: 'pièce' as const,
            priceType: 'quote' as const,
            isVerifiedPrice: false,
          };

          return {
            id,
            ref: String(dbProduct.ref || mock?.ref || id),
            slug,
            name,
            category,
            description: String(dbProduct.description || mock?.description || ''),
            image,
            thumbnails,
            stockStatus: inStock ? 'En Stock' : 'En Rupture',
            availability: inStock
              ? 'https://schema.org/InStock'
              : 'https://schema.org/OutOfStock',
            inStock,
            brand: mock?.brand,
            manufacturer: mock?.manufacturer,
            sku: mock?.sku || `CA-${id.toUpperCase()}`,
            specs,
            pricing,
            material: dbProduct.material ? String(dbProduct.material) : mock?.material,
            finish: dbProduct.finish ? String(dbProduct.finish) : mock?.finish,
            usage: dbProduct.usage ? String(dbProduct.usage) : mock?.usage,
            origin: dbProduct.origin ? String(dbProduct.origin) : mock?.origin,
            applications: mock?.applications,
            features: mock?.features,
            relatedProductIds: mock?.relatedProductIds,
          };
        });

        return enriched;
      }
    }
  } catch (err) {
    console.error('Supabase query fallback error:', err);
  }

  return mockProducts;
}

function createClient(url: string, key: string) {
  return createSupabaseClient(url, key);
}

/**
 * Get product by either slug or legacy ID
 */
export async function getProductBySlugOrId(slugOrId: string): Promise<{
  product: Product | null;
  isLegacyId: boolean;
  canonicalSlug: string | null;
}> {
  const allProducts = await getAllProducts();

  // 1. Exact match on slug
  const bySlug = allProducts.find((p) => p.slug === slugOrId);
  if (bySlug) {
    return {
      product: bySlug,
      isLegacyId: false,
      canonicalSlug: bySlug.slug,
    };
  }

  // 2. Match on legacy ID or ref
  const byId = allProducts.find((p) => p.id === slugOrId || p.ref === slugOrId);
  if (byId) {
    return {
      product: byId,
      isLegacyId: true,
      canonicalSlug: byId.slug,
    };
  }

  // 3. Fallback check on mock data
  const mockBySlug = slugMap.get(slugOrId);
  if (mockBySlug) {
    return {
      product: mockBySlug,
      isLegacyId: false,
      canonicalSlug: mockBySlug.slug,
    };
  }

  const mockById = mockMap.get(slugOrId);
  if (mockById) {
    return {
      product: mockById,
      isLegacyId: true,
      canonicalSlug: mockById.slug,
    };
  }

  return {
    product: null,
    isLegacyId: false,
    canonicalSlug: null,
  };
}

/**
 * Get products by category group slug
 */
export async function getProductsByCategoryGroup(groupSlug: string): Promise<{
  group: CategoryGroup | null;
  products: Product[];
}> {
  const group = CATEGORY_GROUPS.find((g) => g.slug === groupSlug) || null;
  if (!group) {
    return { group: null, products: [] };
  }

  const allProducts = await getAllProducts();
  const products = allProducts.filter((p) => group.categories.includes(p.category));

  return { group, products };
}

/**
 * Build related products graph
 */
export function getRelatedProducts(product: Product, allProducts: Product[]): Product[] {
  const related: Product[] = [];

  // 1. Explicit related IDs
  if (product.relatedProductIds && product.relatedProductIds.length > 0) {
    for (const relId of product.relatedProductIds) {
      const found = allProducts.find((p) => p.id === relId || p.slug === relId);
      if (found && !related.some((r) => r.id === found.id) && found.id !== product.id) {
        related.push(found);
      }
    }
  }

  // 2. Same category products
  if (related.length < 4) {
    const sameCategory = allProducts.filter(
      (p) => p.category === product.category && p.id !== product.id && !related.some((r) => r.id === p.id)
    );
    related.push(...sameCategory.slice(0, 4 - related.length));
  }

  // 3. Same category group products
  if (related.length < 4) {
    const matchingGroup = CATEGORY_GROUPS.find((g) => g.categories.includes(product.category));
    if (matchingGroup) {
      const sameGroup = allProducts.filter(
        (p) =>
          matchingGroup.categories.includes(p.category) &&
          p.id !== product.id &&
          !related.some((r) => r.id === p.id)
      );
      related.push(...sameGroup.slice(0, 4 - related.length));
    }
  }

  return related.slice(0, 4);
}
