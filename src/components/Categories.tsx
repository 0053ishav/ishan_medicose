'use client'
import { fetchCategories } from "@/lib/appwrite";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

interface Category {
  id: number;
  name: string;
  imageUrl: string;
  image: string
}

// const categories: Category[] = [
//   { id: 1, name: "Pharmacy", imageUrl: "/CategoriesIcons/pharmacy.png" },
//   { id: 2, name: "Personal Care", imageUrl: "/CategoriesIcons/cream.png" },
//   { id: 3, name: "Wellness", imageUrl: "/CategoriesIcons/meditation.png" },
//   { id: 4, name: "Vitamins", imageUrl: "/CategoriesIcons/supplement.png" },
//   { id: 5, name: "Baby Care", imageUrl: "/CategoriesIcons/baby.png" },
//   { id: 6, name: "Beauty", imageUrl: "/CategoriesIcons/makeup.png" },
//   { id: 7, name: "Elderly Care", imageUrl: "/CategoriesIcons/elderly.png" },
// ];

const Categories = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [categoryData, setCategoryData] = useState<Category[]>([]);
  useEffect(() => {
    const loadData = async () => {
      try {
        const categoryData = await fetchCategories();
// console.log("fetched category data: " + categoryData);

        const formattedCategoryData = categoryData.map((category: any) => ({
          id: category.$id,
          name: category.categoryName,
          imageUrl: category.categoryImageUrl,
          image: category.image,
        }))
// console.log("fetched categories: " + JSON.stringify(formattedCategoryData));

        setCategoryData(formattedCategoryData)
      } catch (error) {
        console.error("Error fetching category data: " , error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [])


const router = useRouter()
  const handleCategoryClick = (category: Category) => {
    console.log(`${category.name} Clicked` );
    // Perform actions like navigation or filtering here
    // Example: Navigate to a page or trigger a product filter
   //  router.push(`/products?category=${category.name}`);
  }


  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {loading ? (
        Array.from({ length: 7 }).map((_, index) => (
          <div key={index} className="flex flex-col items-center justify-center w-28 h-28 bg-gray-100 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
            <Skeleton className="w-14 h-14 rounded-full mb-2" />  
            <Skeleton className="w-16 h-4" />  
          </div>
        ))
      ) : (
        categoryData.map((category) => (
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
        ))
      )}
    </div>
  );
};

export default Categories;
