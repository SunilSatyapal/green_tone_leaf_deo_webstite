'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { InquiryCart, InquiryItem } from '../../src/core/entities/inquiry';
import { Product, ProductVariant } from '../../src/core/entities/product';

interface InquiryCartContextType {
  cart: InquiryCart;
  addItem: (product: Product, variant: ProductVariant, quantity: number) => void;
  removeItem: (productId: string, variantId: string) => void;
  clearCart: () => void;
  itemCount: number;
}

const InquiryCartContext = createContext<InquiryCartContextType | undefined>(undefined);

export function InquiryCartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<InquiryCart>({ items: [] });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
    const saved = localStorage.getItem('leaf_deo_inquiry_cart');
    if (saved) {
      try {
        setCart(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse cart');
      }
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('leaf_deo_inquiry_cart', JSON.stringify(cart));
    }
  }, [cart, isClient]);

  const addItem = (product: Product, variant: ProductVariant, quantity: number) => {
    setCart((prev) => {
      const existingItemIndex = prev.items.findIndex(
        (i) => i.product.id === product.id && i.variant.id === variant.id
      );

      if (existingItemIndex > -1) {
        const newItems = [...prev.items];
        newItems[existingItemIndex].quantityInterest += quantity;
        return { items: newItems };
      }

      return { items: [...prev.items, { product, variant, quantityInterest: quantity }] };
    });
  };

  const removeItem = (productId: string, variantId: string) => {
    setCart((prev) => ({
      items: prev.items.filter((i) => !(i.product.id === productId && i.variant.id === variantId))
    }));
  };

  const clearCart = () => setCart({ items: [] });

  const itemCount = cart.items.reduce((sum, item) => sum + item.quantityInterest, 0);

  return (
    <InquiryCartContext.Provider value={{ cart, addItem, removeItem, clearCart, itemCount }}>
      {children}
    </InquiryCartContext.Provider>
  );
}

export const useInquiryCart = () => {
  const context = useContext(InquiryCartContext);
  if (context === undefined) {
    throw new Error('useInquiryCart must be used within an InquiryCartProvider');
  }
  return context;
};
