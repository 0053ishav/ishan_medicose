'use client';
import { searchProducts } from "@/lib/appwrite";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useCallback } from "react";

interface Product {
  id: string;
  name: string;
  description: string;
}

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [noProductsFound, setNoProductsFound] = useState(false);

  const inputRef = React.useRef<HTMLInputElement>(null);
  const dialogRef = React.useRef<HTMLDivElement>(null);

  const router = useRouter();

  useEffect(() => {
    if (filteredProducts.length === 0 && searchQuery.trim() !== "") {
      const timer = setTimeout(() => {
        setNoProductsFound(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  
    setNoProductsFound(false);
  }, [filteredProducts, searchQuery]);

  

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 200);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  useEffect(() => {
    if (debouncedSearchQuery.trim() === "") {
      setFilteredProducts([]);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await searchProducts(debouncedSearchQuery);
        const products = response.map((doc) => ({
          id: doc.$id,
          name: doc.name,
          description: doc.description,
        }));
        setFilteredProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [debouncedSearchQuery]);

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (e.key === "/") {
      e.preventDefault();
      setIsModalOpen(true);
      inputRef.current?.focus();
    }

    if (e.key === "Escape") {
      e.preventDefault();
      setIsModalOpen(false);
      inputRef.current?.blur();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  useEffect(() => {
    if (isModalOpen) {
      inputRef.current?.focus();
    }
  }, [isModalOpen]);

  const handleClickOutside = (e: MouseEvent) => {
    if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isModalOpen]);

  const handleModalChange = (open: boolean) => {
    setIsModalOpen(open);
    if (!open) {
      setFilteredProducts([]);
    }
  };

  const handleProductClick = (id: string) => {
    const currentPath = window.location.pathname;
  
    if (currentPath.includes(`/product/`)) {
      const newPath = currentPath.replace(/\/product\/[^/]+$/, `/product/${id}`);
      router.push(newPath);
    } else {
      router.push(`/product/${id}`);
    }
    setIsModalOpen(false);
    setSearchQuery("");
  };
  
  

  return (
    <div className="relative w-96">
      <div
        className="flex items-center border rounded-lg px-3 py-2 bg-white shadow cursor-pointer justify-between"
        onClick={() => setIsModalOpen(true)}
      >
        <span className="ml-2 text-gray-500">Search products...</span>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">/</span>
        </kbd>
      </div>

      {isModalOpen && (
        <div 
          onClick={(e) => {
            if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
              setIsModalOpen(false);
            }
          }}
          className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50"
        >
          <div 
            ref={dialogRef}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg shadow-lg w-3/4 max-w-lg">
            <div className="border-b px-4 py-2 flex justify-end items-center">
              <button
                className="text-gray-400 hover:text-gray-600"
                onClick={() => handleModalChange(false)}
              >
                &times;
              </button>
            </div>

            <div className="p-4">
              <input
                ref={inputRef}
                type="text"
                placeholder="Type to search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-pharma-emerald"
              />
            </div>

            <div className="px-4 py-2 max-h-64 overflow-y-auto">
              {loading ? (
                <Loader2
                  className="animate-spin h-6 w-6 mb-2 text-pharma-emerald mx-auto"
                />
              ) : noProductsFound ? ( 
                <p className="text-gray-500">No products found</p>
              ) : (
                <ul>
                  {filteredProducts.map((product) => (
                    <li
                      key={product.id}
                      className="p-2 border-b last:border-none cursor-pointer hover:bg-gray-100"
                      onClick={() => handleProductClick(product.id)}
                    >
                      <div className="font-semibold">{product.name}</div>
                      <div className="text-sm text-gray-500">
                        {product.description}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
