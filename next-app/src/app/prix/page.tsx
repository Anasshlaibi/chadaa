import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAllProducts, formatPriceDisplay } from '@/lib/products';
import { CATEGORY_GROUPS } from '@/data/products';
import {
  Tag,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  ArrowRight,
  TrendingDown,
  Truck,
  Building2,
  FileSpreadsheet
} from 'lucide-react';

export const metadata: Metadata = {
  metadataBase: new URL('https://chadaalyasmin.ma'),
  title: 'Prix des matériaux de second œuvre au Maroc | Chada Alyasmin',
  description: 'Consultez les prix vérifiés des matériaux de second œuvre au Maroc : Plaques de plâtre BA13, Trappes de visite, Isolation laine de roche, Dalles de plafond et Profilés aluminium. Devis grossiste Casablanca.',
  alternates: {
    canonical: 'https://chadaalyasmin.ma/prix',
  },
  openGraph: {
    title: 'Prix des matériaux de second œuvre au Maroc | Chada Alyasmin',
    description: 'Tarifs de référence et prix grossistes B2B pour le bâtiment et la finition au Maroc (Casablanca, Rabat, Tanger, Marrakech).',
    url: 'https://chadaalyasmin.ma/prix',
    type: 'website',
  },
};

export default async function PricingHubPage() {
  const products = await getAllProducts();

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Comment sont calculés les prix des matériaux de second œuvre chez Chada Alyasmin ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Les prix affichés sont exprimés en Dirhams marocains Hors Taxes (MAD HT). Des tarifs dégressifs sont appliqués selon les volumes commandés pour les entreprises générales de bâtiment, plaquistes et revendeurs.',
        },
      },
      {
        '@type': 'Question',
        name: 'Quel est le prix moyen d\'une plaque de plâtre BA13 au Maroc ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Le prix d\'une plaque de plâtre BA13 standard débute à partir de 34 MAD HT le m² (soit environ 85 à 95 MAD HT la plaque de 2.50 x 1.20 m selon les volumes et les arrivages). Les plaques hydrofuges débutent à environ 52 MAD HT le m².',
        },
      },
      {
        '@type': 'Question',
        name: 'Quel est le prix d\'une trappe de visite aluplaster à Casablanca ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Les trappes de visite Aluplaster standard débutent à partir de 156 MAD HT l\'unité (format 20x20 cm jusqu\'à 60x60 cm). Les modèles hydrofuges étanches débutent à 185 MAD HT.',
        },
      },
    ],
  };

  return (
    <main className="min-h-screen bg-slate-50 font-sans pb-24 pt-20 lg:pt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }}
      />

      {/* Header Banner */}
      <div className="bg-blue-950 text-white pt-12 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav aria-label="Fil d'Ariane" className="flex items-center space-x-2 text-xs text-blue-200 mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Accueil
            </Link>
            <span>/</span>
            <span className="text-amber-400 font-bold">Prix des Matériaux</span>
          </nav>

          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-amber-500/20 border border-amber-500/30 rounded-full text-amber-400 text-xs font-black uppercase tracking-wider mb-4">
            <Tag size={14} />
            <span>Tarifs de référence B2B Maroc</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6">
            Prix des matériaux de second œuvre au Maroc
          </h1>

          <p className="text-blue-200 text-base sm:text-lg max-w-3xl leading-relaxed">
            Consultez les prix publics et indicatifs de nos gammes de matériaux pour faux plafonds, cloisons sèches, isolation thermique et planchers techniques. Tarifs directs fabricant et distributeur à Casablanca avec expédition sur tout le Maroc.
          </p>

          {/* Key B2B Guarantee Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/10 text-xs">
            <div className="flex items-center space-x-3 text-blue-100">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-amber-400 shrink-0">
                <TrendingDown size={18} />
              </div>
              <span>Prix d'usine compétitifs et remises sur volume</span>
            </div>
            <div className="flex items-center space-x-3 text-blue-100">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-amber-400 shrink-0">
                <Building2 size={18} />
              </div>
              <span>Stock permanent & retrait dépôt Casablanca</span>
            </div>
            <div className="flex items-center space-x-3 text-blue-100">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-amber-400 shrink-0">
                <Truck size={18} />
              </div>
              <span>Livraison chantiers partout au Maroc</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-12">
        {/* Category Quick Links */}
        <section className="mb-12">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-amber-600 mb-4">
            Accès rapide par catégorie
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {CATEGORY_GROUPS.map((group) => (
              <Link
                key={group.slug}
                href={`/prix/${group.slug}`}
                className="p-4 bg-white rounded-2xl border border-slate-200/80 hover:border-amber-500 hover:shadow-md transition-all text-left group"
              >
                <p className="text-xs font-bold text-blue-950 group-hover:text-amber-600 transition-colors">
                  {group.name}
                </p>
                <span className="text-[10px] text-gray-400 mt-1 inline-block">
                  Consulter les prix →
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Grouped Products Tables */}
        <div className="space-y-16">
          {CATEGORY_GROUPS.map((group) => {
            const groupProducts = products.filter((p) =>
              group.categories.includes(p.category)
            );

            if (groupProducts.length === 0) return null;

            return (
              <section
                key={group.slug}
                id={group.slug}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-100">
                  <div>
                    <h2 className="text-2xl font-black text-blue-950">
                      {group.name}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1 max-w-2xl">
                      {group.description}
                    </p>
                  </div>
                  <Link
                    href={`/prix/${group.slug}`}
                    className="text-xs font-bold text-amber-600 hover:underline inline-flex items-center gap-1 shrink-0"
                  >
                    Guide des prix {group.name} <ArrowRight size={14} />
                  </Link>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 text-xs font-bold text-gray-400 uppercase tracking-wider">
                        <th className="pb-3 pr-4">Produit</th>
                        <th className="pb-3 px-4">Spécifications</th>
                        <th className="pb-3 px-4">Stock</th>
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
            );
          })}
        </div>

        {/* Pricing Guide & FAQ */}
        <section className="mt-16 bg-white rounded-3xl p-8 border border-slate-200/80">
          <h2 className="text-2xl font-black text-blue-950 mb-6">
            Informations tarifaires et devis pour professionnels au Maroc
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-black text-blue-950 text-base mb-2">
                Tarification Hors Taxes (HT) et TVA
              </h3>
              <p>
                Conformément aux usages du secteur de la construction au Maroc, tous nos tarifs sont présentés Hors Taxes (HT). La TVA légale applicable de 20% est ajoutée lors de l'établissement du devis ou de la facture définitive.
              </p>
            </div>
            <div>
              <h3 className="font-black text-blue-950 text-base mb-2">
                Remises sur volume et chantiers d'envergure
              </h3>
              <p>
                Vous travaillez sur un projet de bureaux, centre commercial, hôtel ou programme résidentiel ? Contactez nos équipes commerciales pour obtenir une offre personnalisée avec conditions tarifaires préférentielles.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
