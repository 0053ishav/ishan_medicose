"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/use-CartContext";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  discountedPrice: number | undefined;
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
      price: price,
      quantity: 1,
    });
  };

  const isAvailable = (inStock && stock > 0);

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
    // <div
    //   key={id}
    //   className="border rounded-lg shadow-sm p-2 relative bg-white transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer"
    // >
    //   <div>
    //   <span className="absolute z-10 top-1 left-1 bg-pharma-emerald text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
    //         {discountPercentage}%
    //       </span>
    //   </div>
    //   <div onClick={handleCardClick}>
    //     {isAvailable ? (
    //       <span className="absolute z-10 top-1 right-1 bg-pharma-emerald text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
    //         In Stock
    //       </span>
    //     ) : (
    //       <span className="absolute z-10 top-1 right-1 bg-red-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
    //         Out of Stock
    //       </span>
    //     )}

    //     {/* Product Image with Hover Effect */}
    //     <div className="w-24 h-24 mx-auto relative overflow-hidden">
    //       {image || imageUrl ? (
    //         <>
    //           <img
    //             src={image || imageUrl}
    //             alt={name}
    //             className="object-cover w-full h-full rounded-md transition-opacity duration-300 hover:opacity-0"
    //           />
    //           {hoverImageUrl && (
    //             <img
    //               src={hoverImageUrl}
    //               alt={name}
    //               className="absolute top-0 left-0 w-full h-full object-cover rounded-md opacity-0 transition-opacity duration-300 hover:opacity-100"
    //             />
    //           )}
    //         </>
    //       ) : (
    //         <img
    //           src="/file_not_found.jpg"
    //           className="object-cover scale-150"
    //           alt="image not found"
    //         />
    //       )}
    //     </div>

    //     <h3 className="mt-1 text-sm font-semibold text-center">{name}</h3>
    //     <div className="flex items-center justify-center gap-2 mt-4 ">
    //       <p className="text-xs text-gray-400">MRP</p>

    //       {discountedPrice ? (
    //         <>
    //           <p className="text-sm text-muted-foreground line-through">
    //             ₹{price}
    //           </p>
    //           <p className="text-lg sm:text-sm text-center text-pharma-emerald">
    //             ₹{discountedPrice}
    //           </p>
    //         </>
    //       ) : (
    //         <p className="text-sm text-gray-600">₹{price}</p>
    //       )}
    //     </div>
    //   </div>

    //   <button
    //     className={`mt-2 w-full text-white py-1 text-xs rounded-full ${
    //       isAvailable
    //         ? "bg-pharma-emerald hover:bg-pharma-emerald-dark"
    //         : "bg-gray-400 cursor-not-allowed"
    //     }`}
    //     disabled={!isAvailable}
    //     onClick={handleAddToCart}
    //   >
    //     {isAvailable ? "Add to Cart" : "Out of Stock"}
    //   </button>
    // </div>


    <div
  key={id}
  className="relative bg-white rounded-lg shadow-lg p-4 transition-transform duration-300 hover:shadow-2xl hover:scale-[1.03] cursor-pointer"
>


  {/* Product Image */}
  <div className="relative w-full h-40 overflow-hidden rounded-lg shadow-sm">
    {image || imageUrl ? (
      <>
        <img
          src={image || imageUrl}
          alt={name}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
        />
        {hoverImageUrl && (
          <img
            src={hoverImageUrl}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-0 hover:opacity-100"
          />
        )}
      </>
    ) : (
      <img
        src="/file_not_found.jpg"
        alt="Not Found"
        className="object-cover w-full h-full rounded-lg"
      />
    )}
  </div>


  <div className="flex flex-col  justify-center mt-2">

<div className="mt-4 text-center group relative">

  {/* Product Name */}
  <h3 
    className="text-base font-bold text-gray-800 truncate max-w-full overflow-hidden whitespace-nowrap"
    style={{
      maskImage: "linear-gradient(to right, black 80%, transparent 100%)",
      WebkitMaskImage: "linear-gradient(to right, black 80%, transparent 100%)",
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
        <p className="text-lg font-bold text-pharma-emerald">₹{discountedPrice}</p>
      </>
    ) : (
      <p className="text-lg font-bold text-gray-800">₹{price}</p>
    )}
  </div>
   {/* Availability Badge */}
   <div className="relative mt-2 flex items-center justify-center">
    {isAvailable ? (
      <span className="bg-pharma-emerald text-white text-xs font-semibold px-2 py-1 rounded-full">
        In Stock
      </span>
    ) : (
      <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
        Out of Stock
      </span>
    )}
  </div>
</div>

    {/* Discount Badge */}
    {discountPercentage && (
    <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-sm ">
      {discountPercentage}% OFF
    </span>
  )}

 

  {/* Add to Cart Button */}
  <button
    className={`mt-4 w-full py-2 text-sm font-medium text-white rounded-full shadow-md transition-transform duration-300 hover:scale-[1.02] ${
      isAvailable
        ? "bg-pharma-emerald hover:bg-pharma-emerald-dark"
        : "bg-gray-400 cursor-not-allowed"
    }`}
    disabled={!isAvailable}
    onClick={handleAddToCart}
  >
    {isAvailable ? "Add to Cart" : "Out of Stock"}
  </button>

</div>

  );
};

export default ProductCard;