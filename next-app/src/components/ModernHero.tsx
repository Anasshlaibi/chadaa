import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';

function ModernHero() {
  const scrollToCatalog = () => {
    window.location.hash = '#catalog?filter=Tous';
    const catalogElement = document.getElementById('catalog');
    if (catalogElement) catalogElement.scrollIntoView({ behavior: 'smooth' });
  };

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;

  const textVariants: Variants = {
    hidden: { x: isMobile ? 0 : 100, y: isMobile ? 20 : 0, opacity: 0 },
    visible: { 
      x: 0, 
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
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
    <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center overflow-hidden bg-white pt-20 lg:pt-0">
      {/* Dynamic Background Elements - Desktop Only */}
      <div className="hidden lg:block absolute top-0 right-0 w-1/2 h-full bg-blue-50/30 -skew-x-12 translate-x-1/2 z-0" />
      <div className="hidden lg:block absolute bottom-1/4 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px] z-0" />
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full relative z-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          
          {/* Left Side: Cinematic Typography */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="w-full lg:w-[55%] text-left relative z-10 py-12 lg:py-0"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0 }}
              className="inline-flex items-center space-x-3 px-4 py-2 rounded-full bg-blue-950/10 lg:bg-blue-950/5 border border-white/20 lg:border-blue-950/10 mb-6 lg:mb-8 backdrop-blur-md lg:backdrop-blur-none"
            >
              <div className="w-2 h-2 rounded-full bg-amber-500" />
              <span className="text-[9px] lg:text-[10px] font-black uppercase tracking-[0.2em] lg:tracking-[0.5em] text-white lg:text-blue-950">Leader du Second Œuvre au Maroc • Qualité Certifiée</span>
            </motion.div>
            
            <h1 className="text-[3.5rem] sm:text-7xl lg:text-[11rem] font-black tracking-tighter text-white lg:text-blue-950 leading-[0.8] mb-8 lg:mb-10 drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)] lg:drop-shadow-none">
              L'Art de <br />
              <span className="text-white lg:text-transparent lg:bg-clip-text lg:bg-linear-to-r lg:from-blue-950 lg:to-gray-400">Bâtir.</span>
            </h1>
            
            <p className="text-lg lg:text-2xl text-gray-100 lg:text-gray-500 max-w-xl mb-10 lg:mb-12 font-medium leading-relaxed border-l-4 border-amber-500/40 lg:border-amber-500/20 pl-6 lg:pl-8 drop-shadow-md lg:drop-shadow-none">
              Expertise en <span className="text-white lg:text-blue-950 font-bold">Aménagement & Finition</span> pour vos projets d'exception.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-6 lg:gap-8">
              <button 
                onClick={scrollToCatalog}
                className="group w-full sm:w-auto px-10 lg:px-12 py-5 lg:py-6 bg-blue-950 lg:bg-blue-950 text-white rounded-2xl font-black text-base lg:text-lg shadow-2xl lg:shadow-[0_20px_50px_rgba(0,40,80,0.2)] hover:bg-amber-600 transition-all duration-500 flex items-center justify-center border border-white/10 lg:border-transparent"
              >
                Explorer le Catalogue
                <ChevronRight size={20} className="ml-3 lg:ml-4 group-hover:translate-x-2 transition-transform" />
              </button>
              
              <div className="flex items-center space-x-4 opacity-70 lg:opacity-100">
                <div className="w-8 lg:w-12 h-px bg-white lg:bg-gray-200" />
                <span className="text-[9px] lg:text-[10px] font-black uppercase tracking-widest text-white lg:text-gray-400">Projets 2024</span>
              </div>
            </div>
          </motion.div>
          
          {/* Right Side: Architectural Depth (Background on Mobile) */}
          <div className="absolute inset-0 lg:relative lg:w-[45%] lg:aspect-4/5 lg:h-[750px] z-0 lg:z-10 mt-0 lg:mt-0">
            {/* Main Image Frame */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={image1Variants}
              className="absolute inset-0 w-full h-full lg:h-[90%] rounded-none lg:rounded-[4rem] overflow-hidden shadow-none lg:shadow-[0_80px_100px_-20px_rgba(0,40,80,0.15)] z-10"
            >
              <Image 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200" 
                alt="Architecture de Luxe"
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
              className="hidden lg:block absolute -bottom-10 -left-20 w-[65%] h-[50%] rounded-[3rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.3)] z-20 border-[12px] border-white"
            >
              <Image 
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800" 
                alt="Detail Architectural"
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
};

export default ModernHero;
