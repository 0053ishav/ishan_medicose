'use client';

import React, { useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: string;
  imageUrl: string;
}

const products: Product[] = [
  { id: 1, name: "Product 1", price: "$10", imageUrl: "/Products/medicine.png" },
  { id: 2, name: "Product 2", price: "$15", imageUrl: "/Products/medicine.png" },
  { id: 3, name: "Product 3", price: "$20", imageUrl: "/Products/medicine.png" },
  { id: 4, name: "Product 4", price: "$25", imageUrl: "/Products/medicine.png" },
  { id: 5, name: "Product 5", price: "$30", imageUrl: "/Products/medicine.png" },
  { id: 6, name: "Product 6", price: "$35", imageUrl: "/Products/medicine.png" },
  { id: 7, name: "Product 7", price: "$40", imageUrl: "/Products/medicine.png" },
  { id: 8, name: "Product 8", price: "$45", imageUrl: "/Products/medicine.png" },
  { id: 9, name: "Product 9", price: "$50", imageUrl: "/Products/medicine.png" },
  { id: 10, name: "Product 1", price: "$10", imageUrl: "/Products/medicine.png" },
  { id: 11, name: "Product 2", price: "$15", imageUrl: "/Products/medicine.png" },
  { id: 12, name: "Product 3", price: "$20", imageUrl: "/Products/medicine.png" },
  { id: 13, name: "Product 4", price: "$25", imageUrl: "/Products/medicine.png" },
  { id: 14, name: "Product 5", price: "$30", imageUrl: "/Products/medicine.png" },
  { id: 15, name: "Product 6", price: "$35", imageUrl: "/Products/medicine.png" },
  { id: 16, name: "Product 7", price: "$40", imageUrl: "/Products/medicine.png" },
  { id: 17, name: "Product 8", price: "$45", imageUrl: "/Products/medicine.png" },
  { id: 18, name: "Product 9", price: "$50", imageUrl: "/Products/medicine.png" },
  { id: 19, name: "Product 1", price: "$10", imageUrl: "/Products/medicine.png" },
  { id: 20, name: "Product 2", price: "$15", imageUrl: "/Products/medicine.png" },
  { id: 21, name: "Product 3", price: "$20", imageUrl: "/Products/medicine.png" },
  { id: 22, name: "Product 4", price: "$25", imageUrl: "/Products/medicine.png" },
  { id: 23, name: "Product 5", price: "$30", imageUrl: "/Products/medicine.png" },
  { id: 24, name: "Product 6", price: "$35", imageUrl: "/Products/medicine.png" },
  { id: 25, name: "Product 7", price: "$40", imageUrl: "/Products/medicine.png" },
  { id: 26, name: "Product 8", price: "$45", imageUrl: "/Products/medicine.png" },
  { id: 27, name: "Product 9", price: "$50", imageUrl: "/Products/medicine.png" },
  { id: 28, name: "Product 1", price: "$10", imageUrl: "/Products/medicine.png" },
  { id: 29, name: "Product 2", price: "$15", imageUrl: "/Products/medicine.png" },
  { id: 30, name: "Product 3", price: "$20", imageUrl: "/Products/medicine.png" },
  { id: 31, name: "Product 4", price: "$25", imageUrl: "/Products/medicine.png" },
  { id: 32, name: "Product 5", price: "$30", imageUrl: "/Products/medicine.png" },
  { id: 33, name: "Product 6", price: "$35", imageUrl: "/Products/medicine.png" },
  { id: 34, name: "Product 7", price: "$40", imageUrl: "/Products/medicine.png" },
  { id: 35, name: "Product 8", price: "$45", imageUrl: "/Products/medicine.png" },
  { id: 36, name: "Product 9", price: "$50", imageUrl: "/Products/medicine.png" },
];

export const Products = () => {
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {paginatedProducts.map((product) => (
          <div key={product.id} className="border rounded-lg shadow-md p-4">
            <img
              src={product.imageUrl}
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

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6 space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 rounded ${
              currentPage === index + 1
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-200 text-gray-700'
            } hover:bg-emerald-500 hover:text-white`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Products;
