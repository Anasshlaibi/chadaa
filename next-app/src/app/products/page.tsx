import { Metadata } from 'next';
import { createClient } from '@/utils/supabase/server';
import { mockProducts, type Product } from '@/data/products';
import Catalog from '@/components/Catalog';

export const metadata: Metadata = {
  title: "Catalogue Produits | Chada Alyasmin - Faux Plafonds, Trappes, Isolation au Maroc",
  description: "Découvrez notre catalogue complet : trappes de visite, faux plafonds, dalles, isolation, ossatures métalliques. Livraison au Maroc. Prix grossiste.",
  openGraph: {
    title: "Catalogue Produits | Chada Alyasmin",
    description: "Trappes de visite, faux plafonds, dalles, isolation, ossatures métalliques au Maroc.",
    url: "https://chadaalyasmin.ma/products",
    type: "website",
  },
  alternates: {
    canonical: "https://chadaalyasmin.ma/products",
  },
};

async function getProducts(): Promise<Product[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from('products').select('*');
    if (data && !error && data.length > 0) {
      return data.map((p: any) => ({
        id: p.id || p.ref,
        name: p.name || 'Produit',
        category: p.category || '',
        description: p.description || '',
        image: p.mainImage || p.image || '',
        stockStatus: p.inStock ? 'En Stock' : 'En Rupture',
        availability: p.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        specs: p.specs || {},
      }));
    }
  } catch (err) {
    console.error('Supabase product fetch error (falling back to mock):', err);
  }
  return mockProducts;
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const { lang: langQuery } = await searchParams;
  const lang: 'fr' | 'ma' | 'en' =
    langQuery === 'en' || langQuery === 'ma' ? langQuery : 'fr';

  const products = await getProducts();

  const content = {
    fr: {
      tag: "Notre Catalogue",
      title: "Tous Nos Produits",
      desc: "Découvrez notre gamme complète de matériaux de second œuvre, conçus pour l'excellence et la durabilité de vos chantiers.",
    },
    ma: {
      tag: "Notre Stock",
      title: "Tous les Produits",
      desc: "Découvrez notre gamme complète au Maroc avec les meilleurs prix de gros pour vos chantiers.",
    },
    en: {
      tag: "Our Catalog",
      title: "All Our Products",
      desc: "Discover our complete range of finishing materials, designed for excellence and durability for your projects.",
    },
  }[lang];

  return (
    <main className="min-h-screen bg-slate-50 font-sans">
      {/* Page Header — rendered server-side, fully visible to Googlebot */}
      <div className="pt-32 pb-10 bg-blue-950 text-white px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-500 mb-4 inline-block">
            {content.tag}
          </p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
            {content.title}
          </h1>
          <p className="text-blue-200 max-w-2xl text-lg font-medium">
            {content.desc}
          </p>
        </div>
      </div>

      {/* Hidden SEO product link list — all products indexed by Google, invisible to users */}
      <nav aria-label="Product index" className="sr-only">
        <ul>
          {products.map((p) => (
            <li key={p.id}>
              <a href={`/products/${p.id}`}>{p.name} — {p.category}</a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Interactive Catalog — client component, gets full product list as prop */}
      <div className="bg-slate-50 relative -top-20">
        <Catalog products={products} isLoading={false} lang={lang} />
      </div>
    </main>
  );
}
