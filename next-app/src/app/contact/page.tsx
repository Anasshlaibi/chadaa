import React from 'react';
import Link from 'next/link';
import { buildMetadata } from '../../lib/metadata';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export const metadata = buildMetadata({
  title: 'Contact & Dépôt Casablanca | Chada Alyasmin Maroc',
  description:
    'Contactez Chada Alyasmin à Casablanca. Dépôt de matériaux de second œuvre sur le Boulevard Mohammed VI. Téléphone commercial, WhatsApp, devis immédiat et enlèvement sur place.',
  canonicalPath: '/contact',
});

export default function ContactPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Chada Alyasmin Casablanca',
    mainEntity: {
      '@type': 'LocalBusiness',
      '@id': 'https://chadaalyasmin.ma/#organization',
      name: 'Chada Alyasmin',
      telephone: '+212661138204',
      email: 'contact@chadaalyasmin.ma',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Boulevard Mohammed VI',
        addressLocality: 'Casablanca',
        addressRegion: 'Grand Casablanca',
        postalCode: '20000',
        addressCountry: 'MA',
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '08:30',
          closes: '18:30',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Saturday'],
          opens: '08:30',
          closes: '13:30',
        },
      ],
    },
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
              <MapPin size={14} /> Dépôt & Service Commercial Casablanca
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
              Contactez Notre Équipe Technique & Commerciale
            </h1>
            <p className="text-slate-300 text-base sm:text-lg">
              Une question technique, une demande de prix de gros ou un enlèvement de commande à Casablanca ? Nous vous répondons rapidement.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Details Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
                Coordonnées Directes
              </h2>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <strong className="block text-sm font-semibold text-slate-900">Dépôt Principal</strong>
                    <p className="text-xs sm:text-sm text-slate-600">
                      Boulevard Mohammed VI, Casablanca, Maroc
                    </p>
                    <span className="text-[11px] text-amber-700 font-medium block mt-0.5">
                      Enlèvement direct & départ transporteurs
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone size={20} />
                  </div>
                  <div>
                    <strong className="block text-sm font-semibold text-slate-900">Téléphone & WhatsApp</strong>
                    <a
                      href="tel:+212661138204"
                      className="text-xs sm:text-sm text-slate-700 hover:text-amber-600 font-medium block"
                    >
                      +212 661-138204 / +212 661-150961
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail size={20} />
                  </div>
                  <div>
                    <strong className="block text-sm font-semibold text-slate-900">Email Commercial</strong>
                    <a
                      href="mailto:contact@chadaalyasmin.ma"
                      className="text-xs sm:text-sm text-slate-700 hover:text-amber-600 font-medium block"
                    >
                      contact@chadaalyasmin.ma
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock size={20} />
                  </div>
                  <div>
                    <strong className="block text-sm font-semibold text-slate-900">Horaires d'Ouverture</strong>
                    <p className="text-xs sm:text-sm text-slate-600">
                      Lun – Ven : 08:30 – 18:30<br />
                      Samedi : 08:30 – 13:30
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Action */}
            <div className="bg-emerald-600 text-white p-6 rounded-3xl shadow-sm flex items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-base">Besoin d’une réponse express ?</h3>
                <p className="text-xs text-emerald-100 mt-0.5">
                  Échangez directement avec un responsable de stock sur WhatsApp.
                </p>
              </div>
              <a
                href="https://wa.me/212661138204"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-white text-emerald-800 hover:bg-emerald-50 rounded-xl font-bold text-xs shadow transition-all shrink-0 inline-flex items-center gap-1.5"
              >
                <MessageSquare size={14} /> Discuter
              </a>
            </div>
          </div>

          {/* Contact / Quote Form Banner */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">
              Demande de Renseignement ou Chiffrage Proforma
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Pour un devis chiffré complet avec vos quantités de plaques BA13, profilés métalliques, isolants ou trappes sur mesure, utilisez notre module de devis rapide :
            </p>

            <div className="space-y-4 pt-2">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-3">
                <CheckCircle2 size={20} className="text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-sm font-semibold text-slate-900">Calcul Dégressif</strong>
                  <span className="text-xs text-slate-500">Tarifs adaptés aux volumes de chantiers et commandes groupées.</span>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-3">
                <CheckCircle2 size={20} className="text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-sm font-semibold text-slate-900">Fiches & Certifications Incluses</strong>
                  <span className="text-xs text-slate-500">Transmission des PV d'essais et fiches de données de sécurité.</span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/devis"
                className="w-full sm:w-auto px-8 py-4 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-2xl text-center shadow-md transition-all inline-flex items-center justify-center gap-2"
              >
                <Send size={18} /> Accéder au Formulaire de Devis Express
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
