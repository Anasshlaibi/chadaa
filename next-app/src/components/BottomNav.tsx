"use client";

import { Home, Grid, ShoppingBag, MessageSquare } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '../lib/utils';

function BottomNav() {
  const { itemCount, setIsPanelOpen } = useCart();
  const pathname = usePathname();

  const navItems = [
    { label: 'Accueil', icon: Home, path: '/' },
    { label: 'Catalogue', icon: Grid, path: '/#catalog' },
    { label: 'Devis', icon: ShoppingBag, path: '#', isCart: true },
    { label: 'Contact', icon: MessageSquare, path: '/#contact' },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-[100] bg-white/80 backdrop-blur-xl border-t border-gray-100 px-6 py-3 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.path || (item.path.startsWith('/#') && pathname === '/');
          
          if (item.isCart) {
            return (
              <button
                key={item.label}
                onClick={() => setIsPanelOpen(true)}
                className={cn(
                  "group relative flex flex-col items-center justify-center min-w-[44px] min-h-[44px] space-y-1 transition-all",
                  isActive ? "text-blue-950" : "text-gray-400 hover:text-amber-600"
                )}
              >
                <div className={cn(
                  "p-2 rounded-xl transition-all duration-300",
                  "group-hover:bg-gray-50"
                )}>
                  <item.icon size={20} />
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest">{item.label}</span>
                
                {itemCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-amber-500 text-white text-[8px] font-black rounded-full flex items-center justify-center border-2 border-white">
                    {itemCount}
                  </span>
                )}
              </button>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.path}
              className={cn(
                "group relative flex flex-col items-center justify-center min-w-[44px] min-h-[44px] space-y-1 transition-all",
                isActive ? "text-blue-950" : "text-gray-400 hover:text-amber-600"
              )}
            >
              <div className={cn(
                "p-2 rounded-xl transition-all duration-300",
                isActive ? "bg-amber-50 text-amber-600 shadow-sm" : "group-hover:bg-gray-50"
              )}>
                <item.icon size={20} />
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest">{item.label}</span>
              
              {item.isCart && itemCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-amber-500 text-white text-[8px] font-black rounded-full flex items-center justify-center border-2 border-white">
                  {itemCount}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
