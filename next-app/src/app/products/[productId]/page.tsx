import { Metadata } from 'next';
import Link from 'next/link';
import { permanentRedirect } from 'next/navigation';
import ProductDetailPageComponent from '@/components/ProductDetailPage';
import CategoryLandingPageComponent from '@/components/CategoryLandingPage';
import { getAllProducts, getProductBySlugOrId, formatPriceDisplay, getRelatedProducts } from '@/lib/products';
import { CATEGORY_GROUPS, type CategoryGroup } from '@/data/products';

// Pre-render products and category groups at build time
export async function generateStaticParams() {
  const products = await getAllProducts();
  const params: { productId: string }[] = [];

  // Add category group slugs
  for (const group of CATEGORY_GROUPS) {
    params.push({ productId: group.slug });
  }

  // Add product slugs & legacy IDs
  for (const p of products) {
    params.push({ productId: p.slug });
    if (p.id && p.id !== p.slug) {
      params.push({ productId: p.id });
    }
  }

  return params;
}

export const dynamicParams = true;

type Props = {
  params: Promise<{ productId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { productId } = await params;

  // 1. Check if this is a Category Group
  const categoryGroup = CATEGORY_GROUPS.find((g) => g.slug === productId);
  if (categoryGroup) {
    const canonicalUrl = `https://chadaalyasmin.ma/products/${categoryGroup.slug}`;
    const title = `${categoryGroup.name} Maroc — Fabricant & Fournisseur | Chada Alyasmin`;
    const description = `Découvrez notre gamme complète de ${categoryGroup.name.toLowerCase()} au Maroc : ${categoryGroup.description} Stock disponible à Casablanca et devis direct.`;

    return {
      metadataBase: new URL('https://chadaalyasmin.ma'),
      title,
      description,
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        title,
        description,
        url: canonicalUrl,
        type: 'website',
        locale: 'fr_MA',
      },
    };
  }

  // 2. Check if this is a Product
  const { product } = await getProductBySlugOrId(productId);

  if (!product) {
    return {
      title: 'Page non trouvée | Chada Alyasmin Maroc',
      robots: { index: false, follow: false },
    };
  }

  const canonicalUrl = `https://chadaalyasmin.ma/products/${product.slug}`;
  const priceInfo = formatPriceDisplay(product.pricing);
  const priceText = !priceInfo.isQuoteOnly ? ` — ${priceInfo.display}` : '';
  const imageUrl = product.image.startsWith('http') ? product.image : `https://chadaalyasmin.ma${product.image}`;

  const cleanDescription = product.description.length > 150
    ? `${product.description.slice(0, 147)}...`
    : product.description;

  const metaDescription = `${product.name}${priceText}. ${cleanDescription} Caractéristiques techniques, stock disponible à Casablanca et livraison partout au Maroc. Devis proforma rapide.`;

  return {
    metadataBase: new URL('https://chadaalyasmin.ma'),
    title: `${product.name} | Chada Alyasmin Maroc`,
    description: metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${product.name} | Chada Alyasmin Maroc`,
      description: metaDescription,
      url: canonicalUrl,
      type: 'article',
      locale: 'fr_MA',
      siteName: 'Chada Alyasmin',
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 800,
          alt: `${product.name} - Chada Alyasmin Casablanca`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | Chada Alyasmin Maroc`,
      description: metaDescription,
      images: [imageUrl],
    },
  };
}

export default async function ProductOrCategoryPage({ params }: Props) {
  const { productId } = await params;

  // 1. Check if this is a Category Group Landing Page
  const categoryGroup = CATEGORY_GROUPS.find((g) => g.slug === productId);
  if (categoryGroup) {
    const allProducts = await getAllProducts();
    const groupProducts = allProducts.filter((p) =>
      categoryGroup.categories.includes(p.category)
    );

    const canonicalUrl = `https://chadaalyasmin.ma/products/${categoryGroup.slug}`;

    const breadcrumbLd = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Accueil',
          item: 'https://chadaalyasmin.ma',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Produits',
          item: 'https://chadaalyasmin.ma/products',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: categoryGroup.name,
          item: canonicalUrl,
        },
      ],
    };

    const itemListLd = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: `${categoryGroup.name} au Maroc`,
      description: categoryGroup.description,
      itemListElement: groupProducts.map((p, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: p.name,
        url: `https://chadaalyasmin.ma/products/${p.slug}`,
      })),
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd).replace(/</g, '\\u003c') }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd).replace(/</g, '\\u003c') }}
        />
        <CategoryLandingPageComponent
          categoryGroup={categoryGroup}
          products={groupProducts}
        />
      </>
    );
  }

  // 2. Otherwise, resolve Product
  const { product, isLegacyId, canonicalSlug } = await getProductBySlugOrId(productId);

  // 301 Permanent Redirect legacy ID to canonical slug URL
  if (product && isLegacyId && canonicalSlug && productId !== canonicalSlug) {
    permanentRedirect(`/products/${canonicalSlug}`);
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-white font-sans">
        <h2 className="text-3xl font-black text-blue-950 mb-4">Produit ou Catégorie non trouvé</h2>
        <p className="text-gray-500 mb-6 max-w-md">
          Cette ressource n'existe pas ou a été déplacée.
        </p>
        <Link
          href="/products"
          className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-blue-950 font-bold rounded-xl transition-all"
        >
          Retour au catalogue complet
        </Link>
      </div>
    );
  }

  const allProducts = await getAllProducts();
  const relatedProducts = getRelatedProducts(product, allProducts);
  const imageUrl = product.image.startsWith('http') ? product.image : `https://chadaalyasmin.ma${product.image}`;
  const canonicalUrl = `https://chadaalyasmin.ma/products/${product.slug}`;

  const matchingCategoryGroup = CATEGORY_GROUPS.find((g) => g.categories.includes(product.category));
  const categoryUrl = matchingCategoryGroup
    ? `https://chadaalyasmin.ma/products/${matchingCategoryGroup.slug}`
    : `https://chadaalyasmin.ma/products`;

  // B2B Offer Schema (matches visible B2B proforma pricing)
  const offerSchema: Record<string, any> = {
    '@type': 'Offer',
    url: canonicalUrl,
    priceCurrency: 'MAD',
    itemCondition: 'https://schema.org/NewCondition',
    availability:
      product.stockStatus === 'En Rupture'
        ? 'https://schema.org/OutOfStock'
        : 'https://schema.org/InStock',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      priceCurrency: 'MAD',
      unitText: product.pricing?.unit || 'pièce',
      description: 'Tarif dégressif sur devis proforma selon volume',
    },
    seller: {
      '@type': 'Organization',
      name: 'Chada Alyasmin',
      '@id': 'https://chadaalyasmin.ma/#organization',
    },
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${canonicalUrl}#product`,
    name: product.name,
    description: product.description,
    image: imageUrl,
    sku: product.sku || product.id,
    mpn: product.ref || product.id,
    category: product.category,
    ...(product.brand
      ? {
          brand: {
            '@type': 'Brand',
            name: product.brand,
          },
        }
      : {}),
    ...(product.manufacturer
      ? {
          manufacturer: {
            '@type': 'Organization',
            name: product.manufacturer,
          },
        }
      : {}),
    offers: offerSchema,
  };

  const imageLd = {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    contentUrl: imageUrl,
    license: 'https://chadaalyasmin.ma',
    acquireLicensePage: canonicalUrl,
    creditText: 'Chada Alyasmin Morocco',
    creator: {
      '@type': 'Organization',
      name: 'Chada Alyasmin',
      '@id': 'https://chadaalyasmin.ma/#organization',
    },
    copyrightNotice: 'Chada Alyasmin',
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: 'https://chadaalyasmin.ma',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Produits',
        item: 'https://chadaalyasmin.ma/products',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.category,
        item: categoryUrl,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: product.name,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(imageLd).replace(/</g, '\\u003c') }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd).replace(/</g, '\\u003c') }}
      />
      <ProductDetailPageComponent
        product={product}
        relatedProducts={relatedProducts}
        categoryGroupSlug={matchingCategoryGroup?.slug}
      />
    </>
  );
}
