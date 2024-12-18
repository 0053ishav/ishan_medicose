"use client";
import { fetchCategories } from "@/lib/appwrite";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";

interface Category {
  id: number;
  name: string;
  imageUrl: string;
  image: string;
}

interface CategoriesProps {
  showAllCategories?: boolean;
}

const Categories = ({ showAllCategories = false}: CategoriesProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [showAll, setShowAll] = useState<boolean>(false);
  const [categoryData, setCategoryData] = useState<Category[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const categoryData = await fetchCategories();
        const formattedCategoryData = categoryData.map((category: any) => ({
          id: category.$id,
          name: category.categoryName,
          imageUrl: category.categoryImageUrl,
          image: category.image,
        }));

        setCategoryData(formattedCategoryData);
      } catch (error) {
        console.error("Error fetching category data: ", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const router = useRouter();
  const handleCategoryClick = (category: Category) => {
    router.push(`/categories/${category.id}/${(category.name).replace(" ", "-")}`);
  };

  const categoriesToDisplay = showAllCategories ? categoryData : categoryData.slice(0, 4); 

  return (
    <div className="container">
        {/* Button with Dropdown */}
        <div className="relative">
        <Button
          onClick={() => setShowAll((prev) => !prev)}
          className="flex items-center pc-4 py-2 bg-pharma-emerald-light text-white rounded-md hover:bg-pharma-emerald transition"
        >
          All Categories
          <svg
            className={`w-5 h-5 ml-2 transition-transform ${
              showAll ? "rotate-180" : "rotate-0"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </Button>

        {/* Dropdown */}

        {showAll && (
          <div className="absolute left-0 mt-2 w-52 bg-white border border-gray-200 rounded-md shadow-lg z-20 overflow-auto max-h-64">
            {categoriesToDisplay.map((category) => (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category)}
                className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-8 h-8 rounded-full mr-3 object-cover"
                />
                <span className="text-s font-medium text-gray-700">
                  {category.name}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    <div className="flex flex-wrap gap-6 justify-center">
    

      {loading
        ? Array.from({ length: 7 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center w-28 h-28 bg-gray-100 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            >
              <Skeleton className="w-14 h-14 rounded-full mb-2" />
              <Skeleton className="w-16 h-4" />
            </div>
          ))
        : categoriesToDisplay.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category)}
              className="flex flex-col items-center justify-center w-28 h-28 bg-gray-100 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-14 h-14 rounded-full object-cover"
              />
              <span className="mt-2 text-sm font-medium text-gray-700">
                {category.name}
              </span>
            </div>
          ))}
    </div>
    </div>
  );
};

export default Categories;