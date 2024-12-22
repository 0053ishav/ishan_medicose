"use client";
import React, { useEffect, useState } from "react";
import HeaderLogo from "@/components/HeaderLogo";
import Navigation from "@/components/Navigation";
// import { ClerkLoaded, ClerkLoading, UserButton } from '@clerk/nextjs'
import SearchBar from "@/components/SearchBar";
import { useCartSheet } from "@/hooks/use-CartSheetProvider";
import { useCart } from "@/hooks/use-CartContext";
// import WelcomeMsg from '@/components/WelcomeMsg'
// import { Filters } from '@/components/filters'

const Header = () => {
  const { openCart } = useCartSheet();
  const { cart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);

   useEffect(() => {
     const handleScroll = () => {
       if (window.scrollY > 50) {
         setIsScrolled(true);
       } else {
         setIsScrolled(false);
       }
     };
 
     window.addEventListener("scroll", handleScroll);
 
     return () => {
       window.removeEventListener("scroll", handleScroll);
     };
   }, []);

  return (
    <header className="bg-gradient-to-b from-pharma-emerald to-pharma-emerald-light px-4 py-8 lg:px-14 pb-20">
      <div className="max-w-screen-2xl mx-auto">
        <div className="h-full flex items-center justify-between mb-14">
          <div className="flex items-center lg:gap-16">
            <HeaderLogo />
            <Navigation />
          </div>
         
          {!isScrolled && (
            <button
              onClick={openCart}
              className="relative flex items-center justify-center w-14 h-14 bg-gray-200 rounded-full"
            >
              <img src="/shopping-cart.png"  className="-ml-1 w-7 h-6 text-gray-700" alt="shopping cart" />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-sm rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
          )}

          {isScrolled && (
            <button
              onClick={openCart}
              className="fixed bottom-4 right-4 flex items-center justify-center w-14 h-14 bg-gray-200 rounded-full shadow-lg z-50"
            >
              <img src="/shopping-cart.png"  className="w-7 -ml-1 h-6 text-gray-700" alt="shopping cart" />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-sm rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
          )}

          {/* <ClerkLoaded>
                  <UserButton />
                </ClerkLoaded>
                <ClerkLoading> */}
          {/* <Loader2 className='size-8 animate-spin text-slate-100'/> */}
          {/* </ClerkLoading> */}
        </div>
        {/* <WelcomeMsg />
            <Filters /> */}
        <div className="flex justify-center items-center">
          <SearchBar />
        </div>
      </div>
    </header>
  );
};

export default Header;