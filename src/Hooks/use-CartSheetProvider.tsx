'use client';

import React, { ReactNode, useState } from 'react';
import CartSheet from '@/components/CartSheet';
import { CartProvider } from '@/hooks/use-CartContext';

interface CartSheetContextType {
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartSheetContext = React.createContext<CartSheetContextType | undefined>(undefined);

export const CartSheetProvider = ({ children }: { children: ReactNode }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <CartProvider>
      <CartSheetContext.Provider value={{ isCartOpen, openCart, closeCart }}>
        {children}
        <CartSheet />
      </CartSheetContext.Provider>
    </CartProvider>
  );
};

export const useCartSheet = () => {
  const context = React.useContext(CartSheetContext);
  if (!context) {
    throw new Error('useCartSheet must be used within a CartSheetProvider');
  }
  return context;
};
