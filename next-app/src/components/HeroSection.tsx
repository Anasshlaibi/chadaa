"use client";

import { motion } from "framer-motion";
import { ChevronRight, ArrowRight, ShieldCheck, Zap, Globe, Package } from "lucide-react";

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
      cta: "Demander Devis WhatsApp"
    },
    en: {
      tag: "Global Drying Solutions",
      title: "The Standard of Modern Building.",
      desc: "Premium Access Panels, Drywall Systems, and Acoustic Insulation for International Construction Projects.",
      cta: "View Catalog"
    }
  }[lang];

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500">{content.tag}</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-[0.85] mb-8"
          >
            {content.title.split(' ').map((word, i) => (
              <span key={i} className={word === 'Excellence.' || word === 'Modern' || word === 'Imbattables.' ? 'grad-text' : ''}>
                {word}{' '}
              </span>
            ))}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-400 font-medium leading-relaxed max-w-2xl mb-12 border-l-2 border-amber-500/30 pl-8"
          >
            {content.desc}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <button className="px-12 py-6 bg-amber-500 text-slate-950 font-black text-lg rounded-2xl flex items-center justify-center gap-3 hover:bg-amber-400 transition-all shadow-[0_20px_50px_rgba(245,158,11,0.2)]">
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
