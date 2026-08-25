import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { GUIDES, type GuideArticle } from '@/data/guides';
import { getAllProducts, formatPriceDisplay } from '@/lib/products';
import {
  BookOpen,
  Clock,
  ArrowRight,
  ShieldCheck,
  Tag,
  ChevronRight,
  CheckCircle2,
  HelpCircle,
  ShoppingBag,
  MessageSquare
} from 'lucide-react';

export async function generateStaticParams() {
  return GUIDES.map((guide) => ({
    slug: guide.slug,
  }));
}

export const dynamicParams = true;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = GUIDES.find((g) => g.slug === slug);

  if (!guide) {
    return {
      title: 'Guide non trouvé | Chada Alyasmin Maroc',
      robots: { index: false, follow: false },
    };
  }

  const canonicalUrl = `https://chadaalyasmin.ma/guide/${guide.slug}`;

  return {
    metadataBase: new URL('https://chadaalyasmin.ma'),
    title: `${guide.title} | Chada Alyasmin Maroc`,
    description: guide.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${guide.title} | Chada Alyasmin Maroc`,
      description: guide.description,
      url: canonicalUrl,
      type: 'article',
      publishedTime: guide.publishedAt,
      images: [
        {
          url: `https://chadaalyasmin.ma${guide.image}`,
          width: 1200,
          height: 630,
          alt: guide.title,
        },
      ],
    },
  };
}

export default async function GuideDetailPage({ params }: Props) {
  const { slug } = await params;
  const guide = GUIDES.find((g) => g.slug === slug);

  if (!guide) {
    notFound();
  }

  const allProducts = await getAllProducts();
  const relatedProducts = allProducts.filter((p) =>
    guide.relatedProductIds.includes(p.id) || guide.relatedProductIds.includes(p.slug)
  );

  const otherGuides = GUIDES.filter((g) => g.slug !== guide.slug).slice(0, 3);
  const canonicalUrl = `https://chadaalyasmin.ma/guide/${guide.slug}`;

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    headline: guide.title,
    description: guide.description,
    image: `https://chadaalyasmin.ma${guide.image}`,
    datePublished: guide.publishedAt,
    dateModified: guide.publishedAt,
    author: {
      '@type': 'Organization',
      name: 'Chada Alyasmin',
      url: 'https://chadaalyasmin.ma',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Chada Alyasmin',
      logo: {
        '@type': 'ImageObject',
        url: 'https://chadaalyasmin.ma/logo.png',
      },
    },
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: guide.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
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
        name: 'Guides Techniques',
        item: 'https://chadaalyasmin.ma/guide',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: guide.shortTitle,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-slate-50 font-sans pb-24 pt-20 lg:pt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd).replace(/</g, '\\u003c') }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd).replace(/</g, '\\u003c') }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd).replace(/</g, '\\u003c') }}
      />

      {/* Header */}
      <div className="bg-blue-950 text-white pt-10 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <nav aria-label="Fil d'Ariane" className="flex items-center space-x-2 text-xs text-blue-200 mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Accueil
            </Link>
            <ChevronRight size={14} />
            <Link href="/guide" className="hover:text-white transition-colors">
              Guides
            </Link>
            <ChevronRight size={14} />
            <span className="text-amber-400 font-bold truncate">{guide.shortTitle}</span>
          </nav>

          <div className="flex items-center space-x-3 text-xs text-amber-400 font-bold mb-4">
            <span className="px-3 py-1 bg-amber-500/20 rounded-full uppercase tracking-wider">
              {guide.category}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-blue-200">
              <Clock size={13} /> {guide.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-6 leading-tight">
            {guide.title}
          </h1>

          <p className="text-blue-200 text-base sm:text-lg leading-relaxed">
            {guide.description}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 pt-10">
        {/* Key Takeaways Box */}
        <div className="bg-amber-500/10 border-2 border-amber-500/30 rounded-3xl p-6 sm:p-8 mb-12">
          <h2 className="text-xs font-black uppercase tracking-widest text-amber-800 mb-4 flex items-center gap-2">
            <ShieldCheck size={18} className="text-amber-600" />
            Points clés à retenir
          </h2>
          <ul className="space-y-2.5 text-sm text-slate-900 font-medium">
            {guide.keyTakeaways.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-amber-600 shrink-0 mt-0.5" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Content Body */}
        <article className="space-y-10 text-slate-800 leading-relaxed text-base sm:text-lg mb-16">
          {guide.content.map((sec, idx) => (
            <section key={idx} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-black text-blue-950 mb-4 tracking-tight">
                {sec.sectionTitle}
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-gray-700">
                {sec.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </article>

        {/* FAQs */}
        {guide.faqs.length > 0 && (
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm mb-16">
            <h2 className="text-xl sm:text-2xl font-black text-blue-950 mb-6 flex items-center gap-2">
              <HelpCircle size={22} className="text-amber-600" />
              Questions fréquentes
            </h2>
            <div className="space-y-6">
              {guide.faqs.map((faq, idx) => (
                <div key={idx} className="border-b border-gray-100 pb-5 last:border-b-0 last:pb-0">
                  <h3 className="text-base font-bold text-blue-950 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Relevant Products Showcase */}
        {relatedProducts.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-amber-600 mb-1">
                  Matériaux recommandés
                </h2>
                <p className="text-2xl font-black text-blue-950">
                  Produits associés à ce guide
                </p>
              </div>
              <Link
                href={`/prix/${guide.relatedPricingSlug}`}
                className="text-xs font-bold text-amber-600 hover:underline flex items-center gap-1"
              >
                Voir les prix <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedProducts.map((p) => {
                const price = formatPriceDisplay(p.pricing);
                return (
                  <div
                    key={p.id}
                    className="bg-white p-5 rounded-2xl border border-slate-200/80 hover:shadow-md transition-all flex items-center gap-4"
                  >
                    <div className="relative w-16 h-16 rounded-xl bg-slate-50 border p-1 shrink-0 overflow-hidden">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        className="object-contain mix-blend-multiply p-1"
                        sizes="64px"
                      />
                    </div>
                    <div className="grow min-w-0">
                      <Link
                        href={`/products/${p.slug}`}
                        className="font-bold text-sm text-blue-950 hover:text-amber-600 transition-colors truncate block"
                      >
                        {p.name}
                      </Link>
                      <p className="text-xs font-black text-amber-600 mt-0.5">
                        {price.display}
                      </p>
                      <Link
                        href={`/products/${p.slug}`}
                        className="text-[10px] font-bold text-gray-400 uppercase hover:text-blue-950 mt-1 inline-block"
                      >
                        Consulter la fiche →
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* CTA Banner */}
        <div className="bg-blue-950 text-white rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="text-xl font-black mb-1">Besoin d'un accompagnement technique ?</h3>
            <p className="text-blue-200 text-xs">
              Nos ingénieurs et technico-commerciaux vous assistent dans le dimensionnement de vos projets au Maroc.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link
              href="/devis"
              className="px-5 py-3 bg-amber-500 hover:bg-amber-400 text-blue-950 font-bold rounded-xl text-xs uppercase tracking-wider transition-all"
            >
              Demander un devis
            </Link>
            <a
              href="https://wa.me/212661138204"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all flex items-center gap-1.5"
            >
              <MessageSquare size={16} />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
