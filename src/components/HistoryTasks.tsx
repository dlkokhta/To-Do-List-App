import React from "react";
import Image from "next/image";
import { useState } from "react";

export default function HistoryTasks() {
  const [isTaskTextHidden, setIsTaskTextHidden] = useState<boolean>(false);
  return (
    <div className="bg-[#F6FAFF] mt-40 p-3 rounded-xl shadow-outer-all-sides">
      <div className="flex justify-between items-center">
        <div className="flex gap-[5px] items-center">
          <h1 className="text-[#30507D] text-sm font-medium">
            Dorem ipsum dolor sit
          </h1>
          {!isTaskTextHidden && (
            <div>
              <Image alt="check icon" width={20} height={20} src="/check.png" />
            </div>
          )}
        </div>
        {isTaskTextHidden && (
          <div>
            <Image
              onClick={() => setIsTaskTextHidden(false)}
              alt="chevron-up icon"
              width={20}
              height={20}
              src="/chevron-up.png"
            />
          </div>
        )}
        {!isTaskTextHidden && (
          <div>
            <Image
              onClick={() => setIsTaskTextHidden(true)}
              alt="chevron-down icon"
              width={20}
              height={20}
              src="/chevron-down.png"
            />
          </div>
        )}
      </div>
      {isTaskTextHidden && (
        <p className="bg-[#E8F1FD] mt-10 shadow-inner-all-sides p-3 text-[#6C86A8] font-semibold text-[10px]">
          Borem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit consectetur adipiscing.
        </p>
      )}
      <div
        className={`flex justify-between  ${
          !isTaskTextHidden ? `mt-[0]` : `mt-[23px]`
        }`}
      >
        {isTaskTextHidden && (
          <div className="flex">
            <div>
              <Image
                alt="delete icon"
                width={20}
                height={20}
                src="/delete.png"
              />
            </div>
          </div>
        )}
        {isTaskTextHidden && (
          <div className="flex gap-1 items-center">
            <h2 className="text-[#6C86A8] text-[10px] font-medium">
              Completed
            </h2>
            <div>
              <Image alt="check icon" width={20} height={20} src="/check.png" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
