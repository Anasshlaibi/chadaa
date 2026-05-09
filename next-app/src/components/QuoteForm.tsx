import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Loader2, Building2, User, Mail, Phone } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { sendQuoteRequest } from '../services/api';

interface QuoteFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const QuoteForm: React.FC<QuoteFormProps> = ({ onSuccess, onCancel }) => {
  const { items, clearQuote } = useCart();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setStatus('loading');
    
    const payload = {
      companyName: formData.companyName,
      contactName: formData.contactName,
      email: formData.email,
      phone: formData.phone,
      cart: items.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity
      }))
    };

    const success = await sendQuoteRequest(payload);
    
    if (success) {
      setStatus('success');
      setTimeout(() => {
        clearQuote();
        onSuccess();
      }, 2500);
    } else {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center p-12 text-center space-y-6"
      >
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-500">
          <CheckCircle size={48} />
        </div>
        <div>
          <h3 className="text-2xl font-black text-blue-950 mb-2">Demande Envoyée !</h3>
          <p className="text-gray-500 font-medium">Nous vous contacterons par email sous 24h avec votre devis personnalisé.</p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100/50">
        <h4 className="text-[10px] font-black uppercase text-blue-900 tracking-widest mb-4">Récapitulatif</h4>
        <div className="space-y-2">
            {items.map(item => (
                <div key={item.id} className="flex justify-between text-xs font-bold text-blue-950/70">
                    <span>{item.name}</span>
                    <span>x{item.quantity}</span>
                </div>
            ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-4">
          <div className="relative">
            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              required
              type="text"
              autoComplete="organization"
              placeholder="Nom de l'entreprise"
              className="w-full bg-gray-50 border-2 border-transparent focus:border-amber-500 focus:bg-white rounded-2xl py-4 pl-12 pr-6 text-sm font-bold text-blue-950 outline-none transition-all"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            />
          </div>

          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              required
              type="text"
              autoComplete="name"
              placeholder="Nom du Contact"
              className="w-full bg-gray-50 border-2 border-transparent focus:border-amber-500 focus:bg-white rounded-2xl py-4 pl-12 pr-6 text-sm font-bold text-blue-950 outline-none transition-all"
              value={formData.contactName}
              onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              required
              type="email"
              autoComplete="email"
              placeholder="Email professionnel"
              className="w-full bg-gray-50 border-2 border-transparent focus:border-amber-500 focus:bg-white rounded-2xl py-4 pl-12 pr-6 text-sm font-bold text-blue-950 outline-none transition-all"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              required
              type="tel"
              autoComplete="tel"
              placeholder="Téléphone"
              className="w-full bg-gray-50 border-2 border-transparent focus:border-amber-500 focus:bg-white rounded-2xl py-4 pl-12 pr-6 text-sm font-bold text-blue-950 outline-none transition-all"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
        </div>

        {status === 'error' && (
          <div className="p-4 bg-red-50 rounded-2xl border border-red-100 flex items-center gap-3 text-red-600 text-xs font-bold">
            <AlertCircle size={16} />
            Une erreur est survenue. Veuillez réessayer.
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="py-4 rounded-2xl bg-gray-100 text-blue-950 font-black text-sm hover:bg-gray-200 transition-all"
          >
            Retour
          </button>
          <button
            disabled={status === 'loading'}
            type="submit"
            className="py-4 rounded-2xl bg-amber-500 text-white font-black text-sm shadow-xl hover:bg-amber-600 active:scale-95 transition-all flex items-center justify-center space-x-2"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                <span>Envoi en cours...</span>
              </>
            ) : (
              <>
                <Send size={18} />
                <span>Envoyer</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuoteForm;
