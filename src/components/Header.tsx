"use client";
import React, { useEffect, useState } from "react";
import HeaderLogo from "@/components/HeaderLogo";
import Navigation from "@/components/Navigation";
import SearchBar from "@/components/SearchBar";
import { useCartSheet } from "@/hooks/use-CartSheetProvider";
import { useCart } from "@/hooks/use-CartContext";
import { Button } from "@/components/ui/button";
import HeaderBox from "./HeaderBox";
import { getLoggedInUser } from "@/actions/user.actions";

const Header = () => {
  const { openCart } = useCartSheet();
  const { cart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const loggedIn = await getLoggedInUser();
      setLoggedInUser(loggedIn);
    }

    fetchUser();

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
    <header className="bg-gradient-to-b from-pharma-emerald to-pharma-emerald-light px-4 md:py-8 lg:px-14 md:pb-20">
      <div className="max-w-screen-2xl mx-auto">
        <div className="h-full flex items-center justify-between md:mb-14">
          <div className="flex items-center lg:gap-16">
            <HeaderLogo />
            <Navigation />
            </div>
            <div className="flex gap-4 items-center justify-center">
            <HeaderBox 
            type="header"
            title="Welcome"
            user={loggedInUser?.firstName || 'Guest'}
            subtext=""
            />
         
          {!isScrolled && (
            <Button
              onClick={openCart}
              className="relative flex items-center justify-center w-12 h-12 rounded-full bg-white fill-foreground p-2 shadow-lg cursor-pointer transform transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-2xl hover:bg-pharma-emerald-light/10 active:scale-95 active:shadow-inner"
            >
              <img src="/shopping-cart.png"  className="-ml-1 w-7 h-6 text-gray-700" alt="shopping cart" />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-sm rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Button>
          )}

          {isScrolled && (
            <button
              onClick={openCart}
              className="fixed bottom-4 right-4 flex items-center justify-center w-14 h-14 bg-pharma-emerald rounded-full shadow-lg z-50 p-2 cursor-pointer transform transition-transform duration-200 ease-in-out hover:bg-pharma-emerald-dark active:scale-95"
              >
              <img src="/shopping-cart.png"  className="w-7 -ml-1 h-6 text-gray-700" alt="shopping cart" />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-sm rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
          )}
        </div>
        </div>

        <div className="hidden md:flex justify-center items-center">
          <SearchBar autoFocus={false} />
        </div>
      </div>
    </header>
  );
};

export default Header;