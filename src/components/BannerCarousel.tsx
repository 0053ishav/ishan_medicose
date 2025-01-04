import React, { useEffect, useState } from "react";
import { fetchBanners } from "@/lib/appwrite";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

interface Banners {
  id: string;
  name: string;
  url: string;
}

const BannerCarousel = () => {
  const [banners, setBanners] = useState<Banners[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getBanners = async () => {
      try {
        const fetchedBanners = await fetchBanners();
        setBanners(fetchedBanners);
      } catch (error) {
        console.error("Error fetching banners:", error);
      } finally {
        setLoading(false);
      }
    };

    getBanners();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [banners]);

  return (
    <div className="relative w-full h-auto overflow-hidden mt-12 rounded-md">
      {loading ? (
        <Skeleton className="relative w-full aspect-[2/1] sm:aspect-[4/1] lg:aspect-[16/4]" />
      ) : (
        banners.length > 0 && (
          <Image
            src={banners[currentIndex]?.url || "/file_not_found.jpg"}
            alt={banners[currentIndex]?.name || "Banner"}
            layout="responsive"
            width={1200}
            height={400}
            className="object-cover transition-opacity duration-1000"
          />
        )
      )}
    </div>
  );
};

export default BannerCarousel;