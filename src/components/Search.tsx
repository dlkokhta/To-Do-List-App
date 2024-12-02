import React from "react";
import Image from "next/image";

interface SearchProps {
  searchQuery: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Search: React.FC<SearchProps> = ({
  searchQuery,
  handleSearchChange,
}) => {
  return (
    <div className="px-5 sm:px-36 md:px-48 lg:px-[340px] xl:px-[460px] 2xl:px-[590px] 3xl:px-[800px]">
      <div className="mt-4 relative">
        <input
          className="w-full placeholder:font-poppins placeholder:text-xs pl-2 pr-10 py-[9px] rounded-md focus:outline-none"
          placeholder="Search for notes"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <Image
          alt="search icon"
          width={26}
          height={26}
          src="/search.png"
          priority
          className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
        />
      </div>
    </div>
  );
};
