import React from "react";
import Image from "next/image";

interface CreateTaskProps {
  isCreateTaskOpen: boolean;
  setIsCreateTaskOpen: (isOpen: boolean) => void;
}

export default function CreateTask({
  isCreateTaskOpen,
  setIsCreateTaskOpen,
}: CreateTaskProps) {
  return (
    <>
      {isCreateTaskOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75 px-4">
          <div className="pt-[14px] pb-3 px-3 pt- flex flex-col bg-[#F6FAFF] rounded-xl">
            <div className="flex gap-[99px] ml-auto items-center">
              <h1 className="font-bold text-xs text-[#30507D]">Create task</h1>
              <div>
                <Image
                  alt="close icon"
                  width={20}
                  height={20}
                  src="/close.png"
                  onClick={() => setIsCreateTaskOpen(false)}
                />
              </div>
            </div>

            <form>
              <input
                className="w-full border-[1px] border-[#6A6CE0] rounded-lg mt-2 text-[12px] placeholder:text-[#B0B0B0] pl-[7px] py-[7px] focus:outline-none"
                placeholder="Task Name"
              />
              <textarea
                className="w-full h-[99px] bg-[#E8F1FD] mt-[10px] placeholder:text-[#6C86A8] text-[10px] font-semibold pl-3 pt-5 shadow-inner-all-sides focus:outline-none"
                placeholder="Type task details here..."
              />
              <button className="bg-butoonColor px-[140px] w-full text-[#FFFEFC] bg-[#6A6CE0] text-xs py-3 rounded cursor-pointer">
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
