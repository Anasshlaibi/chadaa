"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Hammer } from "lucide-react";

export function Navbar({ lang }: { lang: 'fr' | 'ma' | 'en' }) {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = {
    fr: [
      { name: "Expertise", href: "#expertise" },
      { name: "Trappes", href: "#trappes" },
      { name: "Contact", href: "#contact" }
    ],
    ma: [
      { name: "Services", href: "#services" },
      { name: "Catalogue", href: "#catalog" },
      { name: "WhatsApp", href: "https://wa.me/212661150961" }
    ],
    en: [
      { name: "Solutions", href: "#solutions" },
      { name: "Products", href: "#products" },
      { name: "Shipping", href: "#shipping" }
    ]
  }[lang];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-slate-900/80 backdrop-blur-xl border-b border-white/10 py-4' : 'bg-transparent py-8'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href={`/${lang}`} className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center shadow-lg">
            <Hammer className="text-slate-900" size={24} />
          </div>
          <span className="text-xl font-black tracking-tighter text-white">CHADA ALYASMIN</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-amber-500 transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <div className="h-4 w-px bg-white/10" />
          <div className="flex gap-3">
             {['fr', 'ma', 'en'].map((l) => (
               <Link 
                key={l}
                href={`/${l}`} 
                className={`text-[10px] font-black uppercase w-8 h-8 rounded-lg flex items-center justify-center border transition-all ${lang === l ? 'bg-amber-500 border-amber-500 text-slate-950' : 'border-white/10 text-slate-400 hover:border-white/20'}`}
               >
                 {l}
               </Link>
             ))}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-slate-900/95 backdrop-blur-2xl border-b border-white/10 p-8 flex flex-col gap-6 md:hidden"
          >
            {links.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-2xl font-black tracking-tight text-white"
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
