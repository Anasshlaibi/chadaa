"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { type Product } from '../data/products';
import ProductCard from './ProductCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, PackageSearch } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useRouter } from 'next/navigation';

interface CatalogProps {
  products: Product[];
  isLoading: boolean;
  lang?: 'fr' | 'ma' | 'en';
}

const Catalog: React.FC<CatalogProps> = ({ products, isLoading, lang = 'fr' }) => {
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [searchTerm, setSearchTerm] = useState('');
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);
  const { addToQuote } = useCart();
  const router = useRouter();

  const categories = useMemo(() => {
    const cats = ['Tous', ...new Set(products.map(p => p.category))];
    return cats;
  }, [products]);

  // Handle Hash Changes for Filtering
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#catalog?filter=')) {
        const filter = decodeURIComponent(hash.split('=')[1]);
        if (categories.includes(filter)) {
          setActiveCategory(filter);
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial check
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [categories]);

  const filteredProducts = useMemo(() => {
    let result = products;
    if (activeCategory !== 'Tous') {
      result = result.filter(p => p.category === activeCategory);
    }
    if (searchTerm) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return result;
  }, [activeCategory, searchTerm, products]);

  const visibleProducts = useMemo(() => {
    return filteredProducts.slice(0, visibleCount);
  }, [filteredProducts, visibleCount]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const content = {
    fr: {
      tag: "Solutions Architectures",
      titleTop: "Notre",
      titleBottom: "Expertise.",
      searchPlaceholder: "Rechercher un produit...",
      allCategory: "Tous",
      noResults: "Aucun résultat",
      noResultsDesc: "Essayez d'autres mots-clés ou parcourez les catégories.",
      seeMore: "Voir Plus de Produits"
    },
    ma: {
      tag: "Grossiste B2B",
      titleTop: "Notre",
      titleBottom: "Catalogue.",
      searchPlaceholder: "Rechercher un produit...",
      allCategory: "Tous",
      noResults: "Aucun résultat",
      noResultsDesc: "Essayez d'autres mots-clés ou parcourez les catégories.",
      seeMore: "Voir Plus de Produits"
    },
    en: {
      tag: "Architectural Solutions",
      titleTop: "Our",
      titleBottom: "Expertise.",
      searchPlaceholder: "Search for a product...",
      allCategory: "All",
      noResults: "No results",
      noResultsDesc: "Try different keywords or browse categories.",
      seeMore: "View More Products"
    }
  }[lang];

  return (
    <section id="catalog" className="pt-40 pb-24 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header Area */}
        <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-left max-w-2xl"
          >
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-600 mb-4 px-4 py-1.5 bg-amber-50 rounded-lg inline-block">
              {content.tag}
            </p>
            <h2 className="text-4xl md:text-6xl font-black text-blue-950 tracking-tighter leading-[0.9] mb-6">
              {content.titleTop} <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-950 to-gray-400">{content.titleBottom}</span>
            </h2>
            <div className="w-20 h-1 bg-amber-500 rounded-full" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-auto space-y-4"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text"
                placeholder={content.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full lg:w-[400px] min-h-[54px] pl-12 pr-6 rounded-2xl bg-white border border-gray-100 focus:border-amber-500 outline-none transition-all font-medium text-blue-950 shadow-sm"
              />
            </div>
            
            {/* Category Selector */}
            <div className="relative">
              <div className="flex flex-wrap gap-4 justify-start lg:justify-end">
                {/* Desktop view */}
                <div className="hidden lg:flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setActiveCategory(cat);
                        setVisibleCount(12);
                      }}
                      className={`px-5 py-2.5 min-h-[44px] rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 border-2 ${
                        activeCategory === cat
                          ? 'bg-blue-950 text-white border-blue-950 shadow-lg'
                          : 'bg-white text-gray-400 border-gray-100 hover:border-amber-500 hover:text-blue-950'
                      }`}
                    >
                      {cat === 'Tous' ? content.allCategory : cat}
                    </button>
                  ))}
                </div>

                {/* Mobile view */}
                <div className="flex lg:hidden flex-wrap gap-4 w-full">
                  {categories.slice(0, 3).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setActiveCategory(cat);
                        setIsMoreOpen(false);
                        setVisibleCount(12);
                      }}
                      className={`grow px-4 py-3 min-h-[48px] rounded-xl text-[9px] font-black uppercase tracking-widest transition-all duration-300 border-2 ${
                        activeCategory === cat
                          ? 'bg-blue-950 text-white border-blue-950 shadow-lg'
                          : 'bg-white text-gray-400 border-gray-100'
                      }`}
                    >
                      {cat === 'Tous' ? content.allCategory : cat}
                    </button>
                  ))}
                  <button
                    onClick={() => setIsMoreOpen(!isMoreOpen)}
                    className={`px-4 py-3 min-w-[48px] min-h-[48px] rounded-xl transition-all duration-300 border-2 ${
                      isMoreOpen 
                        ? 'bg-amber-500 text-white border-amber-500 shadow-lg' 
                        : 'bg-white text-blue-950 border-gray-100'
                    }`}
                  >
                    <Filter size={16} className={isMoreOpen ? "" : "rotate-90"} />
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {isMoreOpen && (
                  <>
                    <motion.div 
                      className="fixed inset-0 bg-blue-950/20 backdrop-blur-sm z-60 lg:hidden"
                      onClick={() => setIsMoreOpen(false)}
                    />
                    <motion.div
                      className="lg:hidden absolute top-full left-0 right-0 mt-4 bg-white rounded-4xl shadow-2xl border border-gray-100 p-6 z-70 grid grid-cols-2 gap-4"
                    >
                      {categories.slice(3).map((cat) => (
                        <button
                          key={cat}
                          onClick={() => {
                            setActiveCategory(cat);
                            setIsMoreOpen(false);
                            setVisibleCount(12);
                          }}
                          className={`px-4 py-4 min-h-[48px] rounded-xl text-[10px] font-black uppercase tracking-widest transition-all text-left ${
                            activeCategory === cat ? 'bg-blue-950 text-white' : 'bg-gray-50 text-gray-400'
                          }`}
                        >
                          {cat === 'Tous' ? content.allCategory : cat}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Product Grid */}
        <div className="min-h-[600px]">
          {isLoading ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-[4/5] bg-white rounded-[2rem] border border-gray-100 animate-pulse flex flex-col p-6 space-y-4">
                  <div className="aspect-square bg-gray-50 rounded-2xl" />
                  <div className="h-4 bg-gray-50 rounded-full w-2/3" />
                  <div className="h-3 bg-gray-50 rounded-full w-1/3" />
                </div>
              ))}
            </div>
          ) : (
            <>
              <AnimatePresence mode="popLayout" initial={false}>
                {visibleProducts.length > 0 ? (
                  <motion.div 
                    key={activeCategory + searchTerm}
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10"
                  >
                    {visibleProducts.map((product) => (
                      <motion.div key={product.id} variants={itemVariants} layout shadow-sm>
                        <ProductCard 
                          product={product} 
                          onOpenModal={(p) => router.push(`/products/${p.id}`)}
                          onAddToCart={(p) => addToQuote(p)}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <div className="text-center py-32 px-10 rounded-[3rem] bg-white border border-dashed border-gray-200">
                    <PackageSearch size={48} className="mx-auto mb-8 text-gray-200" />
                    <h3 className="text-2xl font-black text-blue-950 mb-3">{content.noResults}</h3>
                    <p className="text-gray-400">{content.noResultsDesc}</p>
                  </div>
                )}
              </AnimatePresence>
              
              {filteredProducts.length > visibleCount && (
                <div className="mt-20 text-center">
                  <button 
                    onClick={() => setVisibleCount(prev => prev + 12)}
                    className="px-12 py-5 bg-white border-2 border-blue-950 text-blue-950 rounded-2xl font-black text-base hover:bg-blue-950 hover:text-white transition-all duration-300 shadow-xl"
                  >
                    {content.seeMore}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Catalog;
