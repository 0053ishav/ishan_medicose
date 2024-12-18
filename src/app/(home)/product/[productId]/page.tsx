"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchProductById } from "@/lib/appwrite";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircleIcon } from "lucide-react";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) return;
    const fetchProductDetails = async () => {
      try {
        const productData = await fetchProductById(productId as string);
        setProduct(productData);
      } catch (error) {
        console.error("Error fetching product details: ", error);
        setError("Error fetching product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <Skeleton className="w-full h-96" />
          </div>
          <div className="md:w-1/2 md:ml-8">
            <Skeleton className="w-3/4 h-8 mb-4" />
            <Skeleton className="w-1/3 h-6 mb-4" />
            <Skeleton className="w-full h-4 mb-2" />
            <Skeleton className="w-1/3 h-4 mb-4" />
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
            <AlertCircleIcon
                color="red"
                className="ml-2"
            />
        </div>
    )
  }


  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <img
            src={product.image || product.imageUrl}
            alt={product.name}
            className="w-full h-auto"
          />
        </div>
        <div className="md:w-1/2 md:ml-8">
          <h2 className="text-3xl font-bold">{product.name}</h2>
          <p className="text-xl text-gray-600">{product.price}</p>
          <p className="mt-4">{product.description}</p>
          <div className="mt-6">
            <span className="font-semibold">Stock: </span>
            {product.stock > 0 ? `${product.stock} items` : "Out of Stock"}
          </div>
          <button
            className={`mt-4 px-6 py-2 text-white font-semibold ${
              product.inStock ? "bg-pharma-emerald" : "bg-gray-500"
            } rounded-md`}
            disabled={!product.inStock}
          >
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;