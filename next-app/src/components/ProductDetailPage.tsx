"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { type Product } from '../data/products';
import {
  ChevronRight,
  ShoppingBag,
  ShieldCheck,
  MapPin,
  Truck,
  Plus,
  Minus,
  X,
  Calendar,
  Layers,
  ArrowRight,
  MessageSquare
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../hooks/useCart';
import { cn } from '../lib/utils';
import Image from 'next/image';
import { formatPriceDisplay } from '../lib/products';

interface ProductDetailPageProps {
  product: Product;
  relatedProducts?: Product[];
  categoryGroupSlug?: string;
}

export default function ProductDetailPage({
  product,
  relatedProducts = [],
  categoryGroupSlug
}: ProductDetailPageProps) {
  const { addToQuote } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product.image);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product.id]);

  const handleIncrement = () => setQuantity(q => q + 1);
  const handleDecrement = () => setQuantity(q => Math.max(1, q - 1));

  const priceInfo = formatPriceDisplay(product.pricing);

  const imagesList = product.thumbnails && product.thumbnails.length > 0
    ? [product.image, ...product.thumbnails.filter(t => t !== product.image)]
    : [product.image];

  const whatsappMessage = encodeURIComponent(
    `Bonjour Chada Alyasmin, je souhaite un devis pour le produit : ${product.name} (REF: ${product.id.toUpperCase()}) - Quantité: ${quantity}`
  );

  return (
    <div key={product.id} className="min-h-screen bg-white pb-32 pt-20 lg:pt-28 font-sans">
      {/* Visible Breadcrumbs Header */}
      <div className="bg-slate-50 border-b border-gray-100 py-3">
        <div className="max-w-[1920px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 2xl:px-20">
          <nav aria-label="Fil d'Ariane" className="flex items-center space-x-2 text-xs font-medium text-gray-500 overflow-x-auto whitespace-nowrap py-1">
            <Link href="/" className="hover:text-amber-600 transition-colors">
              Accueil
            </Link>
            <ChevronRight size={14} className="text-gray-400 shrink-0" />
            <Link href="/products" className="hover:text-amber-600 transition-colors">
              Produits
            </Link>
            {categoryGroupSlug && (
              <>
                <ChevronRight size={14} className="text-gray-400 shrink-0" />
                <Link href={`/products/${categoryGroupSlug}`} className="hover:text-amber-600 transition-colors">
                  {product.category}
                </Link>
              </>
            )}
            <ChevronRight size={14} className="text-gray-400 shrink-0" />
            <span className="text-blue-950 font-bold truncate max-w-[200px] sm:max-w-xs md:max-w-md">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-[1920px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 2xl:px-20 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20">
          {/* Left Column: Image Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="relative w-full aspect-square bg-slate-50 rounded-3xl lg:rounded-[3rem] flex items-center justify-center p-8 lg:p-12 border border-gray-100 shadow-sm overflow-hidden group">
              <Image
                src={activeImage}
                alt={`${product.name} - Matériau de second œuvre Chada Alyasmin Maroc`}
                fill
                className="object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105 p-8 lg:p-12"
                priority={true}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              {product.brand && (
                <div className="absolute top-6 left-6 px-3.5 py-1.5 bg-blue-950 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-md z-10">
                  {product.brand}
                </div>
              )}

              <div className="absolute top-6 right-6 px-3.5 py-1.5 bg-amber-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-md z-10">
                100% Conforme
              </div>
            </div>

            {imagesList.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {imagesList.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(img)}
                    className={cn(
                      "relative aspect-square rounded-2xl bg-gray-50 border p-2 overflow-hidden transition-all",
                      activeImage === img ? "border-amber-500 ring-2 ring-amber-500/20" : "border-gray-200 hover:border-gray-300"
                    )}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} vue ${i + 1}`}
                      fill
                      className="object-contain mix-blend-multiply p-2"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Right Column: Technical & B2B Content */}
          <div className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-amber-600">
                  {product.category}
                </p>
                <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">
                  REF: {product.ref || product.id.toUpperCase()}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-blue-950 tracking-tight leading-tight mb-4">
                {product.name}
              </h1>

              {/* Status & Price Highlight Section */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <div className={cn(
                  "flex items-center space-x-1.5 px-3 py-1 rounded-full border text-xs font-bold",
                  product.stockStatus === 'En Rupture'
                    ? "bg-red-50 border-red-200 text-red-700"
                    : "bg-emerald-50 border-emerald-200 text-emerald-700"
                )}>
                  {product.stockStatus === 'En Rupture' ? (
                    <X size={14} className="text-red-500" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  )}
                  <span>{product.stockStatus}</span>
                </div>

                {/* Price Display */}
                <div className="px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-950 font-black text-sm sm:text-base inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                  {priceInfo.display}
                </div>
              </div>

              {/* B2B Pricing Guarantee Badge */}
              <div className="flex items-center space-x-2 text-xs text-slate-600 mb-6 bg-slate-100/80 border border-slate-200/60 px-3.5 py-2 rounded-xl">
                <ShieldCheck size={15} className="text-amber-600 shrink-0" />
                <span>
                  <strong>Tarifs dégressifs pour professionnels :</strong> Chiffrage proforma personnalisé sous 24h selon volume de chantier.
                </span>
              </div>

              {/* Factual Description */}
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-8">
                {product.description}
              </p>
            </motion.div>

            {/* Technical Specifications Table */}
            <div className="mb-8 rounded-3xl bg-slate-50 border border-slate-100 p-6">
              <h2 className="text-xs font-black uppercase tracking-widest text-blue-950 mb-4 flex items-center">
                <ShieldCheck size={16} className="mr-2 text-amber-600" />
                Fiche & Spécifications Techniques
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.specs && Object.keys(product.specs).length > 0 ? (
                  Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="bg-white p-3 rounded-2xl border border-slate-100">
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">{key}</p>
                      <p className="text-sm font-black text-blue-950">{String(value)}</p>
                    </div>
                  ))
                ) : (
                  <>
                    {product.material && (
                      <div className="bg-white p-3 rounded-2xl border border-slate-100">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Matériau</p>
                        <p className="text-sm font-black text-blue-950">{product.material}</p>
                      </div>
                    )}
                    {product.finish && (
                      <div className="bg-white p-3 rounded-2xl border border-slate-100">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Finition</p>
                        <p className="text-sm font-black text-blue-950">{product.finish}</p>
                      </div>
                    )}
                    {product.usage && (
                      <div className="bg-white p-3 rounded-2xl border border-slate-100">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Usage Recommandé</p>
                        <p className="text-sm font-black text-blue-950">{product.usage}</p>
                      </div>
                    )}
                    {product.origin && (
                      <div className="bg-white p-3 rounded-2xl border border-slate-100">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Origine & Norme</p>
                        <p className="text-sm font-black text-blue-950">{product.origin}</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Applications List */}
            {product.applications && product.applications.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xs font-black uppercase tracking-widest text-blue-950 mb-3 flex items-center">
                  <Layers size={15} className="mr-2 text-amber-600" />
                  Domaines d&apos;application
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.applications.map((app, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-blue-50 text-blue-900 text-xs font-semibold rounded-xl border border-blue-100/80"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* B2B Action Box */}
            <div className="mt-auto p-6 sm:p-8 rounded-3xl bg-blue-950 text-white shadow-xl">
              <h3 className="text-lg font-black mb-1 tracking-tight">Demander un Devis Proforma</h3>
              <p className="text-blue-200 text-xs font-medium mb-6">
                Tarifs dégressifs pour chantiers et grossistes. Réponse rapide sous 24h ouvrées.
              </p>

              <div className="space-y-4">
                {/* Quantity Control */}
                <div className="flex items-center justify-between bg-white/10 rounded-2xl p-2 border border-white/10">
                  <span className="ml-3 text-xs font-black uppercase tracking-wider text-blue-200">
                    Quantité {product.pricing?.unit ? `(${product.pricing.unit})` : ''}
                  </span>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={handleDecrement}
                      className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-xl transition-all"
                      aria-label="Diminuer la quantité"
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
                          const num = parseInt(val, 10);
                          if (!isNaN(num)) setQuantity(num);
                        }
                      }}
                      onBlur={() => {
                        if (quantity < 1) setQuantity(1);
                      }}
                      className="w-16 h-10 bg-white/10 rounded-xl text-center font-black text-white text-base outline-none focus:bg-white/20 transition-all border border-white/10"
                      aria-label="Quantité de produit"
                    />
                    <button
                      onClick={handleIncrement}
                      className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-xl transition-all"
                      aria-label="Augmenter la quantité"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => addToQuote(product, Math.max(1, quantity))}
                    className="min-h-[50px] bg-amber-500 hover:bg-amber-400 text-blue-950 rounded-2xl font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2 shadow-lg shadow-amber-500/20 active:scale-95 cursor-pointer"
                  >
                    <ShoppingBag size={18} />
                    <span>Ajouter au Devis</span>
                  </button>

                  <a
                    href={`https://wa.me/212661138204?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[50px] bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2 shadow-lg shadow-emerald-600/20 active:scale-95"
                  >
                    <MessageSquare size={18} />
                    <span>WhatsApp Direct</span>
                  </a>
                </div>
              </div>

              {/* Logistics note */}
              <div className="grid grid-cols-2 gap-3 mt-6 pt-4 border-t border-white/10 text-xs text-blue-200">
                <div className="flex items-center space-x-2">
                  <Truck size={15} className="text-amber-400 shrink-0" />
                  <span>Livraison partout au Maroc</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin size={15} className="text-amber-400 shrink-0" />
                  <span>Stock & dépôt Casablanca</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="mt-24 pt-16 border-t border-gray-100">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-amber-600 mb-1">
                  Compléments techniques
                </h2>
                <p className="text-2xl font-black text-blue-950">
                  Produits fréquemment associés
                </p>
              </div>
              <Link
                href="/products"
                className="text-xs font-bold text-blue-950 hover:text-amber-600 transition-colors flex items-center gap-1"
              >
                Tout le catalogue <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relProduct) => {
                const relPrice = formatPriceDisplay(relProduct.pricing);
                return (
                  <Link
                    key={relProduct.id}
                    href={`/products/${relProduct.slug}`}
                    className="group bg-slate-50 hover:bg-white rounded-3xl p-5 border border-slate-100 hover:border-gray-200 hover:shadow-xl transition-all flex flex-col"
                  >
                    <div className="relative aspect-square w-full rounded-2xl bg-white mb-4 overflow-hidden p-4 flex items-center justify-center">
                      <Image
                        src={relProduct.image}
                        alt={relProduct.name}
                        fill
                        className="object-contain mix-blend-multiply p-4 transition-transform group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-amber-600 mb-1">
                      {relProduct.category}
                    </p>
                    <h3 className="text-sm font-black text-blue-950 leading-snug mb-2 group-hover:text-amber-600 transition-colors line-clamp-2">
                      {relProduct.name}
                    </h3>
                    <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                      <span className="font-bold text-gray-700">
                        {relPrice.display}
                      </span>
                      <span className="text-[10px] font-bold text-amber-600 uppercase">
                        Voir fiche →
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>

      {/* STICKY MOBILE BAR */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur-md border-t border-gray-200 z-50 shadow-2xl flex items-center gap-2">
        <div className="flex items-center bg-gray-100 rounded-xl p-1 shrink-0">
          <button
            onClick={handleDecrement}
            className="w-9 h-9 flex items-center justify-center text-blue-950 font-bold"
            aria-label="Moins"
          >
            <Minus size={16} />
          </button>
          <span className="w-8 text-center text-xs font-black text-blue-950">
            {quantity}
          </span>
          <button
            onClick={handleIncrement}
            className="w-9 h-9 flex items-center justify-center text-blue-950 font-bold"
            aria-label="Plus"
          >
            <Plus size={16} />
          </button>
        </div>

        <button
          onClick={() => addToQuote(product, Math.max(1, quantity))}
          className="grow h-11 bg-amber-500 text-blue-950 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center space-x-2 active:scale-95 transition-transform"
        >
          <ShoppingBag size={16} />
          <span>Devis ({priceInfo.rawPrice ? `${(priceInfo.rawPrice * quantity).toLocaleString('fr-MA')} MAD` : 'Sur devis'})</span>
        </button>

        <a
          href={`https://wa.me/212661138204?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-11 h-11 bg-emerald-600 text-white rounded-xl flex items-center justify-center shrink-0 active:scale-95"
          aria-label="WhatsApp"
        >
          <MessageSquare size={18} />
        </a>
      </div>
    </div>
  );
}
