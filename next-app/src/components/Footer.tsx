"use client";

import { Hammer, Mail, Phone, MapPin, Instagram, Facebook, Linkedin } from "lucide-react";

export function Footer({ lang }: { lang: 'fr' | 'ma' | 'en' }) {
  return (
    <footer className="py-20 bg-slate-900 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center">
                <Hammer className="text-slate-900" size={24} />
              </div>
              <span className="text-xl font-black tracking-tighter text-white uppercase">CHADA ALYASMIN</span>
            </div>
            <p className="text-slate-400 font-medium text-sm leading-relaxed">
              {lang === 'fr' 
                ? "Solutions premium pour le second œuvre. Votre partenaire de confiance depuis 2017."
                : "Spécialiste du BA13 et Second Œuvre au Maroc. Livraison Casablanca & Bouskoura."}
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:bg-amber-500 hover:text-slate-950 transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-[10px] mb-8">Contact</h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4 text-slate-400">
                <MapPin className="text-amber-500 shrink-0" size={18} />
                <span className="text-xs font-medium uppercase leading-relaxed">Lot. Al Amal n°2, Bouskoura, Casablanca, Maroc</span>
              </div>
              <div className="flex items-center gap-4 text-slate-400">
                <Phone className="text-amber-500 shrink-0" size={18} />
                <span className="text-xs font-black">+212 661 138 204</span>
              </div>
              <div className="flex items-center gap-4 text-slate-400">
                <Mail className="text-amber-500 shrink-0" size={18} />
                <span className="text-xs font-medium uppercase tracking-widest">contact@chadaalyasmin.ma</span>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">© 2026 CHADA ALYASMIN. TOUS DROITS RÉSERVÉS.</p>
          <div className="flex gap-8">
             <a href="#" className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-600 hover:text-white transition-colors">Mentions Légales</a>
             <a href="#" className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-600 hover:text-white transition-colors">Confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
