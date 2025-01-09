"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Home, Search, Heart, ShoppingCart, User } from "lucide-react";
import SearchBar from "@/components/SearchBar";

const BottomNavigation = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchModalRef = useRef<HTMLDivElement | null>(null);

  const tabs = [
    { name: "Home", icon: <Home />, href: "/" },
    { name: "Search", icon: <Search />, href: "#" },
    { name: "Wishlist", icon: <Heart />, href: "/wishlist" },
    { name: "Orders", icon: <ShoppingCart />, href: "/orders" },
    { name: "Account", icon: <User />, href: "/account" },
  ];

  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const closeSearchModal = () => {
    setIsSearchOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchModalRef.current && !searchModalRef.current.contains(event.target as Node)) {
        closeSearchModal();
      }
    };

    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]);

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      closeSearchModal();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <>
      <nav className="fixed bottom-0 left-0 w-full bg-white shadow-lg border-t border-gray-200 md:hidden z-30">
        <ul className="flex justify-around items-center h-16">
          {tabs.map((tab) => (
            <li key={tab.name} className="flex flex-col items-center space-y-1">
              <a
                href={tab.href}
                onClick={tab.name === "Search" ? (e) => { e.preventDefault(); handleSearchClick(); } : undefined}
                className="flex flex-col items-center text-gray-500 hover:text-pharma-emerald-light transition duration-150"
              >
                {tab.icon}
                <span className="text-xs">{tab.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {isSearchOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center">
          <div
            ref={searchModalRef}
            className="absolute top-0 flex justify-center items-center w-full max-w-lg p-6 rounded-lg"
          >
            <SearchBar autoFocus={true} />
          </div>
        </div>
      )}
    </>
  );
};

export default BottomNavigation;
