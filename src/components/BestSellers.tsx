import Products from "@/components/Products";

const Bestsellers = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 mt-12 text-slate-700">
        Bestselling Products
      </h1>
        <div className="flex space-x-4">
          <Products tags="bestsellers" />
        </div>

    </div>
  );
};

export default Bestsellers;
