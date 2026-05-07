import React, { useState } from 'react';
import { type Product } from '../data/products';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Check, Plus } from 'lucide-react';
import { cn } from '../lib/utils';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
  onOpenModal: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenModal, onAddToCart }) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-white border border-gray-100 overflow-hidden transition-all duration-300 flex flex-col h-full"
    >
      {/* Top Badges */}
      <div className="absolute top-2 left-2 right-2 flex justify-between items-start z-10 pointer-events-none">
        <div className="flex flex-col">
          <div className="relative w-5 h-5">
            <Image src="/logo.png" alt="Chada" fill className="object-contain" />
          </div>
        </div>
      </div>

      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-white p-4">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain transform group-hover:scale-105 transition-transform duration-500 p-4"
          sizes="(max-width: 768px) 50vw, 33vw"
        />
        
        {/* Mobile View Toggle */}
        <button 
          onClick={() => onOpenModal(product)}
          className="absolute inset-0 z-0"
        >
          <span className="sr-only">Voir détails</span>
        </button>
      </div>

      {/* Product Info */}
      <div className="px-4 pb-4 sm:px-6 sm:pb-6 grow flex flex-col">
        {/* Trust Indicator Stars */}
        <div className="flex space-x-0.5 mb-2">
          {[1,2,3,4,5].map(i => (
            <span key={i} className="text-gray-300 text-[10px] sm:text-xs">★</span>
          ))}
        </div>

        <div className="flex justify-between items-start mb-1">
          <button 
            onClick={() => onOpenModal(product)}
            className="text-left"
          >
            <h3 className="text-sm sm:text-lg font-black text-blue-950 leading-tight group-hover:text-amber-600 transition-colors line-clamp-2">
              {product.name}
            </h3>
          </button>
        </div>
        
        <p className="text-gray-400 text-[9px] sm:text-[11px] font-black uppercase tracking-widest mb-4">
          {product.category}
        </p>

        {/* B2B Status Marker */}
        <div className="flex items-center space-x-1.5 mb-6">
          <span className={cn(
            "w-1.5 h-1.5 rounded-full",
            product.stockStatus === 'En Rupture' ? "bg-red-500" : "bg-blue-500"
          )}></span>
          <span className={cn(
            "text-[9px] font-bold uppercase tracking-tighter",
            product.stockStatus === 'En Rupture' ? "text-red-600" : "text-gray-500"
          )}>
            {product.stockStatus === 'En Stock' ? 'Disponibilité Immédiate' : 
             product.stockStatus === 'En Rupture' ? 'Rupture de Stock' : 
             product.stockStatus}
          </span>
        </div>

        {/* Action Area: Pure B2B */}
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
          <button 
            onClick={() => onOpenModal(product)}
            className="min-h-[44px] flex items-center text-[10px] font-black text-blue-950/40 hover:text-blue-950 uppercase tracking-widest transition-colors"
          >
            Détails
          </button>
          
          <button 
            onClick={handleAddToCart}
            disabled={isAdded || product.stockStatus === 'En Rupture'}
            className={cn(
              "flex items-center justify-center space-x-2 px-4 py-2 min-h-[44px] rounded-xl font-black text-[10px] sm:text-xs transition-all duration-300 shadow-sm",
              product.stockStatus === 'En Rupture'
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : isAdded 
                  ? "bg-green-50 text-green-600" 
                  : "bg-blue-950 text-white hover:bg-amber-600 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
            )}
          >
            <AnimatePresence mode="wait">
              {product.stockStatus === 'En Rupture' ? (
                <motion.div key="rupture" className="flex items-center space-x-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <span>Indisponible</span>
                </motion.div>
              ) : isAdded ? (
                <motion.div key="check" className="flex items-center space-x-2" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                  <Check size={14} />
                  <span>Ajouté</span>
                </motion.div>
              ) : (
                <motion.div key="cta" className="flex items-center space-x-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Plus size={14} />
                  <span>Devis</span>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
