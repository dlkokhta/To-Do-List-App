import React from "react";
import Image from "next/image";

export default function SearchNotes() {
  return (
    <div className="mt-4 relative">
      <input
        className="w-full placeholder:font-poppins placeholder:text-xs pl-2 pr-10 py-[9px] rounded-md focus:outline-none"
        placeholder="Search for notes"
      />
      <Image
        alt="search icon"
        width={26}
        height={26}
        src="/search.png"
        priority
        className="absolute right-2 top-1/2 transform -translate-y-1/2"
      />
    </div>
  );
}
