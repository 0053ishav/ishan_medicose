import React from "react";
import Products from "@/components/Products";

const Featured = () => {
  return (
    <div>
      <h1 className="container mx-auto text-2xl font-bold mt-12 mb-6 text-slate-700">
        Featured Products
      </h1>
      <Products tags="featured" />
    </div>
  );
};

export default Featured;
