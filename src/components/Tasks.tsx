import React from "react";
import Image from "next/image";
import { useState } from "react";

export default function Tasks() {
  const [isTaskTextHidden, setIsTaskTextHidden] = useState<boolean>(false);
  return (
    <div className="bg-[#F6FAFF] mt-[15px] p-3 rounded-xl shadow-outer-all-sides">
      <div className="flex justify-between items-center">
        <h1 className="text-[#30507D] text-sm font-medium">
          Dorem ipsum dolor sit
        </h1>
        {!isTaskTextHidden && (
          <div>
            <Image
              onClick={() => setIsTaskTextHidden(true)}
              alt="chevron-up icon"
              width={20}
              height={20}
              src="/chevron-up.png"
            />
          </div>
        )}
        {isTaskTextHidden && (
          <div>
            <Image
              onClick={() => setIsTaskTextHidden(false)}
              alt="chevron-down icon"
              width={20}
              height={20}
              src="/chevron-down.png"
            />
          </div>
        )}
      </div>
      {!isTaskTextHidden && (
        <p className="bg-[#E8F1FD] mt-10 shadow-inner-all-sides p-3 text-[#6C86A8] font-semibold text-[10px]">
          Borem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit consectetur adipiscing.
        </p>
      )}
      <div
        className={`flex justify-between  ${
          isTaskTextHidden ? `mt-[36px]` : `mt-[23px]`
        }`}
      >
        <div className="flex gap-[10px]">
          <div>
            <Image alt="edit icon" width={20} height={20} src="/edit.png" />
          </div>
          <div>
            <Image alt="delete icon" width={20} height={20} src="/delete.png" />
          </div>
        </div>
        <div className="flex gap-1 items-center">
          <h2 className="text-[#6C86A8] text-[10px] font-medium">
            Mark Completed
          </h2>
          <div>
            <Image alt="check icon" width={20} height={20} src="/check.png" />
          </div>
        </div>
      </div>
    </div>
  );
}
