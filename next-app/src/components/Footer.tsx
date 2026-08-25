import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, ArrowRight, Instagram, Facebook, MapPin, ShieldCheck, Tag, BookOpen } from 'lucide-react';
import { CATEGORY_GROUPS } from '../data/products';

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-950 text-white pt-20 pb-12 overflow-hidden relative font-sans">
      <div className="max-w-[1920px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 mb-16">
          {/* Brand & Mission */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="relative w-10 h-10 shadow-lg">
                <Image 
                  src="/logo.png" 
                  alt="Chada Alyasmin Logo" 
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                CHADA <span className="text-amber-500">ALYASMIN</span>
              </span>
            </div>
            
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Fabricant et distributeur de référence en matériaux de second œuvre au Maroc depuis 2017. Trappes de visite sur mesure, faux plafonds BA13, ossatures métalliques et isolation thermique à Casablanca.
            </p>

            <div className="flex space-x-3 pt-2">
              <a
                href="https://www.facebook.com/chadaalyasmin"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-amber-500 hover:text-blue-950 transition-all"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://www.instagram.com/chadaalyasmin"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-amber-500 hover:text-blue-950 transition-all"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-amber-500 mb-6 flex items-center gap-2">
              <ShieldCheck size={14} />
              <span>Nos Produits</span>
            </h4>
            <ul className="space-y-3 text-xs text-gray-400 font-medium">
              {CATEGORY_GROUPS.slice(0, 6).map((group) => (
                <li key={group.slug}>
                  <Link
                    href={`/products/${group.slug}`}
                    className="hover:text-white transition-colors flex items-center group"
                  >
                    <ArrowRight size={12} className="mr-1.5 opacity-0 group-hover:opacity-100 transition-opacity text-amber-500" />
                    <span>{group.name}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/products"
                  className="text-amber-400 hover:underline font-bold inline-block mt-1"
                >
                  Tous les produits →
                </Link>
              </li>
            </ul>
          </div>

          {/* Pricing & Guides */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-amber-500 mb-6 flex items-center gap-2">
              <Tag size={14} />
              <span>Ressources</span>
            </h4>
            <ul className="space-y-3 text-xs text-gray-400 font-medium">
              <li>
                <Link href="/prix" className="hover:text-white transition-colors">
                  Grille des Prix
                </Link>
              </li>
              <li>
                <Link href="/guide" className="hover:text-white transition-colors">
                  Guides Techniques
                </Link>
              </li>
              <li>
                <Link href="/devis" className="hover:text-white transition-colors">
                  Demande de Devis
                </Link>
              </li>
              <li>
                <Link href="/llms.txt" className="hover:text-white transition-colors text-[11px] text-gray-500">
                  AI Context (llms.txt)
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-amber-500 mb-6">
              Contact & Dépôt Casablanca
            </h4>
            
            <div className="space-y-4 text-xs text-gray-300">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-amber-500 shrink-0 mt-0.5" />
                <span>Boulevard Mohammed VI, Casablanca, Maroc</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={16} className="text-amber-500 shrink-0" />
                <a href="tel:+212661138204" className="hover:text-white font-bold">
                  +212 661-138 204
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={16} className="text-amber-500 shrink-0" />
                <a href="mailto:contact@chadaalyasmin.ma" className="hover:text-white">
                  contact@chadaalyasmin.ma
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-400 gap-4">
          <p>© 2026 Chada Alyasmin SARL. Tous droits réservés. Casablanca, Maroc.</p>
          <div className="flex items-center space-x-6">
            <Link href="/products" className="hover:text-white transition-colors">
              Catalogue
            </Link>
            <Link href="/prix" className="hover:text-white transition-colors">
              Prix
            </Link>
            <Link href="/guide" className="hover:text-white transition-colors">
              Guides
            </Link>
            <Link href="/devis" className="hover:text-white transition-colors">
              Devis
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
