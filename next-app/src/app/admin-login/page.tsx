"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from './actions';
import { Lock } from 'lucide-react';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const result = await login(password);
      if (result.success) {
        router.push('/admin');
        router.refresh(); // Force refresh to apply auth state
      } else {
        setError('Mot de passe incorrect');
      }
    } catch (err) {
      setError('Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md border border-slate-100">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center shadow-lg">
            <Lock size={32} className="text-amber-500" />
          </div>
        </div>
        <h1 className="text-2xl font-bold font-serif text-center mb-8 text-slate-900">Accès Administrateur</h1>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl border border-red-200 text-sm font-medium text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 block">Mot de passe secret</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center"
          >
            {loading ? 'Vérification...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  );
}
