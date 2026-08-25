import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getAllProducts, formatPriceDisplay } from '@/lib/products';
import { CATEGORY_GROUPS } from '@/data/products';
import { Tag, ArrowRight, ShieldCheck, Truck, MessageSquare, ChevronRight } from 'lucide-react';

export async function generateStaticParams() {
  return CATEGORY_GROUPS.map((group) => ({
    category: group.slug,
  }));
}

export const dynamicParams = true;

type Props = {
  params: Promise<{ category: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const group = CATEGORY_GROUPS.find((g) => g.slug === category);

  if (!group) {
    return {
      title: 'Catégorie non trouvée | Chada Alyasmin',
      robots: { index: false, follow: false },
    };
  }

  const canonicalUrl = `https://chadaalyasmin.ma/prix/${group.slug}`;
  const title = `Prix ${group.name} au Maroc | Tarifs & Devis — Chada Alyasmin`;
  const description = `Découvrez les prix actuels pour ${group.name.toLowerCase()} au Maroc : ${group.description} Tarifs direct usine à Casablanca, devis sous 24h et livraison sur tout le Maroc.`;

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
    },
  };
}

export default async function CategoryPricingPage({ params }: Props) {
  const { category } = await params;
  const group = CATEGORY_GROUPS.find((g) => g.slug === category);

  if (!group) {
    notFound();
  }

  const allProducts = await getAllProducts();
  const groupProducts = allProducts.filter((p) =>
    group.categories.includes(p.category)
  );

  const canonicalUrl = `https://chadaalyasmin.ma/prix/${group.slug}`;

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
        name: 'Prix des Matériaux',
        item: 'https://chadaalyasmin.ma/prix',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `Prix ${group.name}`,
        item: canonicalUrl,
      },
    ],
  };

  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Prix ${group.name} au Maroc`,
    description: group.description,
    itemListElement: groupProducts.map((p, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: p.name,
      url: `https://chadaalyasmin.ma/products/${p.slug}`,
    })),
  };

  return (
    <main className="min-h-screen bg-slate-50 font-sans pb-24 pt-20 lg:pt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd).replace(/</g, '\\u003c') }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd).replace(/</g, '\\u003c') }}
      />

      {/* Header */}
      <div className="bg-blue-950 text-white pt-10 pb-14 px-6">
        <div className="max-w-7xl mx-auto">
          <nav aria-label="Fil d'Ariane" className="flex items-center space-x-2 text-xs text-blue-200 mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Accueil
            </Link>
            <ChevronRight size={14} />
            <Link href="/prix" className="hover:text-white transition-colors">
              Prix des Matériaux
            </Link>
            <ChevronRight size={14} />
            <span className="text-amber-400 font-bold">{group.name}</span>
          </nav>

          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-amber-500/20 border border-amber-500/30 rounded-full text-amber-400 text-xs font-black uppercase tracking-wider mb-4">
            <Tag size={14} />
            <span>Grille Tarifaire Indicative Maroc</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
            Prix {group.name} au Maroc
          </h1>

          <p className="text-blue-200 text-base sm:text-lg max-w-3xl leading-relaxed">
            {group.description} Retrouvez ci-dessous la liste des produits disponibles en stock à Casablanca avec leurs tarifs indicatifs HT.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-10">
        {/* Products Price Table */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm mb-12">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  <th className="pb-3 pr-4">Désignation</th>
                  <th className="pb-3 px-4">Spécifications</th>
                  <th className="pb-3 px-4">Disponibilité</th>
                  <th className="pb-3 px-4 text-right">Tarification B2B</th>
                  <th className="pb-3 pl-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {groupProducts.map((p) => {
                  const price = formatPriceDisplay(p.pricing);
                  return (
                    <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 pr-4">
                        <div className="flex items-center space-x-3">
                          <div className="relative w-12 h-12 rounded-xl bg-slate-50 border p-1 shrink-0 overflow-hidden">
                            <Image
                              src={p.image}
                              alt={p.name}
                              fill
                              className="object-contain mix-blend-multiply p-1"
                              sizes="48px"
                            />
                          </div>
                          <div>
                            <Link
                              href={`/products/${p.slug}`}
                              className="font-bold text-blue-950 hover:text-amber-600 transition-colors"
                            >
                              {p.name}
                            </Link>
                            <p className="text-[10px] font-mono text-gray-400 uppercase">
                              REF: {p.ref || p.id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-xs text-gray-600">
                        {p.material || p.specs?.Matériau || 'Standard'} {p.finish ? `• ${p.finish}` : ''}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            p.stockStatus === 'En Rupture'
                              ? 'bg-red-50 text-red-700'
                              : 'bg-emerald-50 text-emerald-700'
                          }`}
                        >
                          {p.stockStatus}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right font-black text-blue-950">
                        {price.display}
                      </td>
                      <td className="py-4 pl-4 text-right">
                        <Link
                          href={`/products/${p.slug}`}
                          className="inline-block px-3 py-1.5 bg-slate-100 hover:bg-amber-500 hover:text-white rounded-xl text-xs font-bold text-blue-950 transition-all"
                        >
                          Fiche & Devis
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Fact Sheet & CTA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80">
            <h3 className="text-xl font-black text-blue-950 mb-4">
              Facteurs influençant les prix de {group.name.toLowerCase()}
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="text-amber-500 font-bold mr-2">•</span>
                <span><strong>Volume commandé :</strong> Les prix par palette, camion complet ou container bénéficient de remises dégressives importantes.</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-500 font-bold mr-2">•</span>
                <span><strong>Lieu de livraison :</strong> Enlèvement direct au dépôt de Casablanca ou livraison sur site (Casablanca, Rabat, Tanger, Marrakech, etc.).</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-500 font-bold mr-2">•</span>
                <span><strong>Normes et certifications :</strong> Produits conformes aux normes marocaines et européennes en vigueur.</span>
              </li>
            </ul>
          </div>

          <div className="bg-blue-950 text-white rounded-3xl p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-black mb-2">Obtenir un devis pour votre chantier</h3>
              <p className="text-blue-200 text-sm mb-6">
                Transmettez-nous votre quantitatif (BPU / DQE) pour recevoir une offre de prix proforma chiffrée sous 24h.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/devis"
                className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-blue-950 font-bold rounded-xl text-xs uppercase tracking-wider text-center transition-all"
              >
                Formulaire de Devis
              </Link>
              <a
                href="https://wa.me/212661138204"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare size={16} />
                WhatsApp Direct
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
