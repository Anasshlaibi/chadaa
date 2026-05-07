"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Link from 'next/link';

const TrappeShowcase: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // 3D Rotation Mapping: -80deg (open) to 0deg (closed)
  const rotateXValue = useTransform(smoothProgress, [0.1, 0.8], [-80, 0]);
  
  // Text Opacity Mapping: Fades in as the door starts closing
  const textOpacity = useTransform(smoothProgress, [0, 0.3, 0.6], [0, 1, 1]);
  const textY = useTransform(smoothProgress, [0, 0.3], [20, 0]);

  // Shadow / Glow Mapping
  const shadowOpacity = useTransform(smoothProgress, [0.4, 0.8], [0, 0.4]);

  return (
    <section ref={wrapperRef} className="relative h-[300vh] bg-white">
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Side: Apple-Tier Typography */}
            <motion.div 
              style={{ opacity: textOpacity, y: textY }}
              className="flex flex-col space-y-8"
            >
              <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-blue-950 leading-[0.9]">
                Finition Invisible. <br />
                <span className="text-yellow-500">Sécurité Absolue.</span>
              </h2>
              <p className="text-xl text-gray-400 font-medium max-w-lg leading-relaxed">
                Nos trappes de visite sur mesure s'intègrent parfaitement à vos faux plafonds. 
                Contrôlez l'ouverture d'un simple geste et profitez d'une finition haut de gamme.
              </p>
              <div className="pt-4">
                <Link 
                  href="#contact"
                  className="bg-blue-950 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-yellow-500 transition-all duration-300 shadow-xl group flex items-center space-x-3 w-fit"
                >
                  <span>Demander un Devis</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </Link>
              </div>
            </motion.div>

            {/* Right Side: 3D CSS Element */}
            <div className="relative flex items-center justify-center perspective-[2000px]">
              <div className="relative w-full max-w-[500px] aspect-square">
                
                {/* The Frame */}
                <div className="absolute inset-0 bg-[#f8fafc] border-16 border-[#e2e8f0] rounded-sm shadow-[inset_0_10px_30px_rgba(0,0,0,0.1),0_50px_100px_rgba(0,0,0,0.05)] flex items-center justify-center p-1">
                  
                  {/* Internal Compartment */}
                  <div className="absolute inset-0 bg-gray-100 rounded-sm opacity-50" />
                  
                  {/* The Door (Hinged at top) */}
                  <motion.div 
                    style={{ 
                      rotateX: rotateXValue,
                      transformOrigin: "top",
                      transformStyle: "preserve-3d"
                    }}
                    className="relative w-full h-full bg-[#5BA06B] border border-gray-300 shadow-2xl flex items-center justify-center group pointer-events-none"
                  >
                    {/* Water-Resistant Texture (Based on User's Green Image) */}
                    <div className="absolute inset-0 opacity-[0.1] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
                    
                    {/* Dynamic Shadow Overlay */}
                    <motion.div 
                      style={{ opacity: shadowOpacity }}
                      className="absolute inset-0 bg-black/40 pointer-events-none" 
                    />

                    {/* Branding / Details */}
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-1 bg-white/20 rounded-full mb-4" />
                      <div className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30">CHADA SERIES</div>
                    </div>
                  </motion.div>
                </div>

                {/* Decorative BG Accents */}
                <div className="absolute -z-10 -top-20 -right-20 w-64 h-64 bg-green-50 rounded-full blur-3xl opacity-50" />
                <div className="absolute -z-10 -bottom-20 -left-20 w-80 h-80 bg-blue-50 rounded-full blur-3xl opacity-30" />
              </div>
            </div>

          </div>
        </div>

        {/* Scroll Progress Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <div className="w-px h-20 bg-gray-200 relative overflow-hidden">
            <motion.div 
              style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
              className="absolute inset-0 bg-blue-950"
            />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-blue-950 mt-4">Scroll to Close</span>
        </div>
      </div>
    </section>
  );
};

export default TrappeShowcase;
