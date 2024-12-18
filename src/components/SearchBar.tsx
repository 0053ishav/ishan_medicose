'use client'
import { Search } from "lucide-react";
import { Input } from "./ui/input";

const SearchBar = () => {
  return (
    <div className="relative w-96">
      <Input
        type="text"
        placeholder="Search products..."
        onChange={() => {}}
        className="w-full py-2 pl-2 pr-8 focus:outline-none focus:ring-0"
      />
      <div className="-mt-8 float-right"><Search/></div>
    </div>
  );
};

export default SearchBar;
