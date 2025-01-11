"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { HeaderBoxProps } from "@/types";
import { logoutAccount } from "@/actions/user.actions";
import { Heart, LogOut, ShoppingBag, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/components/WishlistContext";

const HeaderBox = ({
  type = "title",
  title,
  subtext,
  user,
}: HeaderBoxProps) => {
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);

  const handleLoginSignupClick = () => {
    if (!user || user === "Guest") {
      router.push("/sign-up");
    }
  };

  const handleLogoutClick = () => {
    logoutAccount().then(() => {
      window.location.reload();
    });
  };

  const { wishlistProducts } = useWishlist();

  return (
    <div
      className="relative flex flex-col"
      onMouseEnter={() => setShowPopup(true)}
      onMouseLeave={() => setShowPopup(false)}
    >
      <h1 className="text-24 lg:text-30 font-semibold text-gray-900">
        {type === "title" && user && (
          <span className="text-bankGradient">&nbsp;{user}</span>
        )}
      </h1>
      <p className="text-14 lg:text-16 font-normal text-gray-600">{subtext}</p>

      {type === "header" && (
        <button
          onClick={handleLoginSignupClick}
          className="bg-white text-pharma-emerald py-2 px-4 rounded-md hover:bg-gray-200"
        >
          {user && user !== "Guest" ? (
            <span className="text-bankGradient flex flex-row">
              <span className="hidden md:flex">{title}</span>
              &nbsp;
              {user}
            </span>
          ) : (
            "Login / Sign Up"
          )}
        </button>
      )}
      {wishlistProducts.length > 0 && (
        <span className="absolute top-0 right-0 bg-red-500 text-white text-sm rounded-full w-5 h-5 flex items-center justify-center">
          {wishlistProducts.length}
        </span>
      )}

      {showPopup && (
        <div className="absolute top-10 left-0 w-40 bg-white shadow-lg rounded-md p-3 z-50">
          {user && user != "Guest" ? (
            <div className="flex flex-col gap-2">
              <Button
                onClick={() => router.push("/account")}
                className="w-full flex items-center text-black bg-white py-2 px-4 rounded-md hover:bg-gray-200"
              >
                <User className="w-5 h-5 mr-2" />
                Account
              </Button>
              <Button
                onClick={() => router.push("/orders")}
                className="w-full flex items-center text-black bg-white py-2 px-4 rounded-md hover:bg-gray-200"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Orders
              </Button>
              <Button
                onClick={() => router.push("/wishlist")}
                className="w-full flex items-center text-black bg-white py-2 px-4 rounded-md hover:bg-gray-200"
              >
                <Heart className="w-5 h-5 mr-2" />
                Wishlist
                {wishlistProducts.length > 0 && (
                  <span className="absolute  right-0 bg-red-500 text-white text-sm rounded-md w-5 h-5 flex items-center justify-center">
                    {wishlistProducts.length}
                  </span>
                )}
              </Button>
              <Button
                onClick={handleLogoutClick}
                className="w-full flex items-center bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Button
                onClick={() => router.push("/sign-in")}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Login
              </Button>
              <Button
                onClick={() => router.push("/sign-up")}
                className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HeaderBox;