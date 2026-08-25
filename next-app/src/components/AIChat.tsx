"use client";

import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Send, X, Bot, User, Loader2, Sparkles, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AIChatProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen?: () => void;
}

const AIChat: React.FC<AIChatProps> = ({ isOpen, onClose, onOpen }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Bonjour ! Je suis l\'assistant intelligent de Chada Alyasmin. Comment puis-je vous aider sur nos matériaux, stocks ou devis ?',
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [showProactiveTooltip, setShowProactiveTooltip] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Proactive trigger after 8 seconds (only once per session)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hasTriggered = sessionStorage.getItem('chada_chat_triggered');
    if (hasTriggered || isOpen) return;

    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowProactiveTooltip(true);
        sessionStorage.setItem('chada_chat_triggered', 'true');
        // Auto hide after 6 seconds if not clicked
        setTimeout(() => {
          setShowProactiveTooltip(false);
        }, 6000);
      }
    }, 8000);

    return () => clearTimeout(timer);
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();

      if (data.response) {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.response }]);
      } else {
        throw new Error(data.error || 'Erreur de connexion');
      }
    } catch (error) {
      console.error('AI Chat Error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'Désolé, j\'ai rencontré une erreur. Veuillez contacter notre bureau technique au +212 661-138204 ou par WhatsApp.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Proactive Tooltip Bubble above trigger */}
      <AnimatePresence>
        {showProactiveTooltip && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            onClick={() => {
              setShowProactiveTooltip(false);
              if (onOpen) onOpen();
            }}
            className="fixed bottom-40 lg:bottom-24 right-4 lg:right-24 z-[290] max-w-xs bg-slate-900 text-white p-3.5 rounded-2xl shadow-xl border border-amber-500/40 cursor-pointer flex items-center gap-3 hover:border-amber-400 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shrink-0">
              <Sparkles size={16} />
            </div>
            <div className="text-xs leading-snug">
              <strong className="block text-amber-300 font-semibold">Une question technique ?</strong>
              <span>Disponibilité du stock & devis immédiat 👋</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowProactiveTooltip(false);
              }}
              className="text-slate-400 hover:text-white p-0.5"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
            exit={{ opacity: 0, y: 20, scale: 0.95, x: 20 }}
            className="fixed bottom-48 lg:bottom-28 right-4 lg:right-24 z-[300] w-[calc(100vw-2rem)] max-w-sm lg:w-96 h-[420px] lg:h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200"
          >
            {/* Header */}
            <div className="bg-slate-900 p-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                  <Bot size={20} className="text-slate-950" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Assistant Chada Alyasmin</h3>
                  <p className="text-[10px] text-slate-300">Expert Second Œuvre & Devis</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1 hover:bg-slate-800 rounded-full transition-colors"
                aria-label="Fermer le chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`flex gap-2 max-w-[85%] ${
                      m.role === 'user' ? 'flex-row-reverse' : ''
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center mt-1 shrink-0 ${
                        m.role === 'user'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {m.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                    </div>
                    <div
                      className={`p-3 rounded-2xl text-sm leading-relaxed shadow-xs ${
                        m.role === 'user'
                          ? 'bg-amber-50 text-slate-700 border border-amber-100 rounded-tr-none'
                          : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'
                      }`}
                    >
                      {m.content}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-2 max-w-[85%]">
                    <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center mt-1">
                      <Bot size={14} />
                    </div>
                    <div className="bg-white p-3 rounded-2xl shadow-xs border border-slate-100 rounded-tl-none">
                      <Loader2 size={16} className="animate-spin text-slate-400" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions */}
            {messages.length < 3 && !isLoading && (
              <div className="px-3 py-2 bg-slate-100/70 border-t border-slate-200/50 flex flex-wrap gap-1.5 shrink-0">
                {[
                  'Quels produits sont en stock ?',
                  'Comment demander un devis ?',
                  'Prix trappes de visite',
                  'Livraison hors Casablanca',
                ].map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setInput(chip);
                      setTimeout(() => {
                        const userMsg = chip;
                        setInput('');
                        setMessages((prev) => [...prev, { role: 'user', content: userMsg }]);
                        setIsLoading(true);
                        fetch('/api/chat', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ message: userMsg }),
                        })
                          .then((res) => res.json())
                          .then((data) => {
                            if (data.response) {
                              setMessages((prev) => [
                                ...prev,
                                { role: 'assistant', content: data.response },
                              ]);
                            }
                          })
                          .catch(() => {})
                          .finally(() => setIsLoading(false));
                      }, 50);
                    }}
                    className="text-[11px] font-medium bg-white hover:bg-amber-50 hover:border-amber-400 text-slate-700 px-2.5 py-1 rounded-full border border-slate-200 transition-all text-left shadow-2xs"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="p-3 bg-white border-t border-slate-100 flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Posez votre question technique..."
                className="flex-1 bg-slate-50 border-none focus:ring-2 focus:ring-amber-500 rounded-full px-4 py-2 text-slate-900 text-sm outline-none"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="w-10 h-10 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 rounded-full flex items-center justify-center transition-colors shadow-md"
                aria-label="Envoyer"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChat;
