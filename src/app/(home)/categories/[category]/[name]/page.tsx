"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchProductsByCategory } from "@/lib/appwrite";
import ProductCard from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";

const CategoryPage = () => {

  const { category , name } = useParams();  
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);


  const categoryId = Array.isArray(category) ? category[0] : category;
  const categoryName = Array.isArray(name) ? name[0] : name;

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const fetchedProducts = await fetchProductsByCategory(category as string);
        setProducts(fetchedProducts);        
      } catch (error) {
        console.error("Error fetching products by category:", error);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchCategoryProducts();
    }
  }, [category]);

  if (loading) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-12">
        {Array.from({ length: 5 }).map((_, index) => (
        <div className="border rounded-lg shadow-md p-2" key={index}>
        <Skeleton className="w-24 h-24 mb-2" />
        <Skeleton className="w-full h-4 mb-1" />
        <Skeleton className="w-2/3 h-3 mb-2" />
        <Skeleton className="w-full h-8 mt-2" />
      </div>
        ))}
      </div>

    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <div>No products found in this category.</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 mt-12 text-slate-700">
        Products in "{name}"
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.$id}
            name={product.name}
            price={product.price}
            imageUrl={product.imageUrl}
            hoverImageUrl={product.hoverImageUrl || product.imageUrl}
            image={product.image}
            stock={product.stock}
            inStock={product.inStock}
            categoryId={categoryId}
            categoryName={categoryName}
            context="categories"
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
