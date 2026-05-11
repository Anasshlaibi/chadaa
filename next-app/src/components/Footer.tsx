import React from 'react';
import { MapPin, Phone, Mail, ArrowRight, Instagram, Facebook, Twitter, Linkedin } from 'lucide-react';
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer className="bg-corporate-blue-dark text-white pt-24 pb-12 overflow-hidden relative">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-corporate-blue opacity-5 -skew-x-12 translate-x-1/2"></div>
      
      <div className="max-w-[1920px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          {/* Brand Presence */}
          <div className="lg:col-span-5">
            <div className="flex items-center space-x-3 mb-8">
              <div className="relative w-10 h-10 shadow-lg">
                <Image 
                  src="/logo.png" 
                  alt="Chada Alyasmin Logo" 
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-2xl font-black tracking-tighter">CHADA <span className="text-corporate-blue-light">ALYASMIN</span></span>
            </div>
            <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-md">
              Spécialiste des solutions de construction haut de gamme et des finitions intérieures. En partenariat avec les leaders du secteur pour offrir l'excellence depuis 2017.
            </p>
            <div className="flex space-x-5">
              {[Instagram, Facebook, Twitter, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="p-2 border border-white/10 rounded-full text-gray-400 hover:bg-white hover:text-corporate-blue-dark transition-all duration-300">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Nav */}
          <div className="lg:col-span-3 sm:grid sm:grid-cols-2 lg:block sm:gap-8">
            <div className="mb-10 lg:mb-12">
              <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-corporate-gold mb-6">Explorer</h4>
              <ul className="space-y-4 text-gray-400 font-medium">
                <li><a href="#catalog" className="hover:text-white flex items-center group transition-colors"><ArrowRight size={14} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" /> Catalogue Produits</a></li>
                <li><a href="#catalog" className="hover:text-white flex items-center group transition-colors"><ArrowRight size={14} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" /> Demander un Devis</a></li>
                <li><a href="#projets" className="hover:text-white flex items-center group transition-colors"><ArrowRight size={14} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" /> Projets</a></li>
              </ul>
            </div>
          </div>

          {/* Global HQ Only */}
          <div className="lg:col-span-4">
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-corporate-gold mb-8">Informations de Contact</h4>
            <div className="space-y-8">
              <div className="flex items-center group">
                <div className="p-3 bg-white/5 rounded-xl text-corporate-blue-light mr-4 group-hover:bg-corporate-blue-light group-hover:text-white transition-all duration-300">
                  <Phone size={20} />
                </div>
                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Ligne Directe</h5>
                  <p className="text-gray-300 font-bold text-lg tracking-tight">+212 661-138 204</p>
                </div>
              </div>

              <div className="flex items-center group">
                <div className="p-3 bg-white/5 rounded-xl text-corporate-blue-light mr-4 group-hover:bg-corporate-blue-light group-hover:text-white transition-all duration-300">
                  <Mail size={20} />
                </div>
                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Demande par Email</h5>
                  <a href="mailto:contact@chadaalyasmin.ma" className="text-gray-300 font-medium hover:text-white transition-colors">
                    contact@chadaalyasmin.ma
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 font-medium">
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
            <p>© 2026 Chada Alyasmin. Tous droits réservés.</p>
            <p className="text-[10px] opacity-40 hover:opacity-100 transition-opacity">
              Made by <a href="tel:0673011873" className="hover:text-amber-500 transition-colors">0673011873</a>
            </p>
          </div>
          <div className="flex space-x-8 mt-6 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Politique de Confidentialité</a>
            <a href="#" className="hover:text-white transition-colors">Conditions d'Utilisation</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
