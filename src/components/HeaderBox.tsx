"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { HeaderBoxProps } from "@/types";
import { logoutAccount } from "@/actions/user.actions";

const HeaderBox = ({ type = "title", title, subtext, user }: HeaderBoxProps) => {
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);

  const handleLoginSignupClick = () => {
    if (!user || user === "Guest") {
      router.push("/sign-up");
    }
  };

  const handleLogoutClick = () => {
    logoutAccount().then(() => {
      window.location.reload()
    });
  };
  return (
    <div
      className="relative flex flex-col"
      onMouseEnter={() => setShowPopup(true)}
      onMouseLeave={() => setShowPopup(false)}
    >
      <h1 className="text-24 lg:text-30 font-semibold text-gray-900">
        {type === "title" && user && (
          <span className="text-bankGradient">
            &nbsp;{user}
          </span>
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
             <span className="hidden md:flex">
               {title}
              </span>
              &nbsp;
              {user}
            </span>
          ) : (
            "Login / Sign Up"
          )}
        </button>
      )}

      {showPopup && (
        <div className="absolute top-10 left-0 w-40 bg-white shadow-lg rounded-md p-4 z-50">
          {user && user != 'Guest' ? (
            <button
              onClick={handleLogoutClick}
              className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <div className="flex flex-col gap-2">
              <button
                onClick={() => router.push("/sign-in")}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Login
              </button>
              <button
                onClick={() => router.push("/sign-up")}
                className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HeaderBox;
