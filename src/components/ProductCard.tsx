"use client";

import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/hooks/use-CartContext";
import Image from "next/image";
import { updateWishlist } from "@/lib/appwrite";
import { getLoggedInUser } from "@/actions/user.actions";
import { Button } from "./ui/button";

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
  const [user, setUser] = useState<any>(null);

  const handleCardClick = () => {
    if (context === "categories" && categoryId && categoryName) {
      router.push(`/categories/${categoryId}/${categoryName}/products/${id}`);
    } else {
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

  useEffect(() => {
    const fetchUser = async () => {
      const user = getLoggedInUser();
      setUser(user);
    };
    fetchUser();
  }, []);

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
      key={id}
      className="relative bg-white rounded-lg shadow-lg p-4 transition-transform duration-300 hover:shadow-2xl hover:scale-[1.03] cursor-pointer"
    >
      {/* Product Image */}
      <div
        className="relative w-full h-40 overflow-hidden rounded-lg shadow-sm"
        onClick={handleCardClick}
      >
        {image || imageUrl ? (
          <>
            <Image
              src={image || imageUrl || "/file_not_found.jpg"}
              alt={name}
              className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {hoverImageUrl && (
              <Image
                src={hoverImageUrl}
                alt={name}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-0 hover:opacity-100"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            )}
          </>
        ) : (
          <Image
            src="/file_not_found.jpg"
            alt="Not Found"
            className="object-cover w-full h-full rounded-lg"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
      </div>

      <div
        className="flex flex-col  justify-center mt-2"
        onClick={handleCardClick}
      >
        <div className="mt-4 text-center group relative">
          {/* Product Name */}
          <h3
            className="text-base font-bold text-gray-800 truncate max-w-full overflow-hidden whitespace-nowrap"
            style={{
              maskImage:
                "linear-gradient(to right, black 80%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, black 80%, transparent 100%)",
            }}
          >
            {name}
          </h3>
          {name.length > 20 && ( // Show tooltip only for long names
            <div className="absolute top-full z-50 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs py-1 px-2 rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {name}
            </div>
          )}
        </div>

        {/* Pricing Section */}
        <div className="flex items-center justify-center mt-2 gap-2">
          {discountedPrice ? (
            <>
              <p className="text-sm text-gray-400 line-through">₹{price}</p>
              <p className="text-lg font-bold text-pharma-emerald">
                ₹{discountedPrice}
              </p>
            </>
          ) : (
            <p className="text-lg font-bold text-gray-800">₹{price}</p>
          )}
        </div>
        {/* Availability Badge */}
        <div className="relative mt-2 flex items-center justify-center">
          {isAvailable ? (
            <span className="bg-pharma-emerald text-white text-xs font-semibold px-2 py-1 rounded-md">
              In Stock
            </span>
          ) : (
            <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
              Out of Stock
            </span>
          )}
        </div>
      </div>

      {/* Discount Badge */}
      {discountPercentage && (
        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md shadow-sm ">
          {discountPercentage}%
        </span>
      )}

      {/* Add to Cart Button */}
      <Button
        className={`mt-4 w-full py-2 text-sm font-medium text-white rounded-md shadow-md transition-transform duration-300 hover:scale-[1.02] ${
          isAvailable
            ? "bg-pharma-emerald-light hover:bg-pharma-emerald"
            : "bg-gray-400 cursor-not-allowed"
        }`}
        disabled={!isAvailable}
        onClick={handleAddToCart}
      >
        {isAvailable ? "Add to Cart" : "Out of Stock"}
      </Button>

      {/* Add to Wishlist Button */}
      {!user && (
        <Button
          className={`mt-4 w-full py-2 text-sm font-medium text-white rounded-md shadow-md transition-transform duration-300 hover:scale-[1.02] ${
            isInWishlist
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          onClick={handleWishlistClick}
          disabled={isInWishlist}
        >
          {isInWishlist ? "Added to Wishlist" : "Add to Wishlist"}
        </Button>
      )}
    </div>
  );
};

export default ProductCard;