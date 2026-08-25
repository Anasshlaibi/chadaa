"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { type Product, type CategoryGroup } from '@/data/products';
import { formatPriceDisplay } from '@/lib/products';
import {
  ShieldCheck,
  Tag,
  ArrowRight,
  ChevronRight,
  Filter,
  CheckCircle2,
  PhoneCall,
  MessageSquare
} from 'lucide-react';

interface CategoryLandingPageProps {
  categoryGroup: CategoryGroup;
  products: Product[];
}

export default function CategoryLandingPage({
  categoryGroup,
  products,
}: CategoryLandingPageProps) {
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('Tous');

  const filteredProducts =
    selectedSubCategory === 'Tous'
      ? products
      : products.filter((p) => p.category === selectedSubCategory);

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24 pt-20 lg:pt-28">
      {/* Breadcrumb Bar */}
      <div className="bg-slate-100/80 border-b border-gray-200 py-3">
        <div className="max-w-[1920px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 2xl:px-20">
          <nav aria-label="Fil d'Ariane" className="flex items-center space-x-2 text-xs text-gray-600">
            <Link href="/" className="hover:text-amber-600 transition-colors">
              Accueil
            </Link>
            <ChevronRight size={14} className="text-gray-400" />
            <Link href="/products" className="hover:text-amber-600 transition-colors">
              Produits
            </Link>
            <ChevronRight size={14} className="text-gray-400" />
            <span className="text-blue-950 font-bold">{categoryGroup.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-blue-950 text-white pt-12 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-amber-500/20 border border-amber-500/30 rounded-full text-amber-400 text-xs font-black uppercase tracking-wider mb-4">
            <ShieldCheck size={14} />
            <span>Catalogue Spécialisé Maroc</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4">
            {categoryGroup.name} au Maroc
          </h1>

          <p className="text-blue-200 text-base sm:text-lg max-w-3xl leading-relaxed mb-6">
            {categoryGroup.description} Solutions techniques certifiées disponibles en stock à Casablanca et livrées rapidement sur tous vos chantiers au Maroc.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              href={`/prix/${categoryGroup.slug}`}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-blue-950 font-bold rounded-xl text-xs uppercase tracking-wider transition-all inline-flex items-center gap-2"
            >
              <Tag size={14} />
              <span>Consulter les tarifs {categoryGroup.name}</span>
            </Link>
            <Link
              href="/devis"
              className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all border border-white/20"
            >
              Demander un devis rapide
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-10">
        {/* Sub-category Filter Tabs */}
        {categoryGroup.categories.length > 1 && (
          <div className="flex items-center space-x-2 mb-8 overflow-x-auto pb-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1 mr-2">
              <Filter size={14} /> Filtrer :
            </span>
            <button
              onClick={() => setSelectedSubCategory('Tous')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedSubCategory === 'Tous'
                  ? 'bg-blue-950 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              Tous ({products.length})
            </button>
            {categoryGroup.categories.map((cat) => {
              const count = products.filter((p) => p.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedSubCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedSubCategory === cat
                      ? 'bg-blue-950 text-white shadow-md'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredProducts.map((product) => {
            const priceInfo = formatPriceDisplay(product.pricing);
            return (
              <div
                key={product.id}
                className="group bg-white rounded-3xl p-6 border border-slate-200/80 hover:border-gray-300 hover:shadow-xl transition-all flex flex-col"
              >
                <div className="relative aspect-square w-full rounded-2xl bg-slate-50 mb-4 overflow-hidden p-6 flex items-center justify-center">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain mix-blend-multiply p-4 transition-transform group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {product.brand && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 bg-blue-950 text-white text-[9px] font-bold uppercase tracking-widest rounded-lg">
                      {product.brand}
                    </span>
                  )}
                  <span
                    className={`absolute top-3 right-3 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest rounded-lg ${
                      product.stockStatus === 'En Rupture'
                        ? 'bg-red-50 text-red-700'
                        : 'bg-emerald-50 text-emerald-700'
                    }`}
                  >
                    {product.stockStatus}
                  </span>
                </div>

                <p className="text-[10px] font-black uppercase tracking-wider text-amber-600 mb-1">
                  {product.category}
                </p>

                <h2 className="text-base font-black text-blue-950 leading-snug mb-2 group-hover:text-amber-600 transition-colors line-clamp-2">
                  <Link href={`/products/${product.slug}`}>
                    {product.name}
                  </Link>
                </h2>

                <p className="text-xs text-gray-500 line-clamp-2 mb-4">
                  {product.description}
                </p>

                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold block uppercase">
                      Prix indicatif
                    </span>
                    <span className="text-sm font-black text-blue-950">
                      {priceInfo.display}
                    </span>
                  </div>

                  <Link
                    href={`/products/${product.slug}`}
                    className="px-4 py-2 bg-slate-100 hover:bg-amber-500 hover:text-white rounded-xl text-xs font-bold text-blue-950 transition-all flex items-center gap-1"
                  >
                    Fiche <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Technical Guide Section */}
        <section className="bg-white rounded-3xl p-8 border border-slate-200/80 mb-12">
          <h2 className="text-2xl font-black text-blue-950 mb-6">
            Guide technique & mise en œuvre : {categoryGroup.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-black text-blue-950 text-base mb-2">
                Critères de choix pour vos chantiers au Maroc
              </h3>
              <p>
                Le choix des matériaux de {categoryGroup.name.toLowerCase()} dépend des exigences thermo-acoustiques du bâtiment, du niveau d'humidité des pièces (pièces sèches vs pièces humides H1) et des normes de sécurité incendie requises par le bureau de contrôle.
              </p>
            </div>
            <div>
              <h3 className="font-black text-blue-950 text-base mb-2">
                Approvisionnement & Logistique Casablanca / National
              </h3>
              <p>
                Chada Alyasmin maintient un stock permanent sur ses plateformes logistiques de Casablanca, permettant des expéditions sous 24 à 48h vers Rabat, Tanger, Marrakech, Fès, Agadir et toutes les régions du Royaume.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
