import React, { useState } from 'react';
import Link from 'next/link';
import { type Product } from '../data/products';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Plus, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';
import Image from 'next/image';
import { formatPriceDisplay } from '../lib/products';

interface ProductCardProps {
  product: Product;
  onOpenModal: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenModal, onAddToCart }) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const priceInfo = formatPriceDisplay(product.pricing);
  const productSlug = product.slug || product.id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-white border border-gray-100 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-gray-200 flex flex-col h-full"
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-slate-50 p-6 flex items-center justify-center">
        <Image
          src={product.image}
          alt={`${product.name} - Matériau de second œuvre Chada Alyasmin Maroc`}
          fill
          className="object-contain transform group-hover:scale-105 transition-transform duration-500 p-4 mix-blend-multiply"
          sizes="(max-width: 768px) 50vw, 33vw"
        />

        {product.brand && (
          <span className="absolute top-3 left-3 px-2.5 py-1 bg-blue-950 text-white text-[9px] font-black uppercase tracking-widest rounded-lg shadow-sm">
            {product.brand}
          </span>
        )}

        <span
          className={cn(
            "absolute top-3 right-3 px-2.5 py-1 text-[9px] font-black uppercase tracking-widest rounded-lg shadow-xs",
            product.stockStatus === 'En Rupture'
              ? "bg-red-50 text-red-700 border border-red-100"
              : "bg-emerald-50 text-emerald-700 border border-emerald-100"
          )}
        >
          {product.stockStatus}
        </span>

        {/* Link overlay */}
        <Link
          href={`/products/${productSlug}`}
          className="absolute inset-0 z-0"
        >
          <span className="sr-only">Voir {product.name}</span>
        </Link>
      </div>

      {/* Product Info */}
      <div className="p-5 sm:p-6 grow flex flex-col">
        <p className="text-amber-600 text-[10px] font-black uppercase tracking-wider mb-1">
          {product.category}
        </p>

        <h3 className="text-sm sm:text-base font-black text-blue-950 leading-snug mb-2 group-hover:text-amber-600 transition-colors line-clamp-2">
          <Link href={`/products/${productSlug}`}>
            {product.name}
          </Link>
        </h3>

        {/* Price Display */}
        <div className="mb-4">
          <span className="text-[10px] text-amber-600 font-bold block uppercase tracking-wider">
            Tarif Professionnel
          </span>
          <span className="text-xs sm:text-sm font-black text-blue-950">
            {priceInfo.display}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100 gap-2">
          <button
            onClick={() => onOpenModal(product)}
            className="text-[11px] font-bold text-gray-500 hover:text-blue-950 transition-colors py-2 px-1"
          >
            Aperçu
          </button>

          <div className="flex items-center gap-1.5">
            <Link
              href={`/products/${productSlug}`}
              className="p-2 text-gray-400 hover:text-blue-950 transition-colors"
              title="Fiche technique complète"
            >
              <ArrowRight size={16} />
            </Link>

            <button
              onClick={handleAddToCart}
              disabled={isAdded || product.stockStatus === 'En Rupture'}
              className={cn(
                "flex items-center justify-center space-x-1.5 px-3 py-2 rounded-xl font-black text-[10px] sm:text-xs transition-all duration-300 shadow-xs cursor-pointer",
                product.stockStatus === 'En Rupture'
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : isAdded
                    ? "bg-emerald-500 text-white"
                    : "bg-blue-950 text-white hover:bg-amber-500 hover:text-blue-950 active:scale-95"
              )}
            >
              <AnimatePresence mode="wait">
                {product.stockStatus === 'En Rupture' ? (
                  <span key="rupture">Indispo</span>
                ) : isAdded ? (
                  <motion.div key="check" className="flex items-center space-x-1" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    <Check size={13} />
                    <span>Ajouté</span>
                  </motion.div>
                ) : (
                  <motion.div key="cta" className="flex items-center space-x-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Plus size={13} />
                    <span>Devis</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
