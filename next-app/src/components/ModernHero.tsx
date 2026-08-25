"use client";

import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';

export default function ModernHero({ lang = 'fr' }: { lang?: 'fr' | 'ma' | 'en' }) {
  const scrollToCatalog = () => {
    window.location.hash = '#catalog?filter=Tous';
    const catalogElement = document.getElementById('catalog');
    if (catalogElement) catalogElement.scrollIntoView({ behavior: isMobile ? 'instant' : 'smooth' });
  };

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;

  const content = {
    fr: {
      tag: "Matériaux de Second Œuvre & Finition au Maroc",
      titleTop: "Matériaux de",
      titleBottom: "Second Œuvre.",
      descPre: "Fabricant et distributeur spécialisé en",
      descHighlight: "Faux Plafonds, Trappes & Isolation",
      descPost: "pour les professionnels du bâtiment à Casablanca et partout au Maroc.",
      cta: "Voir nos Produits & Prix",
      projects: "Stock Casablanca"
    },
    ma: {
      tag: "مواد البناء والتشطيب الداخلي بالمغرب",
      titleTop: "مواد البناء و",
      titleBottom: "التشطيب بالدار البيضاء.",
      descPre: "المزود الرائد لـ",
      descHighlight: "فتحات الزيارة، ألواح الجبس والعزل",
      descPost: "بأفضل أسعار الجملة للشركات والمهنيين بالمغرب.",
      cta: "مشاهدة المنتجات والأسعار",
      projects: "مخزون الدار البيضاء"
    },
    en: {
      tag: "Construction Finishing Materials in Morocco",
      titleTop: "Finishing Works &",
      titleBottom: "Building Solutions.",
      descPre: "Leading manufacturer and distributor of",
      descHighlight: "Ceilings, Access Panels & Insulation",
      descPost: "for construction professionals in Casablanca and across Morocco.",
      cta: "View Products & Prices",
      projects: "Casablanca Stock"
    }
  }[lang];

  const textVariants: Variants = {
    hidden: { x: isMobile ? 0 : 100, y: isMobile ? 10 : 0, opacity: 0 },
    visible: { 
      x: 0, 
      y: 0, 
      opacity: 1,
      transition: { duration: isMobile ? 0.3 : 0.8, ease: "easeOut" }
    }
  };

  const image1Variants: Variants = {
    hidden: { x: isMobile ? 0 : 150, y: isMobile ? 30 : 0, opacity: 0 },
    visible: { 
      x: 0, 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5, delay: 0, ease: "easeOut" }
    }
  };

  const image2Variants: Variants = {
    hidden: { x: 200, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1, 
      transition: { duration: 0.5, delay: 0.1, ease: "easeOut" }
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-[80px] lg:pt-[80px] pb-16 overflow-visible bg-white">
      {/* Dynamic Background Elements - Desktop Only */}
      <div className="hidden lg:block absolute top-0 right-0 w-1/2 h-full bg-blue-50/30 -skew-x-12 translate-x-1/2 z-0" />
      <div className="hidden lg:block absolute bottom-1/4 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px] z-0" />
      
      <div className="w-full max-w-[1920px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 2xl:px-20 relative z-20">
        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12 lg:gap-20 xl:gap-28">
          
          {/* Left Side: Cinematic Typography */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="w-full lg:w-[60%] text-left relative z-10 py-8 lg:py-0"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0 }}
              className="inline-flex items-center space-x-3 px-4 py-2 rounded-full bg-blue-950/10 lg:bg-blue-950/5 border border-white/20 lg:border-blue-950/10 mb-4 lg:mb-5 backdrop-blur-md lg:backdrop-blur-none"
            >
              <div className="w-2 h-2 rounded-full bg-amber-500" />
              <span className="text-[9px] lg:text-[10px] font-black uppercase tracking-[0.2em] lg:tracking-[0.5em] text-white lg:text-blue-950">{content.tag}</span>
            </motion.div>
            
            <h1 className="text-[2.5rem] sm:text-5xl lg:text-[4.25rem] xl:text-[5.25rem] 2xl:text-[5.75rem] font-black tracking-tighter text-white lg:text-blue-950 leading-none mb-4 lg:mb-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)] lg:drop-shadow-none">
              {content.titleTop.split('&').map((part: string, i: number, arr: string[]) => (
                <span key={i} className="lg:inline-block lg:whitespace-nowrap">
                  {part}
                  {i < arr.length - 1 && (
                    <span className="text-[42%] font-black text-amber-500/60 align-middle mx-0.5 tracking-normal">&amp;</span>
                  )}
                </span>
              ))}
              <br />
              <span className="text-white lg:text-transparent lg:bg-clip-text lg:bg-gradient-to-r lg:from-blue-950 lg:to-gray-400 lg:inline-block lg:whitespace-nowrap">{content.titleBottom}</span>
            </h1>
            
            <p className="text-base lg:text-xl xl:text-2xl text-gray-100 lg:text-gray-500 max-w-xl mb-6 lg:mb-8 font-medium leading-relaxed border-l-4 border-amber-500/40 lg:border-amber-500/20 pl-6 lg:pl-8 drop-shadow-md lg:drop-shadow-none">
              {content.descPre} <span className="text-white lg:text-blue-950 font-bold">{content.descHighlight}</span> {content.descPost}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 lg:gap-6">
              <button 
                onClick={scrollToCatalog}
                className="group w-full sm:w-auto px-8 lg:px-10 py-4 lg:py-5 bg-amber-500 text-slate-950 rounded-2xl font-black text-base lg:text-lg shadow-[0_20px_50px_rgba(245,158,11,0.25)] hover:bg-amber-400 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer"
              >
                {content.cta}
                <ChevronRight size={20} className="ml-3 lg:ml-4 group-hover:translate-x-2 transition-transform" />
              </button>

              <a 
                href="https://wa.me/212661138204?text=Bonjour,%20je%20souhaite%20obtenir%20un%20devis%20pour%20mon%20projet"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 lg:px-10 py-4 lg:py-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold text-base lg:text-lg shadow-lg active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
              >
                💬 WhatsApp Direct
              </a>
              
              <div className="flex items-center space-x-4 opacity-70 lg:opacity-100">
                <div className="w-8 lg:w-12 h-px bg-white lg:bg-gray-200" />
                <span className="text-[9px] lg:text-[10px] font-black uppercase tracking-widest text-white lg:text-gray-400">{content.projects}</span>
              </div>
            </div>
          </motion.div>
          
          {/* Right Side: Architectural Depth (Background on Mobile) */}
          <div className="absolute inset-0 lg:relative lg:w-[40%] lg:aspect-[4/5] lg:h-[620px] z-0 lg:z-10 mt-0 lg:mt-0">
            {/* Floating Trust Badge */}
            <div className="hidden md:flex absolute top-1/4 -left-10 lg:-left-24 z-40 bg-white/80 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-2xl p-4 lg:p-5 items-center gap-4 border border-white">
              <div className="bg-amber-500/15 p-3 rounded-xl flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500 fill-amber-500/20">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xl lg:text-2xl font-black text-blue-950 leading-none tracking-tight">Depuis 2017</span>
                <span className="text-sm font-semibold text-slate-500 mt-1">Expertise Maroc</span>
              </div>
            </div>

            {/* Main Image Frame */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={image1Variants}
              className="absolute inset-0 w-full h-full lg:h-[90%] rounded-none lg:rounded-[3.5rem] overflow-hidden shadow-none lg:shadow-[0_80px_100px_-20px_rgba(0,40,80,0.15)] z-10"
            >
              <Image 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200" 
                alt="Matériaux de second œuvre Casablanca Maroc - Chada Alyasmin" 
                fill
                priority={true}
                className="object-cover lg:grayscale-[0.2] lg:hover:grayscale-0 transition-all duration-700 lg:hover:scale-105" 
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
              {/* Overlays */}
              <div className="absolute inset-0 bg-blue-950/60 lg:hidden" />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-black/40 lg:hidden" />
              <div className="hidden lg:block absolute inset-0 bg-linear-to-t from-blue-950/40 to-transparent" />
            </motion.div>
            
            {/* Floating Detail Image - Desktop Only */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={image2Variants}
              className="hidden xl:block absolute -bottom-10 -left-8 w-[55%] h-[45%] rounded-[3rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.3)] z-20 border-[12px] border-white"
            >
              <Image 
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800" 
                alt="Faux plafond et finition intérieure Casablanca" 
                fill
                className="object-cover" 
                sizes="30vw"
              />
            </motion.div>
            
            <div className="absolute -top-6 lg:-top-12 right-6 lg:right-12 text-7xl lg:text-[12rem] font-black text-white/5 lg:text-gray-50 select-none -z-10 tracking-tighter">C</div>
          </div>
        </div>
      </div>
    </section>
  );
}
