import React from 'react';
import Link from 'next/link';
import { buildMetadata } from '../../lib/metadata';
import { HelpCircle, ChevronRight, Phone, FileText, ArrowRight } from 'lucide-react';

export const metadata = buildMetadata({
  title: 'Foire Aux Questions (FAQ) | Chada Alyasmin Maroc',
  description:
    'Consultez les réponses aux questions fréquentes sur les matériaux de second œuvre au Maroc : prix des plaques BA13, dimensions des trappes de visite, isolation laine de roche, délais de livraison et modalités de devis.',
  canonicalPath: '/faq',
});

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQS: FAQItem[] = [
  {
    category: 'Prix & Devis',
    question: 'Comment obtenir un devis pour mon chantier de second œuvre ?',
    answer:
      'Vous pouvez demander un devis en ligne via notre page /devis, ajouter vos produits à la sélection de devis, ou contacter directement notre service commercial par WhatsApp au +212 661-138204. Nos devis détaillés et dégressifs sont transmis sous 24 heures ouvrées.',
  },
  {
    category: 'Prix & Devis',
    question: 'Les prix affichés sur le site sont-ils TTC ou HT ?',
    answer:
      'Tous les tarifs indiqués sur notre site internet sont exprimés en Dirhams marocains Hors Taxes (MAD HT). La TVA légale en vigueur de 20% s’applique sur les factures finales.',
  },
  {
    category: 'Plaques de Plâtre & Cloisons',
    question: 'Quelle est la différence entre une plaque BA13 standard, hydrofuge et coupe-feu ?',
    answer:
      'La plaque BA13 Standard (blanche/grise) convient aux cloisons et plafonds en milieu sec. La plaque BA13 Hydrofuge (verte) résiste à l’humidité pour les salles de bains et cuisines. La plaque BA13 Coupe-Feu (rose) intègre des fibres minérales pour retarder la propagation des flammes.',
  },
  {
    category: 'Trappes de Visite',
    question: 'Fabriquez-vous des trappes de visite sur mesure à Casablanca ?',
    answer:
      'Oui, en complément de nos dimensions standards (20x20, 30x30, 40x40, 50x50, 60x60 cm), nous confectionnons des trappes de visite sur mesure en aluminium brut avec plaque BA13 standard ou hydrofuge, avec un délai de fabrication de 48 à 72 heures.',
  },
  {
    category: 'Isolation Acoustique & Thermique',
    question: 'Quelle isolation choisir entre laine de roche et laine de verre ?',
    answer:
      'La laine de verre est idéale pour l’isolation thermo-acoustique des faux plafonds et cloisons légères avec un excellent rapport coût/performance. La laine de roche offre une densité supérieure, une meilleure isolation phonique et une résistance au feu accrue (incombustible Euroclasse A1).',
  },
  {
    category: 'Livraison & Logistique',
    question: 'Quelles sont les zones et délais de livraison au Maroc ?',
    answer:
      'Nous livrons l’ensemble du territoire marocain. Les livraisons sur le Grand Casablanca sont assurées sous 24 heures. Pour les autres villes (Rabat, Tanger, Fès, Marrakech, Agadir), les expéditions s’effectuent sous 24 à 48 heures selon les volumes.',
  },
];

export default function FAQPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };

  return (
    <main className="min-h-screen bg-slate-50 font-sans pb-24 pt-20 lg:pt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <section className="bg-slate-900 text-white py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-4">
              <HelpCircle size={14} /> Centre d'Aide & Réponses Techniques
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
              Questions Fréquentes sur le Second Œuvre au Maroc
            </h1>
            <p className="text-slate-300 text-base sm:text-lg">
              Retrouvez toutes les réponses aux questions techniques, logistiques et tarifaires posées par les professionnels du bâtiment et les artisans plaquistes.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Accordion / Cards */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-6">
        {FAQS.map((faq, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xs hover:border-amber-400/50 transition-all space-y-3"
          >
            <div className="flex items-center gap-2 text-xs font-bold text-amber-600 uppercase tracking-wider">
              <span>{faq.category}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
              {faq.question}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed pt-1">
              {faq.answer}
            </p>
          </div>
        ))}

        {/* Still have questions banner */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md mt-12">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-bold">Vous avez une question spécifique ?</h3>
            <p className="text-slate-300 text-sm">
              Notre équipe d’ingénieurs et technico-commerciaux est disponible pour vous conseiller.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              href="/contact"
              className="px-5 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl font-bold text-sm transition-colors inline-flex items-center gap-2"
            >
              Contactez-Nous <ArrowRight size={16} />
            </Link>
            <a
              href="https://wa.me/212661138204"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-sm transition-colors inline-flex items-center gap-2"
            >
              <Phone size={16} className="text-emerald-400" /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
