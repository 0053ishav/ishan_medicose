"use client";

import React, { useState } from "react";
import ProductCard from "./ProductCard";
import useFetchProducts from "@/Hooks/useFetchProducts";
import { Button } from "./ui/button";

const Products = ({ tags }: { tags?: string }) => {
  const { loading, products } = useFetchProducts(tags);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <ProductCard
              key={index}
              id=""
              name=""
              price=""
              stock={0}
              inStock={false}
              loading={true}
              context="products"
            />
          ))}
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {paginatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                imageUrl={product.imageUrl}
                hoverImageUrl={product.hoverImageUrl || product.imageUrl}
                image={product.image}
                stock={product.stock}
                inStock={product.inStock}
                tags={tags}
                context="products"
              />
            ))}
          </div>

{!tags && (
  <div className="flex justify-center items-center mt-6 space-x-4">
    <button
      onClick={goToPreviousPage}
      disabled={currentPage === 1}
      className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${
        currentPage === 1
          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
          : "bg-pharma-emerald-light text-white hover:scale-110 hover:bg-pharma-emerald-dark"
      }`}
    >
      ←
    </button>
    <div className="flex items-center space-x-2">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => setCurrentPage(index + 1)}
          className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition-all ${
            currentPage === index + 1
              ? "bg-pharma-emerald-light text-white"
              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
          }`}
        >
          {index + 1}
        </button>
      ))}
    </div>
    <button
      onClick={goToNextPage}
      disabled={currentPage === totalPages}
      className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${
        currentPage === totalPages
          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
          : "bg-pharma-emerald-light text-white hover:scale-110 hover:bg-pharma-emerald-dark"
      }`}
    >
      →
    </button>
  </div>
)}


        </div>
      )}
    </div>
  );
};

export default Products;
