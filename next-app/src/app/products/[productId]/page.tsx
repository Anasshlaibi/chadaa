import { Metadata } from 'next';
import Link from 'next/link';
import ProductDetailPageComponent from '@/components/ProductDetailPage';
import { type Product, mockProducts } from '@/data/products';
import { createClient } from '@/utils/supabase/server';

type Props = {
  params: Promise<{ productId: string }>;
};

// Helper function to fetch product data server-side
async function getProductById(productId: string): Promise<Product | null> {
  const mockProduct = mockProducts.find(p => p.id === productId);

  try {
    const supabase = await createClient();
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
    title: `${product.name} | Chada Alyasmin`,
    description: `${product.description} Retrouvez nos solutions de trappe de visite et faux plafonds au Maroc.`,
    openGraph: {
      title: `${product.name} | Chada Alyasmin`,
      description: product.description,
      images: [{ url: product.image }],
    },
    keywords: ["trappe de visite", product.category, "Chada Alyasmin", "Maroc", "aménagement"],
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": product.image.startsWith('http') ? product.image : `https://chadaalyasmin.ma${product.image}`,
    "sku": product.id,
    "brand": {
      "@type": "Brand",
      "name": "Chada Alyasmin"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://chadaalyasmin.ma/products/${product.id}`,
      "priceCurrency": "MAD",
      "availability": product.stockStatus === "En Rupture"
        ? "https://schema.org/OutOfStock"
        : "https://schema.org/InStock"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailPageComponent product={product} />
    </>
  );
}


