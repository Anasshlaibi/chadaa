"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const FloatingContact: React.FC = () => {
  return (
    <div className="fixed bottom-36 lg:bottom-10 right-4 lg:right-6 z-[500] flex flex-col space-y-3">
      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="flex flex-col space-y-3"
      >
        {/* WhatsApp Direct Lead CTA */}
        <motion.a
          href="https://wa.me/212661138204?text=Bonjour%20Chada%20Alyasmin%2C%20je%20souhaite%20un%20devis."
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_12px_40px_rgba(37,211,102,0.55),_0_4px_16px_rgba(0,0,0,0.18)] hover:shadow-[0_20px_60px_rgba(37,211,102,0.65),_0_8px_24px_rgba(0,0,0,0.22)] hover:-translate-y-1.5 transition-all duration-300 relative group ring-2 ring-white/30"
          title="Devis & Stock via WhatsApp"
          aria-label="Contacter Chada Alyasmin sur WhatsApp"
        >
          <MessageCircle size={28} />
          <span className="absolute right-full mr-4 px-3 py-1.5 bg-white text-green-600 text-[10px] font-black uppercase tracking-widest rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-green-100">
            WhatsApp Direct
          </span>
        </motion.a>
      </motion.div>
    </div>
  );
};

export default FloatingContact;
