"use client";
import Bestsellers from "@/components/BestSellers";
import Categories from "@/components/Categories";
import Featured from "@/components/Featured";
import BannerCarousel from "@/components/BannerCarousel";
import Products from "@/components/Products";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handelViewAllClick = () => {
    router.push("/product");
  };

  return (
    <>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-slate-700">
          Featured Categories
        </h1>
        <Categories />
        <BannerCarousel />

        <Bestsellers/>
        <Featured/>

        <div className="flex justify-between items-center mt-12 mb-2">
          <h1 className="text-2xl font-bold text-slate-700">Product List</h1>
          <Button
            onClick={handelViewAllClick}
            className="bg-pharma-emerald hover:bg-pharma-emerald-dark text-white text-sm font-medium transition duration-300"
          >
            View All <ArrowRight />
          </Button>
        </div>
        <Products />
      </div>
    </>
  );
}
