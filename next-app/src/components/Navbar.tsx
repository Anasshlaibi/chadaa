"use client";

import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Menu, Search, ChevronDown, X, Globe } from 'lucide-react';
import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { cn } from '../lib/utils';
import { getCategoryGroups } from '../data/products';
import { useCart } from '../hooks/useCart';
import Image from 'next/image';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { itemCount, setIsPanelOpen } = useCart();
  const categoryGroups = getCategoryGroups();

  const currentLang = pathname.startsWith('/products') 
    ? (searchParams.get('lang') || 'fr')
    : pathname.startsWith('/ma') ? 'ma' : pathname.startsWith('/en') ? 'en' : 'fr';
  
  const languages = [
    { code: 'fr', flag: '🇫🇷', name: 'Français', href: pathname.startsWith('/products') ? '/products?lang=fr' : '/fr' },
    { code: 'ma', flag: '🇲🇦', name: 'Maroc', href: pathname.startsWith('/products') ? '/products?lang=ma' : '/ma' },
    { code: 'en', flag: '🇬🇧', name: 'English', href: pathname.startsWith('/products') ? '/products?lang=en' : '/en' }
  ];

  const sortedLanguages = [...languages].sort((a, b) => {
    if (a.code === currentLang) return -1;
    if (b.code === currentLang) return 1;
    return 0;
  });

  const handleCategoryClick = (category: string) => {
    const hash = `#catalog?filter=${encodeURIComponent(category)}`;
    if (pathname !== '/fr' && pathname !== '/') {
      router.push('/fr' + hash);
    } else {
      window.location.hash = hash;
      const el = document.getElementById('catalog');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveDropdown(null);
    setIsMenuOpen(false);
  };
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-[999] transition-all duration-500 ease-in-out border-b",
          isScrolled 
            ? "bg-white/90 backdrop-blur-xl border-gray-100 py-3 sm:py-4 shadow-glass" 
            : "bg-white/80 backdrop-blur-lg lg:bg-transparent border-transparent py-4 sm:py-8"
        )}
      >
        {/* Scroll Progress Bar */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-1 bg-amber-500 origin-left z-110"
          style={{ scaleX }}
        />

        <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 2xl:px-20">
          <div className="flex justify-between items-center">
            {/* Logo Section */}
            <Link 
              href="/" 
              className="flex items-center space-x-3 sm:space-x-4 group cursor-pointer"
              onClick={(e) => {
                if (pathname === '/' || pathname === '/fr') {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            >
              <div className="relative shrink-0">
                <div className={cn(
                  "relative transition-all duration-500 group-hover:scale-105",
                  isScrolled ? "w-10 h-10 sm:w-12 sm:h-12" : "w-10 h-10 sm:w-16 sm:h-16"
                )}>
                  <Image 
                    src="/logo.png" 
                    alt="Chada Alyasmin Logo" 
                    fill
                    className="object-contain"
                  />
                </div>
                <motion.div 
                  className="absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-yellow-500 rounded-full border-2 border-white pointer-events-none"
                  animate={{ scale: isScrolled ? 0.8 : 1 }}
                />
              </div>
              <div className="flex flex-col">
                <span className={cn(
                  "font-black tracking-tighter text-blue-950 leading-none transition-all duration-500",
                  isScrolled ? "text-base sm:text-lg" : "text-xl sm:text-2xl"
                )}>
                  CHADA <span className="text-gray-400">ALYASMIN</span>
                </span>
                {!isScrolled && (
                  <motion.span 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[10px] uppercase tracking-[0.3em] font-black text-yellow-600 mt-1 hidden lg:block"
                  >
                    Construction & Design
                  </motion.span>
                )}
              </div>
            </Link>

            {/* Navigation Links */}
            <div className="hidden lg:flex items-center space-x-12">
              <Link 
                href="/" 
                onClick={() => setActiveDropdown(null)}
                className="flex items-center text-[11px] font-black uppercase tracking-[0.2em] text-blue-950"
              >
                Accueil
              </Link>
              
              <div 
                className="relative group"
                onMouseEnter={() => setActiveDropdown('products')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link 
                  href="/products"
                  onClick={() => setActiveDropdown(null)}
                  className={cn(
                    "flex items-center text-[11px] font-black uppercase tracking-[0.2em] transition-colors",
                    activeDropdown === 'products' ? "text-yellow-600" : "text-gray-400 hover:text-blue-950"
                  )}
                >
                  <span>Produits</span>
                  <ChevronDown size={14} className={cn("ml-1 transition-transform duration-300 text-yellow-500", activeDropdown === 'products' && "rotate-180")} />
                </Link>

                {/* Mega Menu */}
                <AnimatePresence>
                  {activeDropdown === 'products' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[850px] bg-white rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden p-10 grid grid-cols-3 gap-10"
                    >
                      {categoryGroups.map((group) => (
                        <div key={group.name}>
                          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-yellow-600 mb-6 flex items-center">
                            <span className="w-6 h-[2px] bg-yellow-500 mr-3" />
                            {group.name}
                          </h4>
                          <ul className="space-y-4">
                            {group.categories.map((cat) => (
                              <li key={cat}>
                                <button 
                                  onClick={() => handleCategoryClick(cat)}
                                  className="text-sm font-bold text-gray-400 hover:text-blue-950 transition-colors flex items-center group/item"
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-gray-200 mr-3 group-hover/item:bg-yellow-500 transition-colors" />
                                  {cat}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {[
                { label: 'À Propos', id: 'about' },
                { label: 'Projets', id: 'projets' },
                { label: 'Contact', id: 'contact' }
              ].map((item) => (
                <Link 
                  key={item.label} 
                  href={`/#${item.id}`}
                  onClick={() => setActiveDropdown(null)}
                  className="flex items-center text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-blue-950 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Action Icons */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Language Switcher */}
              <div 
                className="relative group hidden sm:block"
                onMouseEnter={() => setActiveDropdown('lang')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1.5 px-3 py-2 rounded-full text-blue-950 hover:bg-gray-100 transition-all min-h-[44px]">
                  <Globe size={15} className="text-blue-950/60" />
                  <span className="text-base">{sortedLanguages[0].flag}</span>
                  <ChevronDown size={12} className="text-blue-950/40" />
                </button>
                <AnimatePresence>
                  {activeDropdown === 'lang' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      className="absolute top-full right-0 mt-2 w-40 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden py-2 z-[1000]"
                    >
                      {sortedLanguages.map((lang) => (
                        <Link key={lang.code} href={lang.href} className="flex items-center px-4 py-2 hover:bg-gray-50 transition-colors">
                          <span className="mr-3 text-lg">{lang.flag}</span>
                          <span className={cn("text-xs font-bold", lang.code === currentLang ? "text-amber-500" : "text-blue-950")}>{lang.name}</span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <button 
                onClick={() => {
                  const el = document.getElementById('catalog');
                  el?.scrollIntoView({ behavior: 'smooth' });
                  setTimeout(() => {
                    const input = el?.querySelector('input');
                    (input as HTMLInputElement)?.focus();
                  }, 800);
                }}
                className="hidden sm:flex items-center justify-center min-w-[44px] min-h-[44px] p-2.5 text-blue-950 hover:bg-gray-100 rounded-full transition-all"
              >
                <Search size={20} />
              </button>
              
              <div className="h-6 w-[1px] bg-gray-200 hidden sm:block mx-1"></div>

              <button 
                onClick={() => setIsPanelOpen(true)}
                className="relative group min-w-[44px] min-h-[44px] flex items-center justify-center bg-blue-950 text-white rounded-2xl hover:bg-amber-500 transition-all duration-300 shadow-xl hover:shadow-amber-500/20"
              >
                <ShoppingCart size={20} className="group-hover:scale-110 transition-transform" />
                {itemCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-black text-blue-950 shadow-lg group-hover:bg-blue-950 group-hover:text-white transition-colors"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </button>

              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center text-blue-950 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[1000] bg-white p-8 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-10">
              <span className="font-black text-2xl text-blue-950 tracking-tighter">MENU</span>
              <button 
                onClick={() => setIsMenuOpen(false)} 
                className="min-w-[44px] min-h-[44px] flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-12">
              {/* Main Site Links */}
              <div className="space-y-6">
                <h3 className="text-xs font-black uppercase tracking-widest text-yellow-600">Navigation</h3>
                <div className="flex flex-col space-y-4">
                  {[
                    { label: 'Accueil', href: '/' },
                    { label: 'Produits', href: '/products' },
                    { label: 'À Propos', href: '/#about' },
                    { label: 'Projets', href: '/#projets' },
                    { label: 'Contact', href: '/#contact' }
                  ].map((link) => (
                    <Link 
                      key={link.label}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-3xl font-black text-blue-950 hover:text-yellow-600 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="h-px bg-gray-100 w-full" />
              
              {/* Mobile Language Switcher */}
              <div className="space-y-6">
                <h3 className="text-xs font-black uppercase tracking-widest text-yellow-600">Langue / Région</h3>
                <div className="flex space-x-4">
                  {sortedLanguages.map((lang) => (
                    <Link key={lang.code} href={lang.href} onClick={() => setIsMenuOpen(false)} className={cn("flex items-center justify-center p-3 border-2 rounded-xl transition-colors", lang.code === currentLang ? "border-amber-500 bg-amber-50" : "border-gray-100 hover:border-blue-950")}>
                      <span className="text-2xl">{lang.flag}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="h-px bg-gray-100 w-full" />
              {categoryGroups.map((group) => (
                <div key={group.name} className="space-y-6">
                  <h3 className="text-xs font-black uppercase tracking-widest text-yellow-600">{group.name}</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {group.categories.map((cat) => (
                      <button 
                        key={cat} 
                        onClick={() => handleCategoryClick(cat)}
                        className="text-left text-xl font-black text-blue-950 hover:text-yellow-600 transition-colors"
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
