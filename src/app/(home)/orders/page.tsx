"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const OrdersPage = () => {
  const router = useRouter();
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center  h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-4 animate-fadeInDown">
        Your Orders
      </h1>
      <div className="flex flex-col h-full justify-center items-center">
        <div className="mb-6 animate-bounce">
          <Image
            src="/Logo/logo-no-background.svg"
            alt="Ishan Medicose Logo"
            className="object-contain"
            width={500}
            height={500}
          />
        </div>

        <p className="text-lg text-gray-600 text-center mb-8 animate-pulse">
          We're working hard to bring this feature to you! <br />
          Stay tuned for updates on your order history and tracking.
        </p>
        <div className="flex flex-row justify-between items-center gap-10">
          <Button
            onClick={() => router.push("/")}
            className="bg-pharma-emerald text-white mt-5 px-6 py-3 rounded-md text-lg hover:bg-pharma-emerald-dark active:scale-95 transition-transform duration-300"
          >
            Continue Shopping
          </Button>
          <Button
            onClick={() => router.push("contact")}
            className="relative flex items-center mt-5 justify-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-colors rounded-md"
          >
            Contact Us
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;