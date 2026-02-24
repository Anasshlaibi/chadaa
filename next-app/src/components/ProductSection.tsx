"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";

const products = [
  {
    id: "trappe-alu",
    name: "Trappe de Visite Alu",
    specs: "Cadre Alu / Plaque BA13",
    tag: "Top Vente",
    img: "https://znhhzbpmqemappldctpw.supabase.co/storage/v1/object/public/product-images/assetstrappe/img/work-4.jpg"
  },
  {
    id: "joint-creux",
    name: "Profilé Joint Creux",
    specs: "Aluminium Haute Qualité",
    tag: "Design",
    img: "https://znhhzbpmqemappldctpw.supabase.co/storage/v1/object/public/product-images/img/portfolio/jointcreux1.jpg"
  },
  {
    id: "ba13-hydro",
    name: "Plaque BA13 Hydro",
    specs: "Résistance Humidité",
    tag: "Standard",
    img: "https://znhhzbpmqemappldctpw.supabase.co/storage/v1/object/public/product-images/img/portfolio/portfolio-2.jpg"
  }
];

export function ProductSection({ lang }: { lang: 'fr' | 'ma' | 'en' }) {
  return (
    <section className="py-32 bg-slate-900" id="products">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-xl">
            <h2 className="text-sm font-black uppercase tracking-[0.4em] text-amber-500 mb-6">Catalogue Premium</h2>
            <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight">
              Solutions Techniques de <span className="grad-text">Précision.</span>
            </h3>
          </div>
          <p className="text-slate-400 font-medium max-w-xs text-sm leading-relaxed">
            {lang === 'fr' ? "Découvrez notre sélection de produits certifiés pour vos chantiers les plus exigeants." : "Découvrez les meilleurs prix pour vos matériaux de construction au Maroc."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product, i) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="glass-card overflow-hidden mb-6 aspect-[4/5] relative">
                <img 
                  src={product.img} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100" 
                />
                <div className="absolute top-6 right-6">
                   <div className="px-3 py-1 rounded-full bg-slate-900/50 backdrop-blur-md border border-white/10">
                     <span className="text-[9px] font-black uppercase tracking-widest text-amber-500">{product.tag}</span>
                   </div>
                </div>
                <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <button className="w-full py-4 bg-white text-slate-950 font-black text-sm rounded-xl flex items-center justify-center gap-2">
                    Détails Techniques <Plus size={16} />
                  </button>
                </div>
              </div>
              <h4 className="text-2xl font-black text-white mb-1 group-hover:text-amber-500 transition-colors">{product.name}</h4>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">{product.specs}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
