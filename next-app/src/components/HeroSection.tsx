"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export function HeroSection({ lang }: { lang: 'fr' | 'ma' | 'en' }) {
  const content = {
    fr: {
      tag: "Expertise NF & RT2020",
      title: "L'Art de Bâtir l'Excellence.",
      desc: "Leader du Second Œuvre : Faux plafonds certifiés, Trappes de visite haute performance et solutions d'isolation acoustique.",
      cta: "Explorer les Produits"
    },
    ma: {
      tag: "Partenaire B2B Maroc",
      title: "Qualité & Prix m2 Imbattables.",
      desc: "Directement de l'usine à Casablanca. BA13, Joints Creux Alu et Trappes de visite pour vos projets BTP au Maroc.",
      cta: "Demander un Devis"
    },
    en: {
      tag: "Global Drying Solutions",
      title: "The Standard of Modern Building.",
      desc: "Premium Access Panels, Drywall Systems, and Acoustic Insulation for International Construction Projects.",
      cta: "View Catalog"
    }
  }[lang];

  const scrollToProducts = () => {
    // Try the catalog section first (fr/en pages), then products section (ma page)
    const target = document.getElementById('catalog') || document.getElementById('products');
    if (target) {
      const isMobile = window.innerWidth < 1024;
      target.scrollIntoView({ behavior: isMobile ? 'instant' : 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[calc(100vh-64px)] flex items-center overflow-hidden">
      {/* Hero Background Image — LCP element, preloaded with priority */}
      <Image
        src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80"
        alt="Construction site background"
        fill
        priority={true}
        sizes="100vw"
        style={{ objectFit: "cover" }}
        className="opacity-20 -z-20"
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500">{content.tag}</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-[0.85] mb-6 lg:mb-8"
          >
            {content.title.split(' ').map((word, i) => (
              <span key={i} className={word === 'Excellence.' || word === 'Modern' || word === 'Imbattables.' ? 'grad-text' : ''}>
                {word}{' '}
              </span>
            ))}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-base sm:text-xl md:text-2xl text-slate-400 font-medium leading-relaxed max-w-2xl mb-8 lg:mb-12 border-l-2 border-amber-500/30 pl-6 lg:pl-8"
          >
            {content.desc}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="flex flex-col sm:flex-row gap-4 lg:gap-6"
          >
            <button
              onClick={scrollToProducts}
              className="px-8 sm:px-12 py-5 sm:py-6 bg-amber-500 text-slate-950 font-black text-base sm:text-lg rounded-2xl flex items-center justify-center gap-3 hover:bg-amber-400 hover:-translate-y-0.5 active:scale-95 transition-all duration-200 shadow-[0_20px_50px_rgba(245,158,11,0.35)] hover:shadow-[0_24px_60px_rgba(245,158,11,0.5)] ring-2 ring-amber-500/30"
            >
              {content.cta}
              <ChevronRight size={20} />
            </button>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative Blur */}
      <div className="absolute top-1/2 -right-1/4 w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-[120px] -z-10" />
    </section>
  );
}
