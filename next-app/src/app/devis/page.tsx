"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ChevronRight,
  ArrowLeft,
  PackageOpen,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../../hooks/useCart';
import { type CartItem } from '../../types/cart';
import QuoteForm from '../../components/QuoteForm';

export default function DevisPage() {
  const {
    items,
    itemCount,
    removeFromQuote,
    updateQuantity,
    clearQuote,
  } = useCart();

  const [view, setView] = useState<'cart' | 'checkout'>('cart');

  return (
    <div className="min-h-[100dvh] bg-gray-50 flex flex-col">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-4 py-3 flex items-center gap-4">
        {view === 'checkout' ? (
          <button
            onClick={() => setView('cart')}
            aria-label="Retour au devis"
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors text-blue-950"
          >
            <ArrowLeft size={22} />
          </button>
        ) : (
          <Link
            href="/"
            aria-label="Retour à l'accueil"
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors text-blue-950"
          >
            <ArrowLeft size={22} />
          </Link>
        )}

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-950">
            <ShoppingBag size={20} />
          </div>
          <div>
            <h1 className="text-base font-black text-blue-950 leading-tight">
              {view === 'cart' ? 'Mon Devis' : 'Finaliser la Demande'}
            </h1>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              {itemCount} {itemCount > 1 ? 'articles' : 'article'}
            </p>
          </div>
        </div>
      </header>

      {/* ── Scrollable Body ─────────────────────────────────────────── */}
      <main className="flex-1 overflow-y-auto pb-32">
        <AnimatePresence mode="wait">
          {view === 'cart' ? (
            <motion.div
              key="cart"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.2 }}
              className="max-w-lg mx-auto px-4 py-6 space-y-4"
            >
              {items.length === 0 ? (
                /* ── Empty State ────────────────────────────────────── */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-24 text-center space-y-6"
                >
                  <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center text-gray-300">
                    <PackageOpen size={48} />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-blue-950 mb-2">Votre liste est vide</h2>
                    <p className="text-sm text-gray-400 max-w-[220px] mx-auto">
                      Explorez notre catalogue pour ajouter des produits à votre devis.
                    </p>
                  </div>
                  <Link
                    href="/#catalog"
                    className="min-h-[44px] inline-flex items-center gap-2 px-6 py-3 bg-blue-950 text-white text-sm font-black rounded-2xl hover:bg-amber-500 transition-colors"
                  >
                    Voir le catalogue
                    <ChevronRight size={16} />
                  </Link>
                </motion.div>
              ) : (
                /* ── Cart Items ─────────────────────────────────────── */
                <>
                  {items.map((item: CartItem) => (
                    <motion.div
                      layout
                      key={item.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12, height: 0 }}
                      className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 flex items-center gap-4"
                    >
                      {/* Thumbnail */}
                      <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-gray-100 shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Name + category */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-black text-blue-950 text-sm leading-tight truncate">
                          {item.name}
                        </h3>
                        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-tight mt-0.5">
                          {item.category}
                        </p>

                        {/* Quantity stepper */}
                        <div className="mt-3 inline-flex items-center bg-gray-50 rounded-xl border border-gray-100 p-0.5">
                          <button
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            aria-label="Diminuer la quantité"
                            className="min-w-[44px] min-h-[44px] flex items-center justify-center bg-white hover:bg-blue-50 text-blue-950 rounded-lg transition-colors shadow-sm"
                          >
                            <Minus size={14} />
                          </button>
                          <input
                            type="text"
                            inputMode="numeric"
                            aria-label="Quantité"
                            value={item.quantity === 0 ? '' : item.quantity}
                            onChange={(e) => {
                              const val = e.target.value.replace(/\D/g, '');
                              if (val === '') {
                                updateQuantity(item.id, 0);
                              } else {
                                const num = parseInt(val);
                                if (!isNaN(num)) updateQuantity(item.id, num);
                              }
                            }}
                            onBlur={() => {
                              if (item.quantity < 1) updateQuantity(item.id, 1);
                            }}
                            className="w-10 text-center text-sm font-black text-blue-950 bg-transparent outline-none"
                          />
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            aria-label="Augmenter la quantité"
                            className="min-w-[44px] min-h-[44px] flex items-center justify-center bg-white hover:bg-blue-50 text-blue-950 rounded-lg transition-colors shadow-sm"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeFromQuote(item.id)}
                        aria-label={`Supprimer ${item.name}`}
                        className="min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all shrink-0"
                      >
                        <Trash2 size={18} />
                      </button>
                    </motion.div>
                  ))}

                  {/* Clear all */}
                  <button
                    onClick={clearQuote}
                    className="w-full min-h-[44px] text-[10px] font-black text-gray-400 hover:text-red-500 uppercase tracking-widest transition-colors mt-2"
                  >
                    Vider la sélection
                  </button>
                </>
              )}
            </motion.div>
          ) : (
            /* ── Checkout view ──────────────────────────────────────── */
            <motion.div
              key="checkout"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.2 }}
              className="max-w-lg mx-auto px-4 py-6"
            >
              <QuoteForm
                onSuccess={() => {
                  // Panel closes itself after success; stay on page but reset view
                  setView('cart');
                }}
                onCancel={() => setView('cart')}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* ── Fixed Bottom CTA (cart view only) ──────────────────────── */}
      <AnimatePresence>
        {view === 'cart' && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed bottom-0 left-0 right-0 z-20 bg-white/90 backdrop-blur-xl border-t border-gray-100 px-4 pt-4"
            style={{ paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom))' }}
          >
            <div className="max-w-lg mx-auto space-y-2">
              <button
                onClick={() => setView('checkout')}
                disabled={items.length === 0}
                className={[
                  'w-full min-h-[56px] rounded-2xl font-black text-base transition-all flex items-center justify-center gap-3 shadow-xl active:scale-[0.98]',
                  items.length > 0
                    ? 'bg-blue-950 text-white hover:bg-amber-500 hover:shadow-amber-500/20'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed',
                ].join(' ')}
              >
                <span>Passer à l&apos;étape suivante</span>
                <ChevronRight size={20} />
              </button>
              <p className="text-[10px] text-center text-gray-400 font-bold uppercase tracking-tight pb-1">
                Demande gratuite · Réponse sous 24h
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
