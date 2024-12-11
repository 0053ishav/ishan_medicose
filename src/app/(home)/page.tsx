import Categories from "@/components/Categories";
import Products from "@/components/Products";

export default function Home() {
  return (
    <>
      <div className="p-8 -">
      <h1 className="text-center text-2xl font-bold mb-6 text-slate-700">Featured Categories</h1>
      <Categories />
      <h1 className="text-2xl font-bold text-center mb-2 mt-12 text-slate-700">Product List</h1>
      <Products />
    </div>
    </>
  );
}
