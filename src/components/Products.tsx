"use client";

import React, { useState } from "react";
import ProductCard from "@/components/ProductCard";
import useFetchProducts from "@/lib/hooks/useFetchProducts";
import {
  Carousel,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselContent,
} from "@/components/ui/carousel";

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
    <div className="container mx-auto px-4 py-6 overflow-hidden">
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <ProductCard
              key={index}
              id=""
              name="Loading..."
              price={0}
              discountedPrice={0}
              discountPercentage={0}
              stock={0}
              inStock={false}
              loading={true}
              context="products"
            />
          ))}
        </div>
      ) : (
        <div className="relative">
          <Carousel className="w-full" aria-label="Product Carousel">
            <CarouselContent>
              {paginatedProducts.map((product) => (
                <CarouselItem
                  key={product.id}
                  className="lg:basis-1/5 sm:basis-1/3 basis-1/2"
                >
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    discountedPrice={product.discountedPrice!}
                    discountPercentage={product.discountPercentage}
                    imageUrl={product.imageUrl}
                    hoverImageUrl={product.hoverImageUrl || product.imageUrl}
                    stock={product.stock}
                    inStock={product.inStock}
                    tags={tags}
                    context="products"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious
              aria-label="Previous Products"
              className="absolute top-1/2 -translate-y-1/2 -left-4 bg-white shadow-lg p-2 rounded-full z-10 sm:left-4"
            />
            <CarouselNext
              aria-label="Next Products"
              className="absolute top-1/2 -translate-y-1/2 -right-4 bg-white shadow-lg p-2 rounded-full z-10 sm:right-4"
            />
          </Carousel>

          {/* Pagination */}
          {!tags && (
            <div className="flex justify-center items-center mt-6 space-x-4">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                aria-label="Previous Page"
                className={`w-10 h-10 flex items-center justify-center rounded-md transition-all ${
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
                    aria-label={`Go to page ${index + 1}`}
                    className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium transition-all ${
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
                aria-label="Next Page"
                className={`w-10 h-10 flex items-center justify-center rounded-md transition-all ${
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