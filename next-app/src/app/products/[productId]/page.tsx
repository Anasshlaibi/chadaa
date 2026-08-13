import { Metadata } from 'next';
import Link from 'next/link';
import ProductDetailPageComponent from '@/components/ProductDetailPage';
import { type Product, mockProducts } from '@/data/products';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// Pre-render all known product pages at build time for maximum SEO performance
export async function generateStaticParams() {
  return mockProducts.map((p) => ({ productId: p.id }));
}

// Allow new Supabase-only products (not in mockProducts) to render dynamically
export const dynamicParams = true;

type Props = {
  params: Promise<{ productId: string }>;
};

// Helper function to fetch product data server-side (using plain client for static generation)
async function getProductById(productId: string): Promise<Product | null> {
  const mockProduct = mockProducts.find(p => p.id === productId);

  try {
    const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) throw new Error('Supabase credentials missing');

    const supabase = createSupabaseClient(supabaseUrl, supabaseKey);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .or(`ref.eq.${productId},id.eq.${productId}`)
      .maybeSingle();

    if (data && !error) {
      const inStock = data.inStock ?? true;
      return {
        id: data.id || data.ref,
        name: data.name || "Produit sans nom",
        category: data.category || "Général",
        description: data.description || "",
        image: data.mainImage || data.image || "",
        stockStatus: data.stockStatus || (inStock ? "En Stock" : "En Rupture"),
        availability: inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        specs: data.specs || {},
      };
    }
  } catch (err) {
    console.error("Error fetching product from Supabase server-side:", err);
  }

  return mockProduct || null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { productId } = await params;
  const product = await getProductById(productId);

  if (!product) {
    return {
      title: "Produit non trouvé | Chada Alyasmin",
    };
  }

  return {
    metadataBase: new URL('https://chadaalyasmin.ma'),
    title: `${product.name} | Chada Alyasmin Maroc - شادي الياسمين`,
    description: `${product.description} Acheter ${product.name} au meilleur prix grossiste à Casablanca et livraison au Maroc. شادي الياسمين لمواد البناء.`,
    openGraph: {
      title: `${product.name} | Chada Alyasmin - شادي الياسمين`,
      description: product.description,
      images: [{ url: product.image.startsWith('http') ? product.image : `https://chadaalyasmin.ma${product.image}` }],
    },
    keywords: [
      product.name,
      product.category,
      "trappe de visite Casablanca",
      "faux plafond BA13",
      "شادي الياسمين",
      "فتحات الزيارة المغرب",
      "أسقف مستعارة الدار البيضاء",
      "مواد البناء المغرب",
      "Chada Alyasmin",
      "Maroc"
    ],
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { productId } = await params;
  const product = await getProductById(productId);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-white font-sans">
        <h2 className="text-3xl font-black text-blue-950 mb-4">Produit non trouvé</h2>
        <Link href="/products" className="text-amber-600 font-bold hover:underline">
          Retour au catalogue
        </Link>
      </div>
    );
  }

  const imageUrl = product.image.startsWith('http') ? product.image : `https://chadaalyasmin.ma${product.image}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description || `Acheter ${product.name} au meilleur prix de gros au Maroc chez Chada Alyasmin.`,
    "image": imageUrl,
    "sku": product.id,
    "mpn": product.id,
    "brand": {
      "@type": "Brand",
      "name": "Chada Alyasmin"
    },
    "category": product.category,
    "offers": {
      "@type": "AggregateOffer",
      "url": `https://chadaalyasmin.ma/products/${product.id}`,
      "priceCurrency": "MAD",
      "lowPrice": "150.00",
      "highPrice": "2500.00",
      "offerCount": "10",
      "priceValidUntil": "2027-12-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": product.stockStatus === "En Rupture"
        ? "https://schema.org/OutOfStock"
        : "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Chada Alyasmin"
      }
    }
  };

  const imageLd = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "contentUrl": imageUrl,
    "license": "https://chadaalyasmin.ma",
    "acquireLicensePage": `https://chadaalyasmin.ma/products/${product.id}`,
    "creditText": "Chada Alyasmin Morocco",
    "creator": {
      "@type": "Organization",
      "name": "Chada Alyasmin"
    },
    "copyrightNotice": "Chada Alyasmin"
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Accueil",
        "item": "https://chadaalyasmin.ma"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Catalogue Produits",
        "item": "https://chadaalyasmin.ma/products"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": product.name,
        "item": `https://chadaalyasmin.ma/products/${product.id}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(imageLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <ProductDetailPageComponent product={product} />
    </>
  );
}


