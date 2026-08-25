import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { GUIDES } from '@/data/guides';
import { BookOpen, Clock, ArrowRight, ShieldCheck, Tag, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  metadataBase: new URL('https://chadaalyasmin.ma'),
  title: 'Guides Techniques du Second Œuvre au Maroc | Chada Alyasmin',
  description: 'Guides professionnels et fiches pratiques : Trappes de visite, plaques de plâtre BA13, faux plafonds, ossatures métalliques, joints creux et isolation au Maroc. Conseils de pose et normes.',
  alternates: {
    canonical: 'https://chadaalyasmin.ma/guide',
  },
  openGraph: {
    title: 'Guides Techniques du Second Œuvre au Maroc | Chada Alyasmin',
    description: 'Expertise technique, comparatifs et méthodologies de pose pour les professionnels du bâtiment et de la finition au Maroc.',
    url: 'https://chadaalyasmin.ma/guide',
    type: 'website',
  },
};

export default function GuidesHubPage() {
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
        name: 'Guides Techniques',
        item: 'https://chadaalyasmin.ma/guide',
      },
    ],
  };

  return (
    <main className="min-h-screen bg-slate-50 font-sans pb-24 pt-20 lg:pt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd).replace(/</g, '\\u003c') }}
      />

      {/* Header */}
      <div className="bg-blue-950 text-white pt-12 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <nav aria-label="Fil d'Ariane" className="flex items-center space-x-2 text-xs text-blue-200 mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Accueil
            </Link>
            <ChevronRight size={14} />
            <span className="text-amber-400 font-bold">Guides Techniques</span>
          </nav>

          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-amber-500/20 border border-amber-500/30 rounded-full text-amber-400 text-xs font-black uppercase tracking-wider mb-4">
            <BookOpen size={14} />
            <span>Centre de Ressources & Expertise BTP</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4">
            Guides techniques du second œuvre au Maroc
          </h1>

          <p className="text-blue-200 text-base sm:text-lg max-w-3xl leading-relaxed">
            Conseils de mise en œuvre, normes de conformité, comparatifs de matériaux et astuces de professionnels pour réussir vos chantiers de faux plafonds, cloisons, isolation et aménagements intérieurs.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-12">
        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {GUIDES.map((guide) => (
            <article
              key={guide.slug}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 hover:border-amber-500/50 hover:shadow-xl transition-all flex flex-col group"
            >
              <div className="relative aspect-video w-full rounded-2xl bg-slate-50 mb-5 overflow-hidden">
                <Image
                  src={guide.image}
                  alt={guide.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <span className="absolute top-3 left-3 px-3 py-1 bg-blue-950/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest rounded-lg">
                  {guide.category}
                </span>
              </div>

              <div className="flex items-center space-x-2 text-xs text-gray-400 mb-2">
                <Clock size={14} />
                <span>{guide.readTime}</span>
              </div>

              <h2 className="text-lg font-black text-blue-950 leading-snug mb-3 group-hover:text-amber-600 transition-colors line-clamp-2">
                <Link href={`/guide/${guide.slug}`}>
                  {guide.title}
                </Link>
              </h2>

              <p className="text-xs text-gray-500 leading-relaxed line-clamp-3 mb-6">
                {guide.description}
              </p>

              <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                <Link
                  href={`/prix/${guide.relatedPricingSlug}`}
                  className="text-xs font-bold text-gray-500 hover:text-amber-600 inline-flex items-center gap-1"
                >
                  <Tag size={13} />
                  <span>Voir les prix</span>
                </Link>

                <Link
                  href={`/guide/${guide.slug}`}
                  className="px-4 py-2 bg-blue-950 text-white group-hover:bg-amber-500 group-hover:text-blue-950 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5"
                >
                  <span>Lire</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
