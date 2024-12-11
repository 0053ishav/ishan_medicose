"use client";

import { fetchProducts } from "@/lib/appwrite";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

interface Product {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
  description: string;
  image: string,
}

// const products: Product[] = [
//   { id: 1, name: "Product 1", price: "$10", imageUrl: "/Products/medicine.png",  },
//   { id: 2, name: "Product 2", price: "$15", imageUrl: "/Products/medicine.png" },
//   { id: 3, name: "Product 3", price: "$20", imageUrl: "/Products/medicine.png" },
//   { id: 4, name: "Product 4", price: "$25", imageUrl: "/Products/medicine.png" },
//   { id: 5, name: "Product 5", price: "$30", imageUrl: "/Products/medicine.png" },
//   { id: 6, name: "Product 6", price: "$35", imageUrl: "/Products/medicine.png" },
//   { id: 7, name: "Product 7", price: "$40", imageUrl: "/Products/medicine.png" },
//   { id: 8, name: "Product 8", price: "$45", imageUrl: "/Products/medicine.png" },
//   { id: 9, name: "Product 9", price: "$50", imageUrl: "/Products/medicine.png" },
//   { id: 10, name: "Product 1", price: "$10", imageUrl: "/Products/medicine.png" },
//   { id: 11, name: "Product 2", price: "$15", imageUrl: "/Products/medicine.png" },
//   { id: 12, name: "Product 3", price: "$20", imageUrl: "/Products/medicine.png" },
//   { id: 13, name: "Product 4", price: "$25", imageUrl: "/Products/medicine.png" },
//   { id: 14, name: "Product 5", price: "$30", imageUrl: "/Products/medicine.png" },
//   { id: 15, name: "Product 6", price: "$35", imageUrl: "/Products/medicine.png" },
//   { id: 16, name: "Product 7", price: "$40", imageUrl: "/Products/medicine.png" },
//   { id: 17, name: "Product 8", price: "$45", imageUrl: "/Products/medicine.png" },
//   { id: 18, name: "Product 9", price: "$50", imageUrl: "/Products/medicine.png" },
//   { id: 19, name: "Product 1", price: "$10", imageUrl: "/Products/medicine.png" },
//   { id: 20, name: "Product 2", price: "$15", imageUrl: "/Products/medicine.png" },
//   { id: 21, name: "Product 3", price: "$20", imageUrl: "/Products/medicine.png" },
//   { id: 22, name: "Product 4", price: "$25", imageUrl: "/Products/medicine.png" },
//   { id: 23, name: "Product 5", price: "$30", imageUrl: "/Products/medicine.png" },
//   { id: 24, name: "Product 6", price: "$35", imageUrl: "/Products/medicine.png" },
//   { id: 25, name: "Product 7", price: "$40", imageUrl: "/Products/medicine.png" },
//   { id: 26, name: "Product 8", price: "$45", imageUrl: "/Products/medicine.png" },
//   { id: 27, name: "Product 9", price: "$50", imageUrl: "/Products/medicine.png" },
//   { id: 28, name: "Product 1", price: "$10", imageUrl: "/Products/medicine.png" },
//   { id: 29, name: "Product 2", price: "$15", imageUrl: "/Products/medicine.png" },
//   { id: 30, name: "Product 3", price: "$20", imageUrl: "/Products/medicine.png" },
//   { id: 31, name: "Product 4", price: "$25", imageUrl: "/Products/medicine.png" },
//   { id: 32, name: "Product 5", price: "$30", imageUrl: "/Products/medicine.png" },
//   { id: 33, name: "Product 6", price: "$35", imageUrl: "/Products/medicine.png" },
//   { id: 34, name: "Product 7", price: "$40", imageUrl: "/Products/medicine.png" },
//   { id: 35, name: "Product 8", price: "$45", imageUrl: "/Products/medicine.png" },
//   { id: 36, name: "Product 9", price: "$50", imageUrl: "/Products/medicine.png" },
// ];

export const Products = () => {
  const [loading, setLoading] = useState<boolean>(true);

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const productData = await fetchProducts();
        // console.log("------------------: " + JSON.stringify(productData));

        const formattedProducts = productData.map((product: any) => ({
          id: product.$id,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,
          description: product.description,
          image: product.image,
        }));
        setProducts(formattedProducts);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4}).map((_, index) => (
            <div key={index} className="border rounded-lg shadow-md p-4">
              <Skeleton className="w-36 h-36 mb-4"/>
              <Skeleton className="w-full h-6 mb-2"/>
              <Skeleton className="w-2/3 h-4 mb-4"/>
              <Skeleton className="w-full h-10 mt-4"/>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {paginatedProducts.map((product) => (
            <div key={product.id} className="border rounded-lg shadow-md p-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-36 h-36 ml-14 object-cover rounded-md"
              />
              <h3 className="mt-2 text-lg font-bold">{product.name}</h3>
              <p className="text-gray-600">{product.price}</p>
              <button className="mt-4 w-full bg-emerald-600 text-white py-2 rounded hover:bg-emerald-700">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;