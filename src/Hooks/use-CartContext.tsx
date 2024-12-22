'use client'

import React, { createContext, useContext, useState } from 'react'

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (item: CartItem) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (item: CartItem) => {
        setCart((prev) => {
            const existingItem = prev.find((cartItem) => cartItem.id === item.id);

            if(existingItem) {
                return prev.map((cartItem) => 
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                        : cartItem
                );
            }
            return [...prev, item];
        })
    }

    const removeFromCart = (item: CartItem) => {
        setCart((prev) => {
            const existingItem = prev.find((cartItem) => cartItem.id === item.id);

            if(existingItem?.quantity === 1) {
                return prev.filter((cartItem) => cartItem.id !== item.id);
            }

            return prev.map((cartItem) => 
                cartItem.id === item.id
                    ? { ...cartItem, quantity: cartItem.quantity - 1 }
                    : cartItem
            );
        });
    }

    const clearCart = () => setCart([]);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}