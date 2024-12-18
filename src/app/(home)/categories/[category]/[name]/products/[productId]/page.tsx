"use client";

import { useParams } from "next/navigation";
import ProductDetail from "@/components/ProductDetail";

const CategoryProductDetailPage = () => {
  const { productId } = useParams();

  return (
    <div>
      <ProductDetail productId={productId} />
    </div>
  );
};

export default CategoryProductDetailPage;