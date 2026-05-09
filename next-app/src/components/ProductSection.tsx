"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Plus, ChevronDown } from "lucide-react";
import { fetchProducts } from "@/services/api";
import { type Product } from "@/data/products";

const INITIAL_COUNT = 12;

export function ProductSection({ lang }: { lang: 'fr' | 'ma' | 'en' }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        setIsLoading(true);
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products for section:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadProducts();
  }, []);

  const visibleProducts = showAll ? products : products.slice(0, INITIAL_COUNT);
  const hasMore = products.length > INITIAL_COUNT;

  if (isLoading && products.length === 0) {
    return (
      <section className="py-32 bg-slate-900 flex items-center justify-center">
        <div className="text-white font-black animate-pulse">Chargement du catalogue...</div>
      </section>
    );
  }

  return (
    <section className="pt-40 pb-32 bg-slate-900" id="products">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-xl">
            <h2 className="text-sm font-black uppercase tracking-[0.4em] text-amber-500 mb-6">Catalogue Premium</h2>
            <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight">
              Solutions Techniques de <span className="grad-text">Précision.</span>
            </h3>
          </div>
          <p className="text-slate-400 font-medium max-w-xs text-sm leading-relaxed">
            {lang === 'fr' 
              ? "Découvrez notre sélection de produits certifiés pour vos chantiers les plus exigeants." 
              : lang === 'ma' 
                ? "Découvrez les meilleurs prix pour vos matériaux de construction au Maroc."
                : "Discover our premium selection of certified building materials for your projects."
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {visibleProducts.map((product, i) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="glass-card overflow-hidden mb-6 aspect-[4/5] relative">
                <Image 
                  src={product.image || "/logo.png"} 
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                  className="transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100" 
                />
                <div className="absolute top-6 right-6">
                   <div className="px-3 py-1 rounded-full bg-slate-900/50 backdrop-blur-md border border-white/10">
                     <span className="text-[9px] font-black uppercase tracking-widest text-amber-500">
                       {product.stockStatus === 'En Stock' ? 'Disponible' : product.stockStatus}
                     </span>
                   </div>
                </div>
                <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <button className="w-full py-4 bg-white text-slate-950 font-black text-sm rounded-xl flex items-center justify-center gap-2">
                    Détails Techniques <Plus size={16} />
                  </button>
                </div>
              </div>
              <h4 className="text-2xl font-black text-white mb-1 group-hover:text-amber-500 transition-colors">{product.name}</h4>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">{product.category}</p>
            </motion.div>
          ))}
        </div>

        {hasMore && !showAll && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-center mt-16"
          >
            <button
              onClick={() => setShowAll(true)}
              className="group px-10 py-5 bg-white/5 hover:bg-amber-500/10 border border-white/10 hover:border-amber-500/30 text-white font-black text-sm uppercase tracking-[0.2em] rounded-2xl flex items-center gap-3 transition-all duration-300"
            >
              {lang === 'fr' || lang === 'ma' ? 'Voir Plus' : 'Show More'}
              <ChevronDown size={18} className="text-amber-500 group-hover:translate-y-1 transition-transform" />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

