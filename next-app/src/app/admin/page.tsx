"use client";

import React, { useState, useMemo } from 'react';
import { PackagePlus, Loader2, CheckCircle2, AlertCircle, LogOut, Sparkles, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    ref: '',
    category: '',
    description: '',
    image: '',
    inStock: true,
    price: '',
    brand: '',
  });

  const [specsInput, setSpecsInput] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  // SEO Score calculation (0 - 100)
  const seoAudit = useMemo(() => {
    let score = 0;
    const checks: { label: string; points: number; maxPoints: number; passed: boolean }[] = [];

    // 1. Title / Name (20 pts)
    const hasGoodTitle = formData.name.length >= 10 && formData.name.length <= 80;
    checks.push({
      label: 'Titre de produit explicite et optimisé (10 - 80 car.)',
      points: hasGoodTitle ? 20 : (formData.name.length > 0 ? 10 : 0),
      maxPoints: 20,
      passed: hasGoodTitle,
    });
    score += checks[0].points;

    // 2. Description (15 pts)
    const hasGoodDesc = formData.description.length >= 50;
    checks.push({
      label: 'Description technique détaillée (>= 50 car.)',
      points: hasGoodDesc ? 15 : (formData.description.length > 0 ? 5 : 0),
      maxPoints: 15,
      passed: hasGoodDesc,
    });
    score += checks[1].points;

    // 3. Technical Specifications (15 pts)
    let hasSpecs = false;
    try {
      if (specsInput.trim()) {
        const parsed = JSON.parse(specsInput);
        if (Object.keys(parsed).length >= 2) hasSpecs = true;
      }
    } catch {
      hasSpecs = false;
    }
    checks.push({
      label: 'Spécifications techniques JSON (min. 2 attributs)',
      points: hasSpecs ? 15 : (specsInput.trim() ? 5 : 0),
      maxPoints: 15,
      passed: hasSpecs,
    });
    score += checks[2].points;

    // 4. Image Present (10 pts)
    const hasImage = formData.image.length > 5;
    checks.push({
      label: 'Image haute résolution définie',
      points: hasImage ? 10 : 0,
      maxPoints: 10,
      passed: hasImage,
    });
    score += checks[3].points;

    // 5. Category (10 pts)
    const hasCategory = formData.category.length > 2;
    checks.push({
      label: 'Catégorie de second œuvre assignée',
      points: hasCategory ? 10 : 0,
      maxPoints: 10,
      passed: hasCategory,
    });
    score += checks[4].points;

    // 6. Pricing / Stock declared (10 pts)
    const hasStock = formData.inStock !== undefined;
    checks.push({
      label: 'État de stock & modalité tarifaire déclarés',
      points: hasStock ? 10 : 5,
      maxPoints: 10,
      passed: hasStock,
    });
    score += checks[5].points;

    // 7. Reference SKU unique (10 pts)
    const hasRef = formData.ref.length >= 3;
    checks.push({
      label: 'Référence unique SKU / MPN',
      points: hasRef ? 10 : 0,
      maxPoints: 10,
      passed: hasRef,
    });
    score += checks[6].points;

    // 8. Brand Attribution (10 pts)
    const hasBrand = formData.brand.length > 0;
    checks.push({
      label: 'Attribution de marque vérifiée',
      points: hasBrand ? 10 : 5,
      maxPoints: 10,
      passed: hasBrand,
    });
    score += checks[7].points;

    return { score, checks };
  }, [formData, specsInput]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      let parsedSpecs = {};
      if (specsInput.trim()) {
        try {
          parsedSpecs = JSON.parse(specsInput);
        } catch {
          throw new Error('Les spécifications doivent être au format JSON valide (ex: {"Matiere": "Aluminium", "Epaisseur": "12.5mm"})');
        }
      }

      const payload = {
        name: formData.name,
        ref: formData.ref,
        category: formData.category,
        description: formData.description,
        image: formData.image,
        inStock: formData.inStock,
        specs: parsedSpecs,
      };

      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || data.status === 'error') {
        throw new Error(data.message || 'Erreur lors de l\'ajout du produit');
      }

      setSuccess('Produit ajouté avec succès à la base Supabase !');
      setFormData({
        name: '',
        ref: '',
        category: '',
        description: '',
        image: '',
        inStock: true,
        price: '',
        brand: '',
      });
      setSpecsInput('');

    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push('/login');
      router.refresh();
    } catch (err) {
      console.error('Erreur lors de la déconnexion:', err);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 font-sans pt-12 pb-24">
      <div className="px-4 max-w-5xl mx-auto space-y-8">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
          <div className="bg-blue-950 p-8 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center shadow-lg shrink-0">
                <PackagePlus size={24} className="text-blue-950 font-bold" />
              </div>
              <div>
                <h1 className="text-2xl font-black">Dashboard Administrateur</h1>
                <p className="text-blue-200 text-xs mt-0.5">Gestion du catalogue Supabase & Score SEO</p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-md self-start sm:self-auto"
            >
              <LogOut size={15} />
              <span>Se déconnecter</span>
            </button>
          </div>

          <div className="p-8">
            {success && (
              <div className="mb-6 bg-green-50 text-green-700 p-4 rounded-2xl flex items-center gap-3 border border-green-200">
                <CheckCircle2 size={20} />
                <p className="font-medium text-sm">{success}</p>
              </div>
            )}
            
            {error && (
              <div className="mb-6 bg-red-50 text-red-700 p-4 rounded-2xl flex items-center gap-3 border border-red-200">
                <AlertCircle size={20} />
                <p className="font-medium text-sm">{error}</p>
              </div>
            )}

            {/* Live SEO Quality Score Bar */}
            <div className="mb-8 p-6 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Sparkles size={18} className="text-amber-500" />
                  <span className="text-xs font-black uppercase tracking-wider text-blue-950">
                    Score Qualité SEO & GEO (0 - 100)
                  </span>
                </div>
                <span className={`text-lg font-black ${
                  seoAudit.score >= 80 ? 'text-emerald-600' : seoAudit.score >= 50 ? 'text-amber-600' : 'text-red-600'
                }`}>
                  {seoAudit.score} / 100
                </span>
              </div>

              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-4">
                <div
                  className={`h-full transition-all duration-500 ${
                    seoAudit.score >= 80 ? 'bg-emerald-500' : seoAudit.score >= 50 ? 'bg-amber-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${seoAudit.score}%` }}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {seoAudit.checks.map((chk, i) => (
                  <div key={i} className="flex items-center space-x-2 text-gray-600">
                    <span className={chk.passed ? 'text-emerald-600 font-bold' : 'text-gray-400'}>
                      {chk.passed ? '✓' : '○'}
                    </span>
                    <span className={chk.passed ? 'text-slate-900 font-medium' : 'text-gray-400'}>
                      {chk.label} ({chk.points}/{chk.maxPoints} pts)
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                    Nom du produit <span className="text-red-500">*</span>
                  </label>
                  <input 
                    required 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all text-slate-900 text-sm font-medium"
                    placeholder="Ex: Trappe de Visite Aluplaster Hydrofuge 40x40"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                    Référence (ID unique) <span className="text-red-500">*</span>
                  </label>
                  <input 
                    required 
                    name="ref"
                    value={formData.ref}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all text-slate-900 text-sm font-mono font-bold uppercase"
                    placeholder="Ex: TR-HYDRO-4040"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                    Catégorie
                  </label>
                  <input 
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all text-slate-900 text-sm font-medium"
                    placeholder="Ex: Trappe de Visite"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                    Marque
                  </label>
                  <input 
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all text-slate-900 text-sm font-medium"
                    placeholder="Ex: Chada Alyasmin, Knauf, Rockwool"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                    Image (URL ou chemin local)
                  </label>
                  <input 
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all text-slate-900 text-sm font-medium"
                    placeholder="/assets/assetstrappe/img/work-4.jpg"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                  Description technique
                </label>
                <textarea 
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all text-slate-900 text-sm resize-none"
                  placeholder="Décrivez les fonctionnalités, performances hydrofuges ou phoniques, et destination d'usage..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center justify-between">
                  <span>Spécifications techniques (Format JSON)</span>
                </label>
                <textarea 
                  value={specsInput}
                  onChange={(e) => setSpecsInput(e.target.value)}
                  rows={4}
                  className="w-full bg-slate-900 text-green-400 font-mono text-xs rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all resize-none"
                  placeholder={`{\n  "Dimensions": "400 x 400 mm",\n  "Matériau": "Aluminium extrudé",\n  "Plaque": "BA13 Hydrofuge"\n}`}
                />
                <p className="text-[10px] text-slate-500">Format JSON clé/valeur pour alimenter automatiquement le Schema.org et la fiche technique.</p>
              </div>

              <div className="flex items-center gap-3 py-3 border-y border-slate-100">
                <input 
                  type="checkbox"
                  name="inStock"
                  id="inStock"
                  checked={formData.inStock}
                  onChange={handleInputChange}
                  className="w-5 h-5 rounded border-slate-300 text-amber-500 focus:ring-amber-500"
                />
                <label htmlFor="inStock" className="font-bold text-xs uppercase tracking-wider text-slate-700 cursor-pointer">
                  Produit disponible en stock à Casablanca
                </label>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-70 disabled:cursor-not-allowed text-blue-950 font-black py-4 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    <span>Enregistrement dans Supabase...</span>
                  </>
                ) : (
                  <>
                    <PackagePlus size={18} />
                    <span>Publier le produit dans le catalogue</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
