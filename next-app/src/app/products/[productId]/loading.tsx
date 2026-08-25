import React from 'react';

export default function ProductLoading() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24 pt-20 lg:pt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
        {/* Breadcrumb Skeleton */}
        <div className="flex items-center gap-2 mb-8">
          <div className="h-4 w-16 bg-slate-200 rounded"></div>
          <div className="h-4 w-4 bg-slate-200 rounded"></div>
          <div className="h-4 w-28 bg-slate-200 rounded"></div>
          <div className="h-4 w-4 bg-slate-200 rounded"></div>
          <div className="h-4 w-40 bg-slate-200 rounded"></div>
        </div>

        {/* Product Main Container */}
        <div className="bg-white rounded-3xl p-6 lg:p-10 border border-slate-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Image skeleton */}
          <div className="lg:col-span-6 space-y-4">
            <div className="w-full aspect-square bg-slate-200 rounded-2xl"></div>
            <div className="grid grid-cols-4 gap-3">
              <div className="aspect-square bg-slate-200 rounded-xl"></div>
              <div className="aspect-square bg-slate-200 rounded-xl"></div>
              <div className="aspect-square bg-slate-200 rounded-xl"></div>
              <div className="aspect-square bg-slate-200 rounded-xl"></div>
            </div>
          </div>

          {/* Right: Info skeleton */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <div className="h-6 w-32 bg-amber-100 rounded-full"></div>
              <div className="h-10 w-3/4 bg-slate-200 rounded-lg"></div>
              <div className="h-4 w-40 bg-slate-200 rounded"></div>
            </div>

            {/* Price Box */}
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
              <div className="h-8 w-48 bg-amber-200 rounded"></div>
              <div className="h-4 w-64 bg-slate-200 rounded"></div>
            </div>

            {/* Specs Table */}
            <div className="space-y-3">
              <div className="h-5 w-40 bg-slate-200 rounded"></div>
              <div className="space-y-2">
                <div className="h-10 w-full bg-slate-100 rounded"></div>
                <div className="h-10 w-full bg-slate-100 rounded"></div>
                <div className="h-10 w-full bg-slate-100 rounded"></div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
              <div className="h-12 bg-amber-500/50 rounded-xl"></div>
              <div className="h-12 bg-emerald-600/50 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
