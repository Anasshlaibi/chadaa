import { Metadata } from 'next';
import { getAllProducts } from '@/lib/products';
import Catalog from '@/components/Catalog';
import Link from 'next/link';

export const metadata: Metadata = {
  metadataBase: new URL('https://chadaalyasmin.ma'),
  title: "Catalogue Matériaux de Construction & Second Œuvre Casablanca Maroc | Chada Alyasmin",
  description: "Catalogue complet de matériaux de second œuvre au Maroc : Trappes de visite Aluplaster, faux plafonds BA13, ossatures métalliques F60/M48, isolation laine de roche et dalles 600x600. Devis usine Casablanca.",
  keywords: [
    "trappe de visite Casablanca",
    "faux plafond BA13 Maroc",
    "isolation laine de roche Casablanca",
    "joint creux profilé aluminium",
    "plancher technique surélevé Maroc",
    "plaques de plâtre grossiste Casablanca",
    "matériaux de construction Maroc",
    "second oeuvre Casablanca",
    "fournisseur btp maroc"
  ],
  openGraph: {
    title: "Catalogue Matériaux de Construction & Second Œuvre | Chada Alyasmin Maroc",
    description: "Trappes de visite sur mesure, faux plafonds BA13, isolation et planchers techniques à Casablanca.",
    url: "https://chadaalyasmin.ma/products",
    type: "website",
  },
  alternates: {
    canonical: "https://chadaalyasmin.ma/products",
  },
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const { lang: langQuery } = await searchParams;
  const lang: 'fr' | 'ma' | 'en' =
    langQuery === 'en' || langQuery === 'ma' ? langQuery : 'fr';

  const products = await getAllProducts();

  const content = {
    fr: {
      tag: "Notre Catalogue",
      title: "Catalogue Matériaux de Second Œuvre",
      desc: "Découvrez notre gamme complète de matériaux de second œuvre, conçus pour l'excellence technique et la durabilité de vos chantiers au Maroc.",
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

  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Catalogue Matériaux Second Œuvre Maroc',
    itemListElement: products.map((p, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: p.name,
      url: `https://chadaalyasmin.ma/products/${p.slug}`,
    })),
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
    ],
  };

  return (
    <main className="min-h-screen bg-slate-50 font-sans pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd).replace(/</g, '\\u003c') }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd).replace(/</g, '\\u003c') }}
      />

      {/* Page Header */}
      <div className="pt-32 pb-14 bg-blue-950 text-white px-6">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav aria-label="Fil d'Ariane" className="flex items-center space-x-2 text-xs text-blue-200 mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Accueil
            </Link>
            <span>/</span>
            <span className="text-amber-400 font-bold">Produits</span>
          </nav>

          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-500 mb-3 inline-block">
            {content.tag}
          </p>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-4">
            {content.title}
          </h1>
          <p className="text-blue-200 max-w-2xl text-base sm:text-lg font-medium leading-relaxed">
            {content.desc}
          </p>
        </div>
      </div>

      {/* Interactive Catalog */}
      <div className="bg-slate-50 relative -top-8 px-4 sm:px-6">
        <Catalog products={products} isLoading={false} lang={lang} />
      </div>
    </main>
  );
}
