"use client";

import ModernHero from '@/components/ModernHero';
import Partners from '@/components/Partners';
import TrappeShowcase from '@/components/TrappeShowcase';
import Catalog from '@/components/Catalog';
import { ArrowRight, Layers, Maximize, Thermometer, ShieldCheck, Zap, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { fetchProducts } from '@/services/googleSheets';
import { type Product } from '@/data/products';
import Schema from '@/components/Schema';

export default function GlobalLandingPage({ lang }: { lang: 'fr' | 'ma' | 'en' }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const scrollToCatalog = () => {
    const catalogElement = document.getElementById('catalog');
    if (catalogElement) catalogElement.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    async function loadCatalog() {
      try {
        setIsLoading(true);
        const data = await fetchProducts();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError(lang === 'en' ? "Error loading catalog." : "Erreur lors du chargement du catalogue.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadCatalog();
  }, [lang]);

  const content = {
    fr: {
      solutions: "Nos Solutions",
      expertise: "Expertise technique, Qualité sans compromis.",
      viewAll: "Voir tout le catalogue",
      categories: [
        { name: 'Faux Plafonds', desc: 'Modulaires, plaques de plâtre & joints creux.', icon: Layers },
        { name: 'Planchers Techniques', desc: 'Dalles & structures haute performance.', icon: Maximize },
        { name: 'Isolation Optimale', desc: 'Laine de roche & laine de verre minérale.', icon: Thermometer },
        { name: 'Second Œuvre', desc: 'Cloisons, montants & rails de précision.', icon: ShieldCheck },
      ],
      whyUs: "Pourquoi nous choisir ?",
      moreThan: "Plus qu'un fournisseur,",
      partner: "Votre partenaire stratégique.",
      advantages: [
        { title: 'Prix Compétitifs', desc: 'Les prix les plus raisonnables du marché sans compromis sur la qualité.', icon: Zap },
        { title: 'Assistance Technique', desc: 'Un support expert dédié pour tous vos besoins de mise en œuvre.', icon: Users },
        { title: 'Adaptation Totale', desc: 'Solutions personnalisées pour vos trappes de visite et joints creux.', icon: Maximize }
      ],
      historyTitle: "Notre Histoire, Votre Réussite",
      historyText: "CHADA ALYASMIN est une société marocaine, créée en 2017 avec pour principal objectif d’être leader sur le marché du second œuvre au Maroc. Depuis notre création à Casablanca, nous n’avons cessé d’évoluer pour offrir des solutions efficaces et innovantes à nos partenaires professionnels. Notre expertise dans la fabrication et la distribution de trappes de visite et profilés aluminium nous place comme le partenaire de confiance privilégié pour vos projets de construction de grande envergure.",
      yearLabel: "Expertise & Innovation",
      yearQuote: "\"Leader du Second Œuvre au Maroc\"",
      ctaTitle: "Prêt à moderniser vos chantiers ?",
      ctaDesc: "Parcourez notre catalogue ou discutez directement avec un expert.",
      ctaButton1: "Demander un Devis",
      ctaButton2: "Discuter avec un Expert"
    },
    ma: {
      solutions: "Nos Solutions B2B",
      expertise: "Grossiste de confiance, Prix Imbattables.",
      viewAll: "Voir tout le stock",
      categories: [
        { name: 'Plaques BA13', desc: 'Sinca, Knauf, Lafarge. Stock permanent.', icon: Layers },
        { name: 'Joints Creux', desc: 'Aluminium de haute qualité, tous modèles.', icon: Maximize },
        { name: 'Trappes de Visite', desc: 'Fabrication locale, prix direct usine.', icon: ShieldCheck },
        { name: 'Isolation', desc: 'Laine de roche & laine de verre au meilleur prix.', icon: Thermometer },
      ],
      whyUs: "Nos Avantages",
      moreThan: "Directement de l'usine,",
      partner: "À votre chantier.",
      advantages: [
        { title: 'Prix Grossiste', desc: 'Des tarifs B2B imbattables sur le BA13 et accessoires.', icon: Zap },
        { title: 'Stock Disponible', desc: 'Grande capacité de stockage à Casablanca.', icon: Users },
        { title: 'Livraison Rapide', desc: 'Logistique optimisée pour tout le Maroc.', icon: Maximize }
      ],
      historyTitle: "Votre Fournisseur de Confiance",
      historyText: "CHADA ALYASMIN vous accompagne dans tous vos projets BTP au Maroc en vous fournissant les meilleurs matériaux au meilleur prix. Spécialiste du gros volume, nous garantissons un approvisionnement continu pour que vos chantiers ne s'arrêtent jamais.",
      yearLabel: "Fournisseur B2B",
      yearQuote: "\"Le choix des pros au Maroc\"",
      ctaTitle: "Demandez votre devis gratuit",
      ctaDesc: "Contactez-nous pour connaître nos tarifs grossistes actuels.",
      ctaButton1: "Demander un Devis",
      ctaButton2: "Contact WhatsApp"
    },
    en: {
      solutions: "Our Solutions",
      expertise: "Technical expertise, Uncompromising quality.",
      viewAll: "View full catalog",
      categories: [
        { name: 'Suspended Ceilings', desc: 'Modular, plasterboards & shadow gaps.', icon: Layers },
        { name: 'Raised Floors', desc: 'High-performance tiles & structures.', icon: Maximize },
        { name: 'Optimal Insulation', desc: 'Mineral rock wool & glass wool.', icon: Thermometer },
        { name: 'Finishing Works', desc: 'Partitions, studs & precision tracks.', icon: ShieldCheck },
      ],
      whyUs: "Why choose us?",
      moreThan: "More than a supplier,",
      partner: "Your strategic partner.",
      advantages: [
        { title: 'Competitive Prices', desc: 'The most reasonable prices on the market without compromising quality.', icon: Zap },
        { title: 'Technical Support', desc: 'Dedicated expert support for all your implementation needs.', icon: Users },
        { title: 'Total Customization', desc: 'Custom solutions for your access panels and shadow gaps.', icon: Maximize }
      ],
      historyTitle: "Our Story, Your Success",
      historyText: "CHADA ALYASMIN is a Moroccan company, created in 2017 with the main objective of being a leader in the finishing works market in Morocco. Since our creation in Casablanca, we have constantly evolved to offer efficient and innovative solutions to our professional partners. Our expertise in the manufacturing and distribution of access panels and aluminum profiles places us as the preferred trusted partner for your large-scale construction projects.",
      yearLabel: "Expertise & Innovation",
      yearQuote: "\"Finishing Works Leader in Morocco\"",
      ctaTitle: "Ready to modernize your sites?",
      ctaDesc: "Browse our catalog or chat directly with an expert.",
      ctaButton1: "Request a Quote",
      ctaButton2: "Chat with an Expert"
    }
  }[lang];

  return (
    <main className="min-h-screen">
      <Schema lang={lang} />
      <ModernHero lang={lang} />
      <Partners lang={lang} />
      <TrappeShowcase lang={lang} />
      <Catalog products={products} isLoading={isLoading} lang={lang} />

      {/* Product Categories Overview */}
      <section id="expertise" className="pt-40 pb-24 bg-white">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div className="max-w-xl">
              <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-amber-600 mb-4">{content.solutions}</h2>
              <p className="text-4xl font-black text-blue-950 tracking-tight">{content.expertise}</p>
            </div>
            <button 
              onClick={scrollToCatalog}
              className="hidden md:flex items-center text-blue-950 font-bold hover:underline mt-4 md:mt-0 min-h-[44px]"
            >
              {content.viewAll} <ArrowRight size={18} className="ml-2" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.categories.map((cat, i) => (
              <div 
                key={i} 
                className="group p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-2xl transition-all duration-300 cursor-pointer"
                onClick={scrollToCatalog}
              >
                <div className="w-12 h-12 rounded-xl bg-blue-950/5 text-blue-950 flex items-center justify-center mb-6 group-hover:bg-blue-950 group-hover:text-white transition-all">
                  <cat.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-blue-950 mb-2">{cat.name}</h3>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Competitive Advantages */}
      <section id="projets" className="pt-40 pb-32 bg-blue-950 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-400 opacity-5 -skew-x-12 translate-x-1/2"></div>
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-amber-500 mb-6">{content.whyUs}</h2>
              <p className="text-4xl md:text-5xl font-black text-white tracking-tight mb-8">{content.moreThan} <br /><span className="text-blue-400">{content.partner}</span></p>
              
              <div className="space-y-8">
                {content.advantages.map((item, i) => (
                  <div key={i} className="flex items-start">
                    <div className="p-3 bg-white/10 rounded-xl text-amber-500 mr-6">
                      <item.icon size={24} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                      <p className="text-gray-400 font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3326.6575727025816!2d-7.643806!3d33.484218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda62d5119932155%3A0xc39f880362c3f815!2sTrappe%20de%20visite!5e0!3m2!1sfr!2sma!4v1715850000000"
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Story - Dedicated Section */}
      <section id="about" className="pt-40 pb-32 bg-slate-50 overflow-hidden">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text Content - Fully Visible */}
            <div className="order-2 lg:order-1 max-w-2xl h-auto min-h-fit">
              <h3 className="text-3xl md:text-4xl font-black text-blue-950 mb-8 tracking-tight">{content.historyTitle}</h3>
              <div className="space-y-6 text-gray-600 font-medium leading-relaxed">
                <p className="text-xl">
                  {content.historyText}
                </p>
              </div>
            </div>
            
            {/* 2017 Badge - Positioned to not obscure text on mobile */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end mb-12 lg:mb-0">
              <div className="relative w-full max-w-[320px] aspect-square bg-blue-950 rounded-[3rem] md:rounded-[4rem] flex items-center justify-center p-8 md:p-12 shadow-2xl overflow-hidden group">
                <div className="absolute inset-0 bg-linear-to-br from-amber-500/20 to-transparent"></div>
                <div className="text-center relative z-10">
                  <div className="text-6xl md:text-8xl font-black text-white mb-2">2017</div>
                  <div className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-amber-500">{content.yearLabel}</div>
                  <div className="mt-8 md:mt-12 space-y-4">
                    <div className="h-1 w-32 md:h-1.5 md:w-48 bg-white/20 rounded-full mx-auto overflow-hidden">
                      <div className="h-full w-full bg-amber-500 animate-pulse"></div>
                    </div>
                    <p className="text-xs md:text-sm text-white font-medium italic opacity-80">{content.yearQuote}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="contact" className="pt-40 pb-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black text-blue-950 mb-4 tracking-tight">{content.ctaTitle}</h2>
          <p className="text-gray-400 font-medium mb-10 text-lg">{content.ctaDesc}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={scrollToCatalog}
              className="w-full sm:w-auto px-12 py-6 bg-amber-500 text-blue-950 rounded-2xl font-black text-xl shadow-xl hover:bg-amber-400 hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-3"
            >
              <span>{content.ctaButton1}</span>
              <ArrowRight size={22} />
            </button>
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('open-chat'))}
              className="w-full sm:w-auto px-12 py-6 bg-blue-950 text-white rounded-2xl font-black text-xl shadow-xl hover:bg-blue-900 hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center space-x-4"
            >
              <span>{content.ctaButton2}</span>
            </button>
          </div>
        </div>
      </section>

      {error && (
        <div className="fixed bottom-4 left-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50">
          {error}
        </div>
      )}
    </main>
  );
}
