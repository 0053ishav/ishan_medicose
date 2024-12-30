"use client";
import React from "react";
import { useRouter } from "next/navigation";

const HeaderBox = ({ type = "title", title, subtext, user }: HeaderBoxProps) => {
  const router = useRouter();
  
  const handleButtonClick = () => {
    if (user === 'Guest' || !user) {
      router.push("/sign-up");
    }
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-24 lg:text-30 font-semibold text-gray-900">
        
        {type === 'title' && user && (
          <span className="text-bankGradient">
            &nbsp;{user}
          </span>
        )}
      </h1>
      <p className="text-14 lg:text-16 font-normal text-gray-600">{subtext}</p>

      <button
        onClick={handleButtonClick}
        className="bg-white text-pharma-emerald py-2 px-4 rounded-md hover:bg-gray-200"
      >
        {type === 'header' && user && user!='Guest' ? (
          <span className="text-bankGradient">
            {title}
            &nbsp;
            {user}
          </span>
        ) : 
         "Login / Sign Up"
         }
      </button>
    </div>
  );
};

export default HeaderBox;
