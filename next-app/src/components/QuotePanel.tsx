"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ChevronRight, ShoppingBag, Plus, Minus } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { type CartItem } from '../types/cart';
import { cn } from '../lib/utils';
import QuoteForm from './QuoteForm';
import Image from 'next/image';

const QuotePanel: React.FC = () => {
  const { items, isPanelOpen, setIsPanelOpen, removeFromQuote, updateQuantity, clearQuote, itemCount } = useCart();
  const [view, setView] = useState<'cart' | 'checkout'>('cart');
  const [isDesktop, setIsDesktop] = useState(false);

  // Detect desktop breakpoint (lg = 1024px)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Reset view when panel is opened
  useEffect(() => {
    if (isPanelOpen) setView('cart');
  }, [isPanelOpen]);

  // Animation variants
  const mobileVariants = {
    initial: { x: '100%' },
    animate: { x: 0 },
    exit: { x: '100%' },
  };
  const desktopVariants = {
    initial: { opacity: 0, scale: 0.92, y: 16 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.92, y: 16 },
  };
  const variants = isDesktop ? desktopVariants : mobileVariants;


  return (
    <AnimatePresence>
      {isPanelOpen && (
        <>
          {/* Backdrop — stronger blur on desktop for modal feel */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsPanelOpen(false)}
            className="fixed inset-0 bg-blue-950/40 backdrop-blur-md z-[150]"
          />

          {/* Mobile: slide from right | Desktop: centered modal */}
          <motion.div
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[160] flex flex-col lg:top-1/2 lg:left-1/2 lg:right-auto lg:translate-x-[-50%] lg:translate-y-[-50%] lg:h-auto lg:max-h-[88vh] lg:w-[580px] lg:max-w-[90vw] lg:rounded-3xl lg:overflow-hidden"
          >
            {/* Header */}
            <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-950">
                  <ShoppingBag size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-black text-blue-950 tracking-tight">
                    {view === 'cart' ? 'Mon Devis' : 'Finaliser la Demande'}
                  </h2>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{itemCount} {itemCount > 1 ? 'articles' : 'article'}</p>
                </div>
              </div>
              <button 
                onClick={() => setIsPanelOpen(false)}
                className="p-3 hover:bg-gray-100 rounded-2xl transition-colors text-gray-400 hover:text-blue-950"
              >
                <X size={24} />
              </button>
            </div>

            {/* List Content */}
            <div className="grow overflow-y-auto p-8">
              {view === 'cart' ? (
                <div className="space-y-6">
                  {items.length === 0 ? (
                    <div className="h-full py-20 flex flex-col items-center justify-center text-center space-y-6 opacity-60">
                      <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center text-gray-300">
                        <ShoppingBag size={40} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-blue-950">Votre liste est vide</h3>
                        <p className="text-sm text-gray-400 max-w-[200px] mx-auto">Explorez notre catalogue pour ajouter des produits à votre devis.</p>
                      </div>
                    </div>
                  ) : (
                    items.map((item: CartItem) => (
                      <motion.div 
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={item.id}
                        className="flex items-center space-x-6 group"
                      >
                        <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-gray-100 border border-gray-100 shrink-0">
                          <Image 
                            src={item.image} 
                            alt={item.name} 
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500" 
                          />
                        </div>
                        <div className="grow">
                          <h4 className="font-bold text-blue-950 text-base leading-tight mb-1">{item.name}</h4>
                          <p className="text-xs font-semibold text-gray-400 uppercase tracking-tighter">{item.category}</p>
                          <div className="flex items-center mt-3 bg-gray-50 rounded-xl p-1 border border-gray-100">
                            <button 
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              className="w-10 h-10 flex items-center justify-center bg-white hover:bg-blue-100 text-blue-950 rounded-lg transition-colors shadow-sm"
                            >
                              <Minus size={16} />
                            </button>
                            <input 
                              type="text"
                              inputMode="numeric"
                              value={item.quantity === 0 ? '' : item.quantity}
                              onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, '');
                                if (val === '') {
                                  updateQuantity(item.id, 0);
                                } else {
                                  const num = parseInt(val);
                                  if (!isNaN(num)) {
                                    updateQuantity(item.id, num);
                                  }
                                }
                              }}
                              onBlur={() => {
                                if (item.quantity < 1) {
                                  updateQuantity(item.id, 1);
                                }
                              }}
                              className="w-12 text-center text-sm font-black text-blue-950 bg-transparent outline-none"
                            />
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-10 h-10 flex items-center justify-center bg-white hover:bg-blue-100 text-blue-950 rounded-lg transition-colors shadow-sm"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </div>
                        <button 
                          onClick={() => removeFromQuote(item.id)}
                          className="min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                        >
                          <Trash2 size={20} />
                        </button>
                      </motion.div>
                    ))
                  )}
                </div>
              ) : (
                <QuoteForm 
                  onSuccess={() => setIsPanelOpen(false)}
                  onCancel={() => setView('cart')}
                />
              )}
            </div>

            {/* Footer Actions (Only shown in cart view) */}
            {view === 'cart' && (
              <div className="px-8 pt-8 pb-[max(2rem,env(safe-area-inset-bottom))] border-t border-gray-100 bg-gray-50/50 space-y-4">
                {items.length > 0 && (
                  <button 
                    onClick={clearQuote}
                    className="w-full min-h-[44px] text-[10px] font-black text-gray-400 hover:text-red-500 uppercase tracking-widest transition-colors mb-2"
                  >
                    Vider la sélection
                  </button>
                )}
                
                <button 
                  onClick={() => setView('checkout')}
                  disabled={items.length === 0}
                  className={cn(
                    "w-full py-6 rounded-4xl font-black text-lg transition-all flex items-center justify-center space-x-3 shadow-xl",
                    items.length > 0 
                    ? "bg-blue-950 text-white hover:bg-amber-500 hover:shadow-amber-500/20 active:scale-[0.98]" 
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  )}
                >
                  <span>Chiffrer mon Projet</span>
                  <ChevronRight size={20} />
                </button>
                
                <p className="text-[10px] text-center text-gray-400 font-bold uppercase tracking-tight">
                  Demande gratuite & réponse sous 24h.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default QuotePanel;
