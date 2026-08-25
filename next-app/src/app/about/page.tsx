import React from 'react';
import Link from 'next/link';
import { buildMetadata } from '../../lib/metadata';
import { Building2, ShieldCheck, Truck, Clock, Award, Phone, CheckCircle, ArrowRight } from 'lucide-react';

export const metadata = buildMetadata({
  title: 'Qui Sommes-Nous | Chada Alyasmin — Second Œuvre Maroc',
  description:
    'Découvrez Chada Alyasmin, distributeur et fabricant de référence en matériaux de second œuvre au Maroc. Dépôt central à Casablanca, stock permanent, partenariats directs (Knauf, Rockwool, Sinca) et livraison sur tous les chantiers du Royaume.',
  canonicalPath: '/about',
});

export default function AboutPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'À Propos de Chada Alyasmin',
    description:
      'Présentation de Chada Alyasmin, société marocaine spécialisée dans le second œuvre et l’aménagement intérieur.',
    mainEntity: {
      '@type': 'Organization',
      '@id': 'https://chadaalyasmin.ma/#organization',
      name: 'Chada Alyasmin',
      url: 'https://chadaalyasmin.ma',
      foundingLocation: {
        '@type': 'Place',
        name: 'Casablanca, Maroc',
      },
      knowsAbout: [
        'Plaques de plâtre BA13',
        'Faux plafonds suspendus',
        'Trappes de visite aluplaster',
        'Isolation acoustique et thermique',
        'Laine de roche et laine de verre',
        'Ossatures métalliques et profilés',
      ],
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Boulevard Mohammed VI',
        addressLocality: 'Casablanca',
        addressCountry: 'MA',
      },
    },
  };

  return (
    <main className="min-h-screen bg-slate-50 font-sans pb-24 pt-20 lg:pt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-6">
              <Building2 size={14} /> Leader du Second Œuvre au Maroc
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-6">
              L’Excellence des Matériaux de Second Œuvre à Casablanca & partout au Maroc
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed">
              Depuis notre dépôt central de Casablanca, nous accompagnons les entreprises générales du bâtiment, les plaquistes professionnels et les architectes avec des solutions techniques certifiées, disponibles en stock permanent.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Company Pitch & Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6 text-slate-700 leading-relaxed text-base sm:text-lg">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Notre Mission : Sécuriser la Réalisation de vos Chantiers
            </h2>
            <p>
              <strong>Chada Alyasmin (شادي الياسمين)</strong> s’est imposée comme une référence incontournable de la distribution et de la fabrication spécialisée en matériaux de second œuvre au Maroc. Notre expertise couvre l’ensemble des systèmes de cloisons, de plafonds suspendus, d’isolation thermique et acoustique, et de trappes de visite techniques.
            </p>
            <p>
              Grâce à des relations directes avec les plus grands fabricants mondiaux et une unité de fabrication marocaine pour les trappes de visite sur mesure, nous garantissons des <strong>prix d’usine transparents</strong>, des <strong>fiches techniques conformes aux normes DTU</strong> et une <strong>disponibilité immédiate en stock</strong>.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
                <span className="block text-2xl sm:text-3xl font-extrabold text-amber-600">+60</span>
                <span className="text-xs text-slate-500 font-medium">Références Techniques</span>
              </div>
              <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
                <span className="block text-2xl sm:text-3xl font-extrabold text-amber-600">24h</span>
                <span className="text-xs text-slate-500 font-medium">Délai Réponse Devis</span>
              </div>
              <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs col-span-2 sm:col-span-1">
                <span className="block text-2xl sm:text-3xl font-extrabold text-amber-600">100%</span>
                <span className="text-xs text-slate-500 font-medium">Couverture Maroc</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
              Nos Engagements B2B
            </h3>
            <ul className="space-y-4">
              {[
                { title: 'Stock Permanent à Casablanca', desc: 'Disponibilité immédiate sur les plaques BA13, ossatures et trappes.' },
                { title: 'Tarifs Directs & Dégressifs', desc: 'Prix compétitifs en MAD HT adaptés aux volumes des professionnels.' },
                { title: 'Conformité DTU & RTCM', desc: 'Fiches techniques, PV coupe-feu et PV acoustiques sur demande.' },
                { title: 'Logistique & Livraison Nationale', desc: 'Expédition directe sur chantier à Casablanca, Rabat, Tanger, Marrakech, etc.' },
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-sm font-semibold text-slate-900">{item.title}</strong>
                    <span className="text-xs text-slate-600">{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Building2 size={24} />
            </div>
            <h3 className="font-bold text-slate-900">Dépôt Centralisé</h3>
            <p className="text-sm text-slate-600">
              Implantation stratégique à Casablanca permettant un enlèvement rapide ou une livraison express sur vos chantiers.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck size={24} />
            </div>
            <h3 className="font-bold text-slate-900">Qualité Certifiée</h3>
            <p className="text-sm text-slate-600">
              Matériaux conformes aux standards européens et marocains : marquage CE, certification NF et PV CSTB.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Truck size={24} />
            </div>
            <h3 className="font-bold text-slate-900">Livraison Tout Maroc</h3>
            <p className="text-sm text-slate-600">
              Flotte logistique dédiée pour approvisionner vos projets à Casablanca, Rabat, Fès, Tanger, Agadir, Oujda.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Clock size={24} />
            </div>
            <h3 className="font-bold text-slate-900">Devis Rapide 24h</h3>
            <p className="text-sm text-slate-600">
              Chiffrage précis et dégressif établi par notre bureau d’études techniques sous 24 heures ouvrées.
            </p>
          </div>
        </div>

        {/* Partners & Ecosystem */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 lg:p-12 space-y-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
              Marques & Partenaires Distribués
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              Nous sélectionnons rigoureusement des marques reconnues pour leur fiabilité technique, leur durabilité et leur performance thermo-acoustique.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {['KNAUF', 'ROCKWOOL', 'SINCA', 'ROCKFON', 'AMF KNAUF', 'SEMIN'].map((brand, idx) => (
              <div
                key={idx}
                className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-4 flex items-center justify-center text-center font-bold tracking-wider text-slate-200 text-sm hover:border-amber-500/50 transition-colors"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>

        {/* Contact & Quote CTA */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-3xl p-8 lg:p-12 text-slate-950 flex flex-col md:flex-row items-center justify-between gap-8 shadow-lg">
          <div className="space-y-2 max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-black">
              Un projet de construction ou d’aménagement ?
            </h2>
            <p className="text-slate-900 font-medium text-sm sm:text-base">
              Contactez notre équipe commerciale pour obtenir un chiffrage personnalisé ou visitez notre dépôt à Casablanca.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 shrink-0">
            <Link
              href="/devis"
              className="px-6 py-3.5 bg-slate-950 text-white hover:bg-slate-900 rounded-xl font-bold text-sm shadow-md transition-all inline-flex items-center gap-2"
            >
              Demander un Devis <ArrowRight size={16} />
            </Link>
            <a
              href="https://wa.me/212661138204"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-white text-slate-900 hover:bg-slate-100 rounded-xl font-bold text-sm shadow-md transition-all inline-flex items-center gap-2"
            >
              <Phone size={16} className="text-emerald-600" /> WhatsApp Direct
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
