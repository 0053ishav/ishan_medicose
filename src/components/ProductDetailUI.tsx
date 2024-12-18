import React, { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircleIcon } from "lucide-react";
import { Button } from "./ui/button";

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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if ((loading)) {
    return (
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-6 flex flex-col items-center">
            <div className="w-full md:w-3/4">
              <Skeleton className="w-full h-96" />
            </div>

            <div className="flex gap-2 mt-4 w-full md:w-3/4 justify-center">
              <Skeleton className="w-16 h-16" />
              <Skeleton className="w-16 h-16" />
              <Skeleton className="w-16 h-16" />
            </div>
          </div>

          <div className="col-span-12 md:col-span-6 flex flex-col gap-4 md:ml-8">
            <Skeleton className="w-3/4 h-8" />
            <Skeleton className="w-1/3 h-6" />
            <Skeleton className="w-full h-20" />
            <Skeleton className="w-1/3 h-6" />
            <Skeleton className="w-1/2 h-10" />
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

  return (
    <>
      <div className="grid grid-cols-12 gap-4 p-4 mt-4">
        {/* Product Details */}
        <div className="col-span-12 md:col-span-8 flex flex-col md:flex-row ">
          <div className="md:w-1/2 flex flex-col items-center">
            <div className="w-3/4 h-auto relative overflow-hidden rounded-md">
              <img
                src={currentImage}
                alt={product.name}
                className="object-cover w-full h-auto transition-opacity duration-300"
              />
            </div>

            {/* Image Thumbnails */}
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
          </div>
          <div className="md:w-1/2 md:ml-8">
            <h2 className="text-3xl font-bold">{product.name}</h2>
            <p className="text-xl text-gray-600">₹{product.price}</p>
            <p className="mt-4">{product.description}</p>
            <div className="mt-6">
              <span className="font-semibold">Stock: </span>
              {product.stock > 0 ? `${product.stock} items` : "Out of Stock"}
            </div>
            <button
              className={`mt-4 px-6 py-2 text-white font-semibold transition-colors ${
                product.inStock
                  ? "bg-pharma-emerald cursor-pointer hover:bg-pharma-emerald-dark "
                  : "bg-gray-500 cursor-not-allowed"
              } rounded-md`}
              disabled={!product.inStock}
            >
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        </div>

        {/* View Cart Button */}
        <div className="md:col-span-4 hidden md:flex items-center justify-center">
          <div className="flex flex-col w-full gap-4">
            <h3 className="text-gray-700 ">
              Your cart is empty! Add items now to proceed to checkout.
            </h3>
            {/* Todo: check for cart and disabled the button */}
            <Button
              className="px-6 py-2 w-full text-white font-semibold bg-pharma-emerald rounded-md hover:bg-pharma-emerald-dark transition-colors"
              onClick={() => alert("Redirecting to cart...")}
            >
              View Cart
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailUI;