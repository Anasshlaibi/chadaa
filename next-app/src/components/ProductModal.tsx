import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Info, CheckCircle2, Plus, Minus } from 'lucide-react';
import { type Product } from '../data/products';
import Image from 'next/image';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuantity(1); // Reset quantity when modal closes instead of opens
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!product) return null;

  const handleIncrement = () => setQuantity(q => q + 1);
  const handleDecrement = () => setQuantity(q => Math.max(1, q - 1));

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-blue-950/40 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row h-full max-h-[85vh] md:max-h-[700px]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-10 min-w-[44px] min-h-[44px] flex items-center justify-center bg-white/80 backdrop-blur-md rounded-full text-gray-400 hover:text-blue-950 hover:bg-white shadow-sm transition-all"
            >
              <X size={24} />
            </button>

            {/* Left: Image Gallery (Simplified) */}
            <div className="relative md:w-1/2 bg-gray-50 flex items-center justify-center overflow-hidden group">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* Image Badges */}
              <div className="absolute top-4 right-4 px-3 py-1 bg-amber-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg z-10">
                100% RH
              </div>
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 w-full flex justify-center">
                <span className="px-4 py-2 rounded-full bg-blue-950/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest shadow-lg">
                  Vue Haute Résolution
                </span>
              </div>
            </div>

            {/* Right: Info Content */}
            <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto custom-scrollbar flex flex-col pb-40 md:pb-12">
              <div className="mb-8">
                <div className="flex items-center space-x-2 text-amber-600 mb-4 font-bold text-xs uppercase tracking-widest">
                  <span className="p-1.5 bg-amber-50 rounded-lg"><Shield size={16} /></span>
                  <span>Produit Certifié Chada Alyasmin</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-blue-950 tracking-tight mb-2">
                  {product.name}
                </h2>
                <p className="text-lg font-bold text-gray-400 uppercase tracking-widest">
                  {product.category}
                </p>
              </div>

              <div className="space-y-8 grow">
                <div>
                  <h4 className="text-sm font-black text-blue-950 uppercase tracking-widest mb-4 flex items-center">
                    <Info size={16} className="mr-2 text-amber-500" />
                    Description Technique
                  </h4>
                  <p className="text-gray-500 text-lg leading-relaxed font-medium">
                    {product.description} Notre expertise garantit une installation parfaite et une durabilité exceptionnelle pour tous vos projets de second œuvre au Maroc.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Disponibilité</span>
                    <span className="flex items-center font-bold">
                      {product.stockStatus === 'En Rupture' ? (
                        <>
                          <X size={16} className="text-red-500 mr-2" />
                          <span className="text-red-600">{product.stockStatus}</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 size={16} className="text-green-500 mr-2" />
                          <span className="text-blue-950">{product.stockStatus}</span>
                        </>
                      )}
                    </span>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Origine</span>
                    <span className="text-blue-950 font-bold">Standard Pro</span>
                  </div>
                </div>

                <div className="pt-6">
                  <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Quantité</span>
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center bg-gray-50 rounded-2xl p-1 border border-gray-100">
                      <button 
                        onClick={handleDecrement}
                        className="w-10 h-10 flex items-center justify-center text-blue-950 hover:bg-white rounded-xl transition-all shadow-sm"
                      >
                        <Minus size={18} />
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
                        className="w-20 h-10 bg-white border border-gray-200 rounded-xl text-center font-black text-blue-950 text-xl outline-none focus:border-amber-500 transition-colors"
                        placeholder="1"
                      />
                      <button 
                        onClick={handleIncrement}
                        className="w-10 h-10 flex items-center justify-center text-blue-950 hover:bg-white rounded-xl transition-all shadow-sm"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Area - DESKTOP ONLY */}
              <div className="hidden md:flex mt-12 pt-8 border-t border-gray-100 flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => onAddToCart(product, Math.max(1, quantity))}
                  className="grow py-5 bg-blue-950 text-white rounded-2xl font-black text-lg shadow-xl hover:bg-amber-600 hover:-translate-y-1 transition-all flex items-center justify-center space-x-3"
                >
                  <Plus size={22} />
                  <span>Ajouter au Devis</span>
                </button>
              </div>
            </div>

            {/* Sticky CTA - MOBILE ONLY */}
            <div className="md:hidden fixed bottom-24 left-4 right-4 p-4 bg-white/95 backdrop-blur-md border border-gray-100 rounded-3xl z-[110] flex items-center gap-3 shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
              <button 
                onClick={() => onAddToCart(product, Math.max(1, quantity))}
                className="w-full min-h-[44px] py-4 bg-blue-950 text-white rounded-2xl font-black text-sm shadow-xl flex items-center justify-center space-x-3 active:scale-95 transition-transform"
              >
                <Plus size={20} />
                <span>Ajouter au Devis</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;
