"use client";

import { useEffect, useState } from "react";
import { fetchProductById } from "@/lib/appwrite";
import ProductDetailUI from "@/components/ProductDetailUI";
import Bestsellers from "@/components/BestSellers";
import Featured from "@/components/Featured";
import RatingAndReview from "@/components/RatingAndReview";

interface ProductDetailProps {
  productId: string | string[] | undefined;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ productId }) => {
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

  const id = Array.isArray(productId) ? productId[0] : productId;
  const finalProductId = typeof id === "string" ? id : ""; // Default to empty string if not valid

  return (
    <>
    <ProductDetailUI product={product} loading={loading} error={error} />
    <Bestsellers />
    <Featured />
    <RatingAndReview productId={finalProductId}/>
    </>
  )
  
};

export default ProductDetail;
