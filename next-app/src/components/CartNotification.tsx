"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ShoppingBag } from 'lucide-react';
import { useCart } from '../hooks/useCart';

const CartNotification: React.FC = () => {
  const { notification, setIsPanelOpen } = useCart();

  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
          className="fixed bottom-28 lg:bottom-10 left-1/2 -translate-x-1/2 z-[200] w-[calc(100%-3rem)] max-w-sm"
        >
          <div className="bg-blue-950 text-white p-4 rounded-3xl shadow-2xl border border-white/10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500 flex items-center justify-center text-white shadow-lg shrink-0">
                <CheckCircle size={20} />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-tight leading-none mb-1">Produit Ajouté</p>
                <p className="text-[10px] font-bold text-blue-200 line-clamp-1">{notification}</p>
              </div>
            </div>
            
            <button
              onClick={() => setIsPanelOpen(true)}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors flex items-center gap-2"
            >
              <ShoppingBag size={14} />
              <span>Voir</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartNotification;
