"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { getGuestCart, saveGuestCart, clearGuestCart } from "@/lib/cookies";
import {
  fetchProductsByIds,
  fetchUserCart,
  updateUserCartInDb,
} from "@/lib/appwrite";
import { ProductCart } from "@/types";
import { getLoggedInUser } from "@/actions/user.actions";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  discountedPrice: number;
  quantity: number;
  imageUrl: string | undefined;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
  clearCart: () => void;
}

export interface CartItemDB {
  id: string;
  quantity: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loggedInUser, setLoggedInUser] = useState<boolean>(false);

  const [user, setUser] = useState<string>();

  useEffect(() => {
    const fetchUser = async () => {
      const loggedIn = await getLoggedInUser();
      if (loggedIn) {
        setLoggedInUser(true);
        setUser(loggedIn.$id);
        await syncCartForLoggedInUser(loggedIn.$id);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const guestCart = await getGuestCart();

        const guestCartIds = guestCart.map((item) => item.id);

        if (guestCart.length > 0) {
          const products: ProductCart[] = await fetchProductsByIds(
            guestCartIds
          );

          const formattedCart = products.map((product) => ({
            id: product.$id,
            name: product.name,
            price: product.price,
            discountedPrice: product.discountedPrice,
            quantity:
              guestCart.find((item) => item.id === product.$id)?.quantity || 1,
            imageUrl: product.imageUrl,
          }));
          setCart(formattedCart);
        }
      } catch (error) {
        console.error("Error loading guest cart:", error);
      }
    })();
  }, []);

  const syncCartForLoggedInUser = async (userId: string) => {
    try {
      const userCartItems: CartItemDB[] = await fetchUserCart(userId);
      const guestCart: CartItemDB[] = getGuestCart();

      const mergedCart: CartItemDB[] = [...guestCart, ...userCartItems].reduce<
        CartItemDB[]
      >((acc, item) => {
        const existing = acc.find((cartItem) => cartItem.id === item.id);
        if (existing) {
          existing.quantity += item.quantity;
        } else {
          acc.push(item);
        }
        return acc;
      }, []);

      await updateUserCartInDb(userId, mergedCart);

      const mergedCartIds = mergedCart.map((item) => item.id);
      if (mergedCartIds.length > 0) {
        const products: ProductCart[] = await fetchProductsByIds(mergedCartIds);

        const formattedCart = products.map((product) => ({
          id: product.$id,
          name: product.name,
          price: product.price,
          discountedPrice: product.discountedPrice,
          quantity:
            mergedCart.find((item) => item.id === product.$id)?.quantity || 1,
          imageUrl: product.imageUrl,
        }));

        setCart(formattedCart);
      }
      clearGuestCart();
    } catch (error) {
      console.error("Error syncing cart:", error);
    }
  };

  const addToCart = async (product: CartItem) => {
    if (!loggedInUser) {
      setCart((prevCart) => {
        const existingItem = prevCart.find(
          (cartItem) => cartItem.id === product.id
        );

        let updatedCart;
        if (existingItem) {
          updatedCart = prevCart.map((cartItem) =>
            cartItem.id === product.id
              ? { ...cartItem, quantity: cartItem.quantity + product.quantity }
              : cartItem
          );
        } else {
          updatedCart = [...prevCart, product];
        }
        saveGuestCart(
          updatedCart.map(({ id, quantity }) => ({ id, quantity }))
        );
        return updatedCart;
      });
    } else {
      setCart((prevCart) => {
        const existingItem = prevCart.find(
          (cartItem) => cartItem.id === product.id
        );

        let updatedCart;
        if (existingItem) {
          updatedCart = prevCart.map((cartItem) =>
            cartItem.id === product.id
              ? { ...cartItem, quantity: cartItem.quantity + product.quantity }
              : cartItem
          );
        } else {
          updatedCart = [...prevCart, product];
        }

        if (user) {
          updateUserCartInDb(
            user,
            updatedCart.map(({ id, quantity }) => ({ id, quantity }))
          );
        }
        return updatedCart;
      });
    }
  };

  const removeFromCart = async (item: CartItem) => {
    if (!loggedInUser) {
      setCart((prevCart) => {
        const existingItem = prevCart.find(
          (cartItem) => cartItem.id === item.id
        );

        if (!existingItem) return prevCart;

        let updatedCart;
        if (existingItem.quantity === 1) {
          updatedCart = prevCart.filter((cartItem) => cartItem.id !== item.id);
        } else {
          updatedCart = prevCart.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity - 1 }
              : cartItem
          );
        }
        saveGuestCart(
          updatedCart.map(({ id, quantity }) => ({ id, quantity }))
        );
        return updatedCart;
      });
    } else {
      setCart((prevCart) => {
        const existingItem = prevCart.find(
          (cartItem) => cartItem.id === item.id
        );

        if (!existingItem) return prevCart;

        let updatedCart;
        if (existingItem.quantity === 1) {
          updatedCart = prevCart.filter((cartItem) => cartItem.id !== item.id);
        } else {
          updatedCart = prevCart.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity - 1 }
              : cartItem
          );
        }
        if (user) {
          updateUserCartInDb(
            user,
            updatedCart.map(({ id, quantity }) => ({ id, quantity }))
          );
        }
        return updatedCart;
      });
    }
  };

  const clearCart = async () => {
    if (!loggedInUser) {
      setCart([]);
      clearGuestCart();
    } else {
      const userId = loggedInUser;
      setCart([]);
      if (user) {
        await updateUserCartInDb(user, []);
      }
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};