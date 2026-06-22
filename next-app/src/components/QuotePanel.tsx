"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ChevronRight, ShoppingBag, Plus, Minus, ArrowLeft, Package } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { type CartItem } from '../types/cart';
import { cn } from '../lib/utils';
import QuoteForm from './QuoteForm';
import Image from 'next/image';

const QuotePanel: React.FC = () => {
  const { items, isPanelOpen, setIsPanelOpen, removeFromQuote, updateQuantity, clearQuote, itemCount } = useCart();
  const [view, setView] = useState<'cart' | 'checkout'>('cart');
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (isPanelOpen) setView('cart');
  }, [isPanelOpen]);

  // Lock body scroll when open
  useEffect(() => {
    if (isPanelOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isPanelOpen]);

  const mobileVariants = {
    initial: { x: '100%' },
    animate: { x: 0 },
    exit: { x: '100%' },
  };
  const desktopVariants = {
    initial: { opacity: 0, scale: 0.94, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.94, y: 20 },
  };
  const variants = isDesktop ? desktopVariants : mobileVariants;

  return (
    <AnimatePresence>
      {isPanelOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsPanelOpen(false)}
            className="fixed inset-0 z-[150] bg-blue-950/50 backdrop-blur-lg"
          />

          {/* ── DESKTOP: Two-column centered modal ── */}
          {isDesktop ? (
            <motion.div
              variants={desktopVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ type: 'spring', damping: 28, stiffness: 240 }}
              className="fixed z-[160] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[860px] max-w-[92vw] max-h-[88vh] rounded-3xl overflow-hidden shadow-[0_32px_80px_-12px_rgba(15,23,42,0.45)] flex"
            >
              {/* Left panel — Cart */}
              <div className="w-[360px] shrink-0 bg-blue-950 flex flex-col text-white">
                {/* Left header */}
                <div className="p-8 pb-6 border-b border-white/10">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center">
                        <ShoppingBag size={20} />
                      </div>
                      <div>
                        <h2 className="text-lg font-black tracking-tight">Mon Devis</h2>
                        <p className="text-[11px] font-bold text-white/50 uppercase tracking-widest">
                          {itemCount} {itemCount > 1 ? 'articles' : 'article'}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsPanelOpen(false)}
                      className="w-10 h-10 rounded-2xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white/60 hover:text-white"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>

                {/* Left — Product list */}
                <div className="grow overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20">
                  {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full py-16 text-center opacity-40 space-y-4">
                      <Package size={40} />
                      <div>
                        <p className="font-bold text-sm">Aucun produit</p>
                        <p className="text-xs text-white/60 mt-1">Explorez le catalogue pour ajouter des produits.</p>
                      </div>
                    </div>
                  ) : (
                    items.map((item: CartItem) => (
                      <motion.div
                        layout
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex items-center gap-4 bg-white/5 hover:bg-white/10 rounded-2xl p-3 transition-colors group"
                      >
                        <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-white/10 shrink-0">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="grow min-w-0">
                          <p className="text-[11px] font-black text-white leading-tight truncate">{item.name}</p>
                          <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider truncate">{item.category}</p>
                          {/* Qty control */}
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              className="w-6 h-6 rounded-lg bg-white/10 hover:bg-amber-500 flex items-center justify-center transition-colors"
                            >
                              <Minus size={10} />
                            </button>
                            <span className="text-xs font-black w-6 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 rounded-lg bg-white/10 hover:bg-amber-500 flex items-center justify-center transition-colors"
                            >
                              <Plus size={10} />
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromQuote(item.id)}
                          className="w-8 h-8 rounded-xl text-white/20 hover:text-red-400 hover:bg-red-500/10 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 size={14} />
                        </button>
                      </motion.div>
                    ))
                  )}
                </div>

                {/* Left footer */}
                {items.length > 0 && (
                  <div className="p-6 border-t border-white/10">
                    <button
                      onClick={clearQuote}
                      className="w-full text-[10px] font-black text-white/30 hover:text-red-400 uppercase tracking-widest transition-colors py-2"
                    >
                      Vider la sélection
                    </button>
                  </div>
                )}
              </div>

              {/* Right panel — Form / CTA */}
              <div className="flex-1 bg-white flex flex-col">
                <AnimatePresence mode="wait">
                  {view === 'cart' ? (
                    <motion.div
                      key="cta"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col h-full"
                    >
                      {/* Right header */}
                      <div className="p-8 pb-0">
                        <p className="text-[10px] font-black text-amber-500 uppercase tracking-[0.3em] mb-2">Demande gratuite</p>
                        <h3 className="text-2xl font-black text-blue-950 tracking-tight leading-tight">
                          Obtenez votre devis<br />
                          <span className="text-gray-300">en moins de 24h.</span>
                        </h3>
                      </div>

                      {/* Trust badges */}
                      <div className="px-8 pt-6 space-y-3">
                        {[
                          { icon: '⚡', text: 'Réponse sous 24h garantie' },
                          { icon: '🔒', text: 'Devis confidentiel & sans engagement' },
                          { icon: '🇲🇦', text: 'Livraison partout au Maroc' },
                        ].map((badge) => (
                          <div key={badge.text} className="flex items-center gap-3 text-sm text-gray-500 font-medium">
                            <span className="text-base">{badge.icon}</span>
                            <span>{badge.text}</span>
                          </div>
                        ))}
                      </div>

                      {/* Spacer */}
                      <div className="grow" />

                      {/* CTA button */}
                      <div className="p-8 pt-0">
                        <button
                          onClick={() => setView('checkout')}
                          disabled={items.length === 0}
                          className={cn(
                            "w-full py-5 rounded-2xl font-black text-base transition-all flex items-center justify-center gap-3 shadow-xl",
                            items.length > 0
                              ? "bg-blue-950 text-white hover:bg-amber-500 hover:shadow-amber-500/30 active:scale-[0.98]"
                              : "bg-gray-100 text-gray-400 cursor-not-allowed"
                          )}
                        >
                          <span>Chiffrer mon Projet</span>
                          <ChevronRight size={20} />
                        </button>
                        <p className="text-[10px] text-center text-gray-400 font-bold uppercase tracking-widest mt-4">
                          Aucun paiement requis
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col h-full"
                    >
                      {/* Form header */}
                      <div className="p-8 pb-4 border-b border-gray-100 flex items-center gap-4">
                        <button
                          onClick={() => setView('cart')}
                          className="w-10 h-10 rounded-2xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors text-blue-950"
                        >
                          <ArrowLeft size={18} />
                        </button>
                        <div>
                          <h3 className="text-lg font-black text-blue-950 tracking-tight">Finaliser la Demande</h3>
                          <p className="text-xs text-gray-400 font-bold">Vos informations de contact</p>
                        </div>
                      </div>
                      <div className="grow overflow-y-auto p-8">
                        <QuoteForm
                          onSuccess={() => setIsPanelOpen(false)}
                          onCancel={() => setView('cart')}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            /* ── MOBILE: Full-height side panel ── */
            <motion.div
              variants={mobileVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[160] flex flex-col"
            >
              {/* Mobile Header */}
              <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
                <div className="flex items-center gap-3">
                  {view === 'checkout' && (
                    <button
                      onClick={() => setView('cart')}
                      className="w-10 h-10 rounded-2xl bg-gray-100 flex items-center justify-center text-blue-950"
                    >
                      <ArrowLeft size={18} />
                    </button>
                  )}
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-950">
                    <ShoppingBag size={20} />
                  </div>
                  <div>
                    <h2 className="text-base font-black text-blue-950 tracking-tight">
                      {view === 'cart' ? 'Mon Devis' : 'Finaliser'}
                    </h2>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      {itemCount} {itemCount > 1 ? 'articles' : 'article'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsPanelOpen(false)}
                  className="w-10 h-10 rounded-2xl hover:bg-gray-100 flex items-center justify-center transition-colors text-gray-400"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Mobile content */}
              <div className="grow overflow-y-auto p-6">
                {view === 'cart' ? (
                  <div className="space-y-4">
                    {items.length === 0 ? (
                      <div className="py-20 flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                        <ShoppingBag size={40} className="text-gray-300" />
                        <div>
                          <h3 className="font-bold text-blue-950">Votre liste est vide</h3>
                          <p className="text-sm text-gray-400 mt-1">Explorez notre catalogue.</p>
                        </div>
                      </div>
                    ) : (
                      items.map((item: CartItem) => (
                        <motion.div
                          layout
                          key={item.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-4 group"
                        >
                          <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-gray-100 shrink-0">
                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                          </div>
                          <div className="grow min-w-0">
                            <h4 className="font-bold text-blue-950 text-sm leading-tight truncate">{item.name}</h4>
                            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider truncate">{item.category}</p>
                            <div className="flex items-center mt-2 gap-2 bg-gray-50 rounded-xl p-1 w-fit border border-gray-100">
                              <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm hover:bg-blue-50 transition-colors">
                                <Minus size={12} />
                              </button>
                              <span className="w-8 text-center text-sm font-black text-blue-950">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm hover:bg-blue-50 transition-colors">
                                <Plus size={12} />
                              </button>
                            </div>
                          </div>
                          <button onClick={() => removeFromQuote(item.id)} className="w-9 h-9 flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                            <Trash2 size={16} />
                          </button>
                        </motion.div>
                      ))
                    )}
                  </div>
                ) : (
                  <QuoteForm onSuccess={() => setIsPanelOpen(false)} onCancel={() => setView('cart')} />
                )}
              </div>

              {/* Mobile footer */}
              {view === 'cart' && (
                <div className="px-6 pt-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] border-t border-gray-100 bg-gray-50/50 space-y-3">
                  {items.length > 0 && (
                    <button onClick={clearQuote} className="w-full text-[10px] font-black text-gray-400 hover:text-red-500 uppercase tracking-widest transition-colors py-1">
                      Vider la sélection
                    </button>
                  )}
                  <button
                    onClick={() => setView('checkout')}
                    disabled={items.length === 0}
                    className={cn(
                      "w-full py-5 rounded-3xl font-black text-base transition-all flex items-center justify-center gap-3 shadow-xl",
                      items.length > 0
                        ? "bg-blue-950 text-white hover:bg-amber-500 hover:shadow-amber-500/20 active:scale-[0.98]"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    )}
                  >
                    <span>Chiffrer mon Projet</span>
                    <ChevronRight size={20} />
                  </button>
                  <p className="text-[10px] text-center text-gray-400 font-bold uppercase tracking-tight">
                    Demande gratuite · Réponse sous 24h
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
};

export default QuotePanel;
