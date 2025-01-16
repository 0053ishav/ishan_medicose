"use client";

import { useEffect, useState } from "react";
import { fetchProductById } from "@/lib/appwrite";
import ProductDetailUI from "@/components/ProductDetailUI";
import { Skeleton } from "@/components/ui/skeleton";

import dynamic from "next/dynamic";

const Bestsellers = dynamic(() => import("@/components/BestSellers"), { 
  loading: () => <Skeleton className="w-full h-48" /> 
});
const Featured = dynamic(() => import("@/components/Featured"), { 
  loading: () => <Skeleton className="w-full h-48" /> 
});
const RatingAndReview = dynamic(() => import("@/components/RatingAndReview"), { 
  loading: () => <Skeleton className="w-full h-48" /> 
});
const MedicalDetails = dynamic(() => import("./MedicalDetails"), { 
  loading: () => <Skeleton className="w-full h-48" /> 
});
const FeaturesSection = dynamic(() => import("./FeaturesSection"), { 
  loading: () => <Skeleton className="w-full h-48" /> 
});

interface ProductDetailProps {
  productId: string | string[] | undefined;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ productId }) => {
  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isProductLoaded, setIsProductLoaded] = useState(false);
  const [isBestsellersLoaded, setIsBestsellersLoaded] = useState(false);
  const [isFeaturedLoaded, setIsFeaturedLoaded] = useState(false);

  useEffect(() => {
    if (!productId) return;
  
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        const productData = await fetchProductById(productId as string);
        setProduct(productData);
        setIsProductLoaded(true);
      } catch (error) {
        console.error("Error fetching product details: ", error);
        setError("Error fetching product details");
      } finally {
        setLoading(false);
      }
    };
  
    fetchProductDetails();
  }, [productId]);
  

  const id = Array.isArray(productId) ? productId[0] : productId;
  const finalProductId = typeof id === "string" ? id : "";

  useEffect(() => {
    if (isProductLoaded) {
      setIsBestsellersLoaded(true);
    }
    if (isBestsellersLoaded) {
      setIsFeaturedLoaded(true);
    }
  }, [isProductLoaded, isBestsellersLoaded]);

  return (
    <div className="container mx-auto">
      <ProductDetailUI product={product} loading={loading} error={error} />

      {isProductLoaded && (
        <>
          <div className="border-b mt-12"></div>
          <Bestsellers />
        </>
      )}

      {isBestsellersLoaded && (
        <>
          <div className="border-b mt-12"></div>
          <Featured />
        </>
      )}

      {isFeaturedLoaded && (
        <>
          <div className="border-b mt-12"></div>
          <FeaturesSection />
        </>
      )}

      {isFeaturedLoaded && (
        <>
          <div className="border-b mt-12"></div>
          <RatingAndReview productId={finalProductId} />
        </>
      )}

      {isFeaturedLoaded && (
        <>
          <div className="border-b mt-12"></div>
          <MedicalDetails productId={finalProductId} />
        </>
      )}
    </div>
  );
};

export default ProductDetail;