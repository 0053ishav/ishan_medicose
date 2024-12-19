"use client";

import React from "react";
import { Skeleton } from "./ui/skeleton";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  imageUrl?: string;
  image?: string;
  hoverImageUrl?: string;
  stock: number;
  inStock: boolean;
  loading?: boolean;
  tags?: string;
  context: "categories" | "products";
  categoryId?: string;
  categoryName?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  imageUrl,
  hoverImageUrl,
  image,
  stock,
  inStock,
  loading = false,
  tags,
  context,
  categoryId,
  categoryName,
}) => {

  const router = useRouter();
  
  const handleCardClick = () => {
    if(context === 'categories' && categoryId && categoryName) {
      router.push(`/categories/${categoryId}/${categoryName}/products/${id}`);
    } else {
      router.push(`/product/${id}?tag=${tags || 'all'}`);
    }
  }

  const isAvailable = inStock || stock > 0;

  if (loading) {
    return (
      <div className="border rounded-lg shadow-md p-2">
        <Skeleton className="w-24 h-24 mb-2" />
        <Skeleton className="w-full h-4 mb-1" />
        <Skeleton className="w-2/3 h-3 mb-2" />
        <Skeleton className="w-full h-8 mt-2" />
      </div>
    );
  }

  return (
    <div
      key={id}
      onClick={handleCardClick}
      className="border rounded-lg shadow-sm p-2 relative bg-white transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer"
    >
      {isAvailable ? (
        <span className="absolute z-10 top-1 right-1 bg-pharma-emerald text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
          In Stock
        </span>
      ) : (
        <span className="absolute z-10 top-1 right-1 bg-red-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
          Out of Stock
        </span>
      )}

      {/* Product Image with Hover Effect */}
      <div className="w-24 h-24 mx-auto relative overflow-hidden">
        <img
          src={image || imageUrl}
          alt={name}
          className="object-cover w-full h-full rounded-md transition-opacity duration-300 hover:opacity-0"
        />
        {hoverImageUrl && (
          <img
            src={hoverImageUrl}
            alt={name}
            className="absolute top-0 left-0 w-full h-full object-cover rounded-md opacity-0 transition-opacity duration-300 hover:opacity-100"
          />
        )}
      </div>

      <h3 className="mt-1 text-sm font-semibold text-center">{name}</h3>
      <p className="text-xs text-gray-600 text-center">₹{price}</p>
      <button
        className={`mt-2 w-full text-white py-1 text-xs rounded ${
          isAvailable
            ? "bg-pharma-emerald hover:bg-pharma-emerald-dark"
            : "bg-gray-400 cursor-not-allowed"
        }`}
        disabled={!isAvailable}
      >
        {isAvailable ? "Add to Cart" : "Out of Stock"}
      </button>
    </div>
  );
};

export default ProductCard;
