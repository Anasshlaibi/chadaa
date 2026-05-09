"use client";

import React, { useState } from 'react';
import { PackagePlus, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function AdminDashboard() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    ref: '',
    category: '',
    description: '',
    image: '',
    inStock: true
  });

  const [specsInput, setSpecsInput] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Parse specs JSON
      let parsedSpecs = {};
      if (specsInput.trim()) {
        try {
          parsedSpecs = JSON.parse(specsInput);
        } catch (err) {
          throw new Error('Les spécifications doivent être au format JSON valide (ex: {"Marque": "Test", "Couleur": "Rouge"})');
        }
      }

      const payload = {
        ...formData,
        specs: parsedSpecs
      };

      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok || data.status === 'error') {
        throw new Error(data.message || 'Erreur lors de l\'ajout du produit');
      }

      setSuccess('Produit ajouté avec succès !');
      // Reset form
      setFormData({
        name: '',
        ref: '',
        category: '',
        description: '',
        image: '',
        inStock: true
      });
      setSpecsInput('');

    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 font-sans">
      <div className="pb-20 px-4 max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
          <div className="bg-slate-900 p-8 text-white flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center shadow-lg">
              <PackagePlus size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-serif">Dashboard Administrateur</h1>
              <p className="text-slate-300 text-sm mt-1">Ajouter un nouveau produit à l'inventaire</p>
            </div>
          </div>

          <div className="p-8">
            {success && (
              <div className="mb-6 bg-green-50 text-green-700 p-4 rounded-xl flex items-center gap-3 border border-green-200">
                <CheckCircle2 size={20} />
                <p className="font-medium">{success}</p>
              </div>
            )}
            
            {error && (
              <div className="mb-6 bg-red-50 text-red-700 p-4 rounded-xl flex items-center gap-3 border border-red-200">
                <AlertCircle size={20} />
                <p className="font-medium">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 block">Nom du produit <span className="text-red-500">*</span></label>
                  <input 
                    required 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all text-slate-900"
                    placeholder="Ex: Tapis Roulant Pro"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 block">Référence (ID unique) <span className="text-red-500">*</span></label>
                  <input 
                    required 
                    name="ref"
                    value={formData.ref}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all text-slate-900"
                    placeholder="Ex: TR-2024-PRO"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 block">Catégorie</label>
                  <input 
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all text-slate-900"
                    placeholder="Ex: Cardio Training"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 block">Image (URL)</label>
                  <input 
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all text-slate-900"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 block">Description courte</label>
                <textarea 
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all text-slate-900 resize-none"
                  placeholder="Décrivez le produit en quelques phrases..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center justify-between">
                  <span>Spécifications techniques (Format JSON)</span>
                </label>
                <textarea 
                  value={specsInput}
                  onChange={(e) => setSpecsInput(e.target.value)}
                  rows={4}
                  className="w-full bg-slate-900 text-green-400 font-mono text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all resize-none"
                  placeholder={`{\n  "Moteur": "3 HP",\n  "Vitesse max": "20 km/h"\n}`}
                />
                <p className="text-xs text-slate-500">Optionnel. Utilisez un format JSON valide.</p>
              </div>

              <div className="flex items-center gap-3 py-2 border-y border-slate-100">
                <input 
                  type="checkbox"
                  name="inStock"
                  id="inStock"
                  checked={formData.inStock}
                  onChange={handleInputChange}
                  className="w-5 h-5 rounded border-slate-300 text-amber-500 focus:ring-amber-500"
                />
                <label htmlFor="inStock" className="font-medium text-slate-700 cursor-pointer">
                  Produit disponible en stock
                </label>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    <span>Création en cours...</span>
                  </>
                ) : (
                  <>
                    <PackagePlus size={20} />
                    <span>Ajouter le produit</span>
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
