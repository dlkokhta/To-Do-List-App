import React from "react";
import Image from "next/image";

export default function Header() {
  return (
    <div className="flex items-center px-5 sm:px-36 md:px-48 lg:px-[340px] xl:px-[460px] 2xl:px-[590px] 3xl:px-[800px]">
      {/* <div className="flex items-center gap-[10px] ">
        <Image
          alt="frame icon"
          width={50}
          height={50}
          src="/frame.png"
          priority
        />
        <h2 className="text-nameTextColor font-poppins font-extrabold text-base leading-6">
          James Ronald
        </h2>
      </div>
      <div className="ml-auto">
        <Image alt="settings icon" width={32} height={32} src="/settings.png" />
      </div> */}
    </div>
  );
}
