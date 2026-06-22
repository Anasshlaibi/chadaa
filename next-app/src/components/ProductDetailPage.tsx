"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { type Product } from '../data/products';
import { ChevronLeft, ShoppingBag, ShieldCheck, MapPin, Truck, HelpCircle, Plus, Minus, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../hooks/useCart';
import { cn } from '../lib/utils';
import Image from 'next/image';

interface ProductDetailPageProps {
  product: Product;
}

function ProductDetailPage({ product }: ProductDetailPageProps) {
  const router = useRouter();
  const { addToQuote } = useCart();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
    setQuantity(1);
  }, [product.id]);


  const handleIncrement = () => setQuantity(q => q + 1);
  const handleDecrement = () => setQuantity(q => Math.max(1, q - 1));

  return (
    <div className="min-h-screen bg-white pb-32">
      {/* Navigation Header - Fixed to stick below global Navbar */}
      <div className="sticky top-20 lg:top-[80px] z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-[1920px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 2xl:px-20 h-16 flex items-center justify-between">
          <button 
            onClick={() => router.back()} 
            className="flex items-center text-blue-950 font-black uppercase text-[10px] tracking-widest min-h-[44px]"
          >
            <ChevronLeft size={18} className="mr-2" />
            Retour
          </button>
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
            Détails du Produit
          </div>
          <div className="w-10 h-10" /> {/* Spacer */}
        </div>
      </div>

      <div className="max-w-[1920px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 2xl:px-20 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Dynamic Image Showcase */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="relative w-full aspect-square bg-gray-50 rounded-[3rem] flex items-center justify-center p-12 border border-gray-100 shadow-sm overflow-hidden group">
              <Image 
                src={product.image} 
                alt={`${product.name} - Solution technique Chada Alyasmin Casablanca`}
                fill
                className="object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105 p-12"
                priority={true}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* 100% RH Badge pinned to top-right corner */}
              <div className="absolute top-6 right-6 px-4 py-1.5 bg-amber-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg z-10">
                100% RH
              </div>
              
              {/* High Resolution View Button */}
              <button 
                disabled={true}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 bg-blue-950/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-[0.2em] px-8 py-3 rounded-full opacity-0 group-hover:opacity-50 translate-y-4 group-hover:translate-y-0 cursor-not-allowed"
              >
                Vue Haute Résolution
              </button>

              <div className="absolute top-8 left-8 w-12 h-12">
                <Image src="/logo.png" alt="Chada" fill className="object-contain opacity-20" />
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              {[product.image, product.image, product.image].map((img, i) => (
                <div key={i} className="relative aspect-square rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center p-4 cursor-pointer hover:border-amber-500 transition-all hover:shadow-md overflow-hidden">
                  <Image 
                    src={img} 
                    alt="" 
                    fill
                    className="object-contain opacity-30 mix-blend-multiply p-4" 
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Premium B2B Content */}
          <div className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-600 mb-4">
                {product.category}
              </p>
              <h1 className="text-4xl lg:text-6xl font-black text-blue-950 tracking-tighter leading-none mb-6">
                {product.name}
              </h1>
              <div className="flex items-center space-x-4 mb-8">
                <div className={cn(
                  "flex items-center space-x-1.5 px-3 py-1.5 rounded-full border shadow-sm",
                  product.stockStatus === 'En Rupture' 
                    ? "bg-red-50 border-red-100 text-red-700" 
                    : "bg-green-50 border-green-100 text-green-700"
                )}>
                  {product.stockStatus === 'En Rupture' ? (
                    <X size={14} className="text-red-500" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                  )}
                  <span className="text-[10px] font-black uppercase tracking-widest leading-none">
                    {product.stockStatus}
                  </span>
                </div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  REF: {product.id.toUpperCase()}
                </div>
              </div>
              
              <p className="text-lg text-gray-500 font-medium leading-relaxed mb-10">
                {product.description} Explorez notre gamme complète pour une installation professionnelle de second œuvre au Maroc. Qualité certifiée et durabilité garantie.
              </p>
            </motion.div>

            {/* Technical Specs Accordion (Dynamic) */}
            <div className="space-y-4 mb-12">
              <div className="p-6 rounded-3xl bg-gray-50 border border-gray-100">
                <h3 className="text-xs font-black uppercase tracking-widest text-blue-950 mb-4 flex items-center">
                  <ShieldCheck size={16} className="mr-2 text-amber-600" />
                  Spécifications Techniques
                </h3>
                <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-8">
                  {product.specs ? (
                    Object.entries(product.specs).map(([key, value]) => (
                      <div key={key}>
                        <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">{key}</p>
                        <p className="text-sm font-black text-blue-950">{String(value)}</p>
                      </div>
                    ))
                  ) : (
                    <>
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Matériau</p>
                        <p className="text-sm font-black text-blue-950">Standard Industriel</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Finition</p>
                        <p className="text-sm font-black text-blue-950">Blanc Premium</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Usage</p>
                        <p className="text-sm font-black text-blue-950">Divers Second Œuvre</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Origine</p>
                        <p className="text-sm font-black text-blue-950">Certifié Maroc</p>
                      </div>
                    </>
                  )}
                </div>

                {/* NEW: PDF Download Button for B2B Buyers */}
                <button 
                  disabled={true}
                  className="flex items-center justify-center gap-3 w-full py-4 px-6 bg-gray-100 border-2 border-transparent text-gray-400 font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl cursor-not-allowed opacity-60"
                >
                  <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  Télécharger Fiche Technique (Indisponible)
                </button>
              </div>
            </div>

            {/* B2B Action Card - DESKTOP ONLY */}
            <div className="hidden lg:block mt-auto p-8 rounded-[2.5rem] bg-blue-950 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <h3 className="text-xl font-black mb-2 tracking-tight">Besoin d'un devis personnalisé ?</h3>
              <p className="text-blue-200 text-sm font-medium mb-6 opacity-80">Nos agents commerciaux vous répondent sous 24h pour vos projets de grande envergure.</p>
              
              <div className="flex flex-col space-y-6">
                {/* Quantity Control */}
                <div className="flex items-center justify-between bg-white/5 rounded-2xl p-2 border border-white/10">
                  <span className="ml-4 text-[10px] font-black uppercase tracking-[0.2em] text-blue-200">Quantité</span>
                  <div className="flex items-center space-x-1">
                    <button 
                      onClick={handleDecrement}
                      className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-xl transition-all"
                    >
                      <Minus size={16} />
                    </button>
                    <input 
                      type="text"
                      inputMode="numeric"
                      value={quantity === 0 ? '' : quantity}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '');
                        if (val === '') {
                          setQuantity(0);
                        } else {
                          const num = parseInt(val);
                          if (!isNaN(num)) setQuantity(num);
                        }
                      }}
                      onBlur={() => {
                        if (quantity < 1) setQuantity(1);
                      }}
                      className="w-16 h-10 bg-white/10 rounded-xl text-center font-black text-white text-lg outline-none focus:bg-white/20 transition-all border border-white/10"
                      placeholder="1"
                    />
                    <button 
                      onClick={handleIncrement}
                      className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-xl transition-all"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                <div className="flex gap-4 group">
                  <button 
                    onClick={() => addToQuote(product, Math.max(1, quantity))}
                    className="grow min-h-[54px] bg-amber-500 hover:bg-amber-400 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center space-x-3 shadow-lg shadow-amber-500/30 active:scale-95 group-hover:shadow-amber-500/40"
                  >
                    <ShoppingBag size={18} />
                    <span>Demander un Devis</span>
                  </button>
                  <button 
                    disabled={true}
                    className="grow min-h-[54px] bg-white/5 text-gray-500 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center space-x-3 backdrop-blur-md cursor-not-allowed opacity-50"
                  >
                    <HelpCircle size={18} />
                    <span>Assistance</span>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Logistics Info */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="flex items-center space-x-3 text-gray-400">
                <Truck size={16} />
                <span className="text-[9px] font-black uppercase tracking-widest">Livraison Maroc Entier</span>
              </div>
              <div className={cn("flex items-center space-x-3", product.stockStatus === 'En Rupture' ? "text-red-400" : "text-gray-400")}>
                <MapPin size={16} />
                <span className="text-[9px] font-black uppercase tracking-widest">
                  {product.stockStatus === 'En Rupture' ? "Indisponible actuellement" : "Stock Casablanca"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STICKY MOBILE CTA - Refactored */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 pb-8 bg-white/95 backdrop-blur-md border-t border-gray-100 z-[110] flex items-center gap-3 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
        <div className="flex items-center bg-gray-50 rounded-2xl p-1.5 border border-gray-100 shrink-0">
          <button 
            onClick={handleDecrement}
            className="w-12 h-12 flex items-center justify-center text-blue-950 active:bg-white rounded-xl transition-all shadow-sm"
          >
            <Minus size={20} />
          </button>
          <input 
            type="text"
            inputMode="numeric"
            value={quantity === 0 ? '' : quantity}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, '');
              if (val === '') {
                setQuantity(0);
              } else {
                const num = parseInt(val);
                if (!isNaN(num)) setQuantity(num);
              }
            }}
            onBlur={() => {
              if (quantity < 1) setQuantity(1);
            }}
            className="w-16 h-12 bg-white rounded-xl text-center font-black text-blue-950 text-lg outline-none border border-gray-100 mx-1"
            placeholder="1"
          />
          <button 
            onClick={handleIncrement}
            className="w-12 h-12 flex items-center justify-center text-blue-950 active:bg-white rounded-xl transition-all shadow-sm"
          >
            <Plus size={20} />
          </button>
        </div>
        <button 
          onClick={() => addToQuote(product, Math.max(1, quantity))}
          className="grow h-14 bg-amber-500 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-amber-500/20 flex items-center justify-center space-x-3 active:scale-95 transition-transform"
        >
          <ShoppingBag size={20} />
          <span>Demander un Devis</span>
        </button>
      </div>
    </div>
  );
}

export default ProductDetailPage;
