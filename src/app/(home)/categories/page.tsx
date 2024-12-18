"use client";
import Categories from "@/components/Categories";

export default function Home() {
  return (
    <>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6 text-slate-700">Categories</h1>
        <Categories showAllCategories={true} />
      </div>
    </>
  );
}
