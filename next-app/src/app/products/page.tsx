"use client";

import React, { useEffect, useState, Suspense } from 'react';
import Catalog from '@/components/Catalog';
import { fetchProducts } from '@/services/api';
import { type Product } from '@/data/products';
import { useSearchParams } from 'next/navigation';

function ProductsContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const searchParams = useSearchParams();
  const langQuery = searchParams.get('lang');
  const lang = (langQuery === 'en' || langQuery === 'ma') ? langQuery : 'fr';

  useEffect(() => {
    async function loadCatalog() {
      try {
        setIsLoading(true);
        const data = await fetchProducts();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError(lang === 'en' ? "Error loading catalog." : "Erreur lors du chargement du catalogue.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadCatalog();
  }, [lang]);

  const content = {
    fr: {
      tag: "Notre Catalogue",
      title: "Tous Nos Produits",
      desc: "Découvrez notre gamme complète de matériaux de second œuvre, conçus pour l'excellence et la durabilité de vos chantiers."
    },
    ma: {
      tag: "Notre Stock",
      title: "Tous les Produits",
      desc: "Découvrez notre gamme complète au Maroc avec les meilleurs prix de gros pour vos chantiers."
    },
    en: {
      tag: "Our Catalog",
      title: "All Our Products",
      desc: "Discover our complete range of finishing materials, designed for excellence and durability for your projects."
    }
  }[lang];

  return (
    <>
      {/* Page Header */}
      <div className="pt-32 pb-10 bg-blue-950 text-white px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-500 mb-4 inline-block">
            {content.tag}
          </p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
            {content.title}
          </h1>
          <p className="text-blue-200 max-w-2xl text-lg font-medium">
            {content.desc}
          </p>
        </div>
      </div>

      {/* Catalog Component */}
      <div className="bg-slate-50 relative -top-20">
        <Catalog products={products} isLoading={isLoading} lang={lang} />
      </div>
      
      {error && (
        <div className="fixed bottom-4 left-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50 shadow-xl">
          {error}
        </div>
      )}
    </>
  );
}

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans">
      <Suspense fallback={<div>Loading...</div>}>
        <ProductsContent />
      </Suspense>
    </main>
  );
}
