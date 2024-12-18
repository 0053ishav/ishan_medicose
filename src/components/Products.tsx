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
                tags={product.tags}
              />
            ))}
          </div>

          { !tags && <div className="flex justify-center mt-4 space-x-4">
            <Button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-pharma-emerald-light text-white rounded disabled:opacity-50"
            >
              Previous
            </Button>
            <span className="flex items-center text-sm font-medium">{`Page ${currentPage} of ${totalPages}`}</span>
            <Button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-pharma-emerald-light text-white rounded disabled:opacity-50"
            >
              Next
            </Button>
          </div>
          }
        </div>
      )}
    </div>
  );
};

export default Products;
