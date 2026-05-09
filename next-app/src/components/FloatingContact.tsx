"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Bot } from 'lucide-react';
import AIChat from './AIChat';

const FloatingContact: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  React.useEffect(() => {
    const handleOpenChat = () => setIsChatOpen(true);
    window.addEventListener('open-chat', handleOpenChat);
    return () => window.removeEventListener('open-chat', handleOpenChat);
  }, []);

  return (
    <div className="fixed bottom-36 lg:bottom-10 right-4 lg:right-6 z-[500] flex flex-col space-y-3">
      {/* AI Chat Window */}
      <AIChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="flex flex-col space-y-3"
        >
          {/* WhatsApp Link */}
          <motion.a
            href="https://wa.me/212661138204"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_12px_40px_rgba(37,211,102,0.55),_0_4px_16px_rgba(0,0,0,0.18)] hover:shadow-[0_20px_60px_rgba(37,211,102,0.65),_0_8px_24px_rgba(0,0,0,0.22)] hover:-translate-y-1.5 transition-all duration-300 relative group ring-2 ring-white/30"
            title="Chat via WhatsApp"
          >
            <MessageCircle size={28} />
            <span className="absolute right-full mr-4 px-3 py-1.5 bg-white text-green-600 text-[10px] font-black uppercase tracking-widest rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-green-100">
              WhatsApp Direct
            </span>
          </motion.a>

          {/* AI Chat Assistant Toggle */}
          <motion.button
            onClick={() => setIsChatOpen(!isChatOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 relative group ring-2 ring-white/20 hover:-translate-y-1 ${
              isChatOpen
                ? 'bg-amber-500 text-white shadow-[0_12px_40px_rgba(245,158,11,0.6),_0_4px_16px_rgba(0,0,0,0.18)]'
                : 'bg-slate-900 text-white hover:bg-amber-500 shadow-[0_12px_40px_rgba(15,23,42,0.5),_0_4px_16px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_60px_rgba(245,158,11,0.55),_0_8px_24px_rgba(0,0,0,0.22)]'
            }`}
            title="Assistant IA"
          >
            <Bot size={28} className={isChatOpen ? 'scale-110' : ''} />
            <span className="absolute right-full mr-4 px-3 py-1.5 bg-white text-slate-900 text-[10px] font-black uppercase tracking-widest rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-slate-100">
              Assistant Technique
            </span>
          </motion.button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default FloatingContact;
