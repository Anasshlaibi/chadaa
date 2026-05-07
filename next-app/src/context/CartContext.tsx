"use client";

import React, { useState, type ReactNode } from 'react';
import { type Product } from '../data/products';
import { type CartItem } from '../types/cart';
import { CartContext } from './CartContextRegistry';

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [notification, setNotification] = useState<string | null>(null);
  const [isPanelOpen, setIsPanelOpenState] = useState(false);

  const setIsPanelOpen = (isOpen: boolean) => {
    setIsPanelOpenState(isOpen);
    if (isOpen) setNotification(null);
  };

  const addToQuote = (product: Product, quantity: number = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    
    // Trigger notification
    setNotification(null); // Reset if exists
    setTimeout(() => {
      setNotification(`${quantity} x ${product.name} ajouté au devis`);
    }, 10);

    // Auto-hide notification
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const removeFromQuote = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setItems((prev) => 
      prev.map((item) => 
        item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const clearQuote = () => setItems([]);

  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      items, 
      itemCount, 
      addToQuote, 
      removeFromQuote, 
      updateQuantity,
      clearQuote, 
      notification,
      isPanelOpen,
      setIsPanelOpen
    }}>
      {children}
    </CartContext.Provider>
  );
};

