"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { ProductCart } from "@/types";

const WishlistContext = createContext<{
  wishlistProducts: ProductCart[];
  setWishlistProducts: React.Dispatch<React.SetStateAction<ProductCart[]>>;
}>({
  wishlistProducts: [],
  setWishlistProducts: () => {},
});

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [wishlistProducts, setWishlistProducts] = useState<ProductCart[]>([]);

  return (
    <WishlistContext.Provider value={{ wishlistProducts, setWishlistProducts }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
