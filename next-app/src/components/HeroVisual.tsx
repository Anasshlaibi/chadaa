"use client";

import React from 'react';
import { motion } from 'framer-motion';

const HeroVisual: React.FC = () => {
  return (
    <div className="relative w-full max-w-[700px] aspect-[4/3] perspective-[2000px]">
      {/* Cinematic Lighting Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0%,transparent_70%)]" />
      
      {/* The Luxury Plaster Ceiling (Parent Container) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, rotateX: 5 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full h-full bg-[#FDFDFD] shadow-[0_50px_100px_rgba(0,0,0,0.08)] rounded-lg overflow-hidden border border-gray-100/50"
      >
        {/* Plaster Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none" />
        
        {/* Soft Ceiling Shadow/Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,1)_0%,rgba(240,240,240,0.5)_100%)]" />

        {/* The Seamless Invisible Hatch (The Product) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%]">
          
          {/* Subtle Outer Join (The "Invisible" Frame) */}
          <div className="absolute inset-0 border-[0.5px] border-gray-200/30 rounded-sm shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)]" />
          
          {/* The Actual Hatch Door */}
          <motion.div
            initial={{ rotateX: 0 }}
            animate={{ rotateX: -15 }}
            transition={{ duration: 2, delay: 1, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
            style={{ transformOrigin: "top", transformStyle: "preserve-3d" }}
            className="relative w-full h-full bg-[#FDFDFD] border-[0.5px] border-gray-200/50 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.05)] flex items-center justify-center p-8"
          >
            {/* The Green Moisture-Resistant Infill (Symbolizing the elite tech) */}
            <div className="relative w-full h-full bg-[#5BA06B] rounded-sm flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
              
              {/* Minimalist Tech Branding */}
              <div className="flex flex-col items-center opacity-40">
                <div className="w-12 h-0.5 bg-white/30 rounded-full mb-4" />
                <div className="text-[10px] font-black uppercase tracking-[0.8em] text-white">CHADA</div>
              </div>

              {/* Internal Framing Geometry (Adds Realism) */}
              <div className="absolute inset-0 border-[8px] border-white/5" />
            </div>

            {/* Depth Edge (The Aluminum Side) */}
            <div className="absolute bottom-0 left-0 w-full h-[4px] bg-gray-300/20 translate-z-[-1px]" />
          </motion.div>
        </div>

        {/* Architectural Lighting Effects */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[linear-gradient(to_left,rgba(255,255,255,0.4),transparent)]" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-[linear-gradient(to_top,rgba(0,0,0,0.02),transparent)]" />
      </motion.div>

      {/* Floating UI Detail (Glassmorphism) */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute -right-8 top-1/4 backdrop-blur-md bg-white/40 border border-white/60 p-6 rounded-2xl shadow-2xl z-10"
      >
        <div className="flex items-center space-x-4">
          <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
          <span className="text-[10px] font-black uppercase tracking-widest text-blue-950">Ingénierie de Précision</span>
        </div>
        <div className="mt-2 text-[10px] text-gray-500 font-bold">Finition Seuil Zéro</div>
      </motion.div>
    </div>
  );
};

export default HeroVisual;
