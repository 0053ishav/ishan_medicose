'use client';

import React, { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircleIcon } from "lucide-react";
import { useCart } from "@/hooks/use-CartContext";
import { useCartSheet } from "@/hooks/use-CartSheetProvider";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface ProductDetailUIProps {
  product: any | null;
  loading: boolean;
  error: string | null;
}

const ProductDetailUI: React.FC<ProductDetailUIProps> = ({
  product,
  loading,
  error,
}) => {

  const router = useRouter();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const { addToCart, cart } = useCart();
  const { openCart } = useCartSheet(); 
  
  if (loading) {
    return (
      <div className="w-full py-4">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-4 flex flex-col items-center">
            <div className="w-full md:w-3/4">
              <Skeleton className="w-full h-96" />
            </div>
            <div className="flex gap-2 mt-4 w-full md:w-3/4 justify-center">
              <Skeleton className="w-16 h-16" />
              <Skeleton className="w-16 h-16" />
              <Skeleton className="w-16 h-16" />
            </div>
          </div>

          <div className="col-span-12 md:col-span-3 flex flex-col gap-4 md:ml-8 mt-4">
            <Skeleton className="w-3/4 h-8" />
            <Skeleton className="w-1/3 h-6" />
            <Skeleton className="w-full h-20" />
            <Skeleton className="w-1/3 h-6" />
            <Skeleton className="w-1/2 h-10" />
          </div>

          <div className="md:col-span-4 hidden  md:flex flex-col justify-center gap-4 md:ml-8 mt-4 h-96">
            <Skeleton className="w-full h-6" />
            <Skeleton className="w-full h-20" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-row justify-center items-center h-[400px] text-red-500">
        {error}
        <AlertCircleIcon color="red" className="ml-2" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-row justify-center items-center h-[400px]">
        Product not found
        <AlertCircleIcon color="red" className="ml-2" />
      </div>
    );
  }

  const images = [
    product.image || product.imageUrl,
    ...(product.additionalImages || []),
  ];
  const currentImage = selectedImage || images[0];

  const handleAddToCart = () => {
    addToCart({
      id: product.$id,
      name: product.name,
      price: parseFloat(product.price),
      quantity: 1,
    });
  };

  const handleClick = () => {
    router.push("/contact");
  }

  return (
    <div className="grid grid-cols-12 gap-4 p-4 mt-4">
      <div className="col-span-12 md:col-span-8 flex flex-col md:flex-row">
        <div className="md:w-1/2 flex flex-col items-center">
        {product.imageUrl ? (
          <>
          
          <div className="w-3/4 h-auto relative overflow-hidden rounded-md">
            <img
              src={currentImage}
              alt={product.name}
              className="object-cover w-full h-auto transition-opacity duration-300"
            />
          </div>

          <div className="flex gap-2 mt-4">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index}`}
                onClick={() => setSelectedImage(image)}
                className={`w-16 h-16 rounded-md object-cover cursor-pointer border-2 ${
                  currentImage === image
                    ? "border-pharma-emerald"
                    : "border-gray-300"
                }`}
              />
            ))}
          </div>
          </>
        ) : (
          <img src="/file_not_found.jpg" className="object-cover" alt="image not found" />
        )}

        </div>

        <div className="md:w-1/2 md:ml-8 mt-4">
          <h2 className="text-3xl font-bold">{product.name}</h2>
          <div className="flex items-center gap-2 mt-4">
          <p className="text-xs text-gray-400">MRP</p>

            {product.discountedPrice ? (
            <>
              <p className="text-sm text-muted-foreground line-through">
                ₹{product.price}
              </p>
              <p className="text-lg text-center text-pharma-emerald">
                ₹{product.discountedPrice}
              </p>
            </>
          ) : (
            <p className="text-sm text-gray-600">₹{product.price}</p>
          )}
          
          </div>

          
          <p className="mt-4">{product.description}</p>
          {/* <div className="mt-6">
            <span className="font-semibold">Stock: </span>
            {product.stock > 0 ? `${product.stock} items` : "Out of Stock"}
          </div> */}
          <div className="flex items-center justify-start gap-4  mt-4 w-full">

          <Button
            className={`px-6 py-2 text-white font-semibold transition-colors ${
              product.inStock
              ? "bg-pharma-emerald cursor-pointer hover:bg-pharma-emerald-dark "
                : "bg-gray-500 cursor-not-allowed"
            } rounded-full`}
            disabled={!product.inStock}
            onClick={handleAddToCart}
          >
            {(product.inStock && product.stock > 0) ? "Add to Cart" : "Out of Stock"}
          </Button>
          {!product.inStock && (
            <Button
            onClick={handleClick}
            className="relative flex items-center  justify-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-colors rounded-full"
            >
            Contact Us
          </Button>  
          )}
          <Button
            onClick={openCart}
            className="relative md:hidden flex items-center  justify-center px-4 py-2 bg-pharma-emerald hover:bg-pharma-emerald-dark text-white font-semibold transition-colors rounded-full"
          >
            View Cart
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-sm rounded-full w-5 h-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </Button>
            </div>

        </div>
      </div>

      <div className="md:col-span-4 hidden md:flex items-center justify-center">
        <div className="flex flex-col w-full gap-4 justify-center items-center">
         {cart.length === 0 && (
           <h3 className="text-gray-700 ">
            Your cart is empty! Add items now to proceed to checkout.
          </h3>
          )}
          <Button
            onClick={openCart}
            className="relative flex items-center justify-center w-full h-10 bg-pharma-emerald hover:bg-pharma-emerald-dark text-white font-semibold transition-colors rounded-full"
          >
            View Cart
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-sm rounded-full w-5 h-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailUI;