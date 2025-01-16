"use client";

import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/hooks/use-CartContext";
import Image from "next/image";
import { updateWishlist } from "@/lib/appwrite";
import { getLoggedInUser } from "@/actions/user.actions";
import { Button } from "./ui/button";
import { useCachedUser } from "@/lib/hooks/useCachedUser";
import { CheckCircle, Heart, XCircle } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  discountedPrice: number;
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
  discountPercentage: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  discountedPrice,
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
  discountPercentage,
}) => {
  const router = useRouter();
  const { addToCart } = useCart();
  const [isInWishlist, setIsInWishlist] = useState(false);

  const handleCardClick = () => {
    if (context === "categories" && categoryId && categoryName) {
      router.prefetch(
        `/categories/${categoryId}/${categoryName}/products/${id}`
      );
      router.push(`/categories/${categoryId}/${categoryName}/products/${id}`);
    } else {
      router.prefetch(`/product/${id}?tag=${tags || "all"}`);
      router.push(`/product/${id}?tag=${tags || "all"}`);
    }
  };

  const handleAddToCart = () => {
    addToCart({
      id,
      name,
      price,
      discountedPrice,
      quantity: 1,
      imageUrl,
    });
  };

  const isAvailable = inStock && stock > 0;

  const { user } = useCachedUser();

  const handleWishlistClick = async () => {
    try {
      setIsInWishlist(!isInWishlist);
      await updateWishlist(id, !isInWishlist);
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };

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
    className="relative bg-white rounded-lg shadow-lg p-4 
    hover:shadow-xl hover:scale-[1.02] transition-transform duration-300 
    sm:p-3 sm:rounded-md sm:shadow-md"
  >
    {/* Wishlist Button */}
    {user && (
      <button
        className="absolute top-2 right-2 z-50 text-gray-500 hover:text-red-500 
        transition-colors duration-200 focus:outline-none sm:w-5 sm:h-5"
        onClick={handleWishlistClick}
      >
        {isInWishlist ? (
          <Heart fill="red" className="w-6 h-6 sm:w-5 sm:h-5" />
        ) : (
          <Heart className="w-6 h-6 sm:w-5 sm:h-5" />
        )}
      </button>
    )}

    {/* Product Image */}
    <div
      className="relative w-full h-40 sm:h-28 overflow-hidden rounded-lg 
      shadow-sm hover:scale-110 transition-transform duration-300 cursor-pointer"
      onClick={() => router.push(`/product/${id}`)}
    >
      {image || imageUrl ? (
        <Image
          src={image || imageUrl || "/file_not_found.jpg"}
          alt={name}
          className="object-cover w-full h-full"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      ) : (
        <Image
          src="/file_not_found.jpg"
          alt="Not Found"
          className="object-cover w-full h-full rounded-lg"
          fill
        />
      )}
    </div>

    {/* Product Info */}
    <div className="mt-2">
      <h3
        className="text-base font-bold text-gray-800 truncate sm:text-sm"
        title={name}
      >
        {name}
      </h3>
      <div className="flex items-center justify-between mt-1">
        <div className="flex items-center gap-2">
          {discountedPrice ? (
            <>
              <p className="text-sm text-gray-400 line-through">₹{price}</p>
              <p className="text-lg font-bold text-pharma-emerald sm:text-base">
                ₹{discountedPrice}
              </p>
            </>
          ) : (
            <p className="text-lg font-bold text-gray-800 sm:text-base">
              ₹{price}
            </p>
          )}
        </div>
        {discountPercentage && (
          <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md shadow-sm">
            {discountPercentage}%
          </span>
        )}
      </div>
    </div>

    {/* Stock Badge */}
    <div className="mt-2">
      {inStock && stock > 0 ? (
        <div className="flex items-center gap-1 text-sm text-green-600">
          <CheckCircle className="w-4 h-4" />
          <span>In Stock</span>
        </div>
      ) : (
        <div className="flex items-center gap-1 text-sm text-red-600">
          <XCircle className="w-4 h-4" />
          <span>Out of Stock</span>
        </div>
      )}
    </div>

    {/* Add to Cart Button */}
    <Button
      className={`mt-4 w-full py-2 text-sm font-medium text-white rounded-md shadow-md 
      transition-transform duration-300 hover:scale-[1.02] ${
        inStock
          ? "bg-pharma-emerald-light hover:bg-pharma-emerald"
          : "bg-gray-400 cursor-not-allowed"
      }`}
      disabled={!inStock || stock <= 0}
      onClick={handleAddToCart}
    >
      {inStock ? "Add to Cart" : "Out of Stock"}
    </Button>
  </div>
  );
};

export default ProductCard;