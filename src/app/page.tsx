"use client";
import Header from "../components/Header";
import SearchNotes from "../components/SearchNotes";
import CreateTask from "../components/CreateTask";
import Image from "next/image";
import { useState } from "react";
import Tasks from "../components/Tasks";
import HistoryTasks from "../components/HistoryTasks";

export default function Home() {
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState<boolean>(false);
  return (
    <div className="pt-[30px] px-5 bg-bgColor h-screen flex flex-col justify-between">
      <Header />

      <SearchNotes />

      <div className="flex mt-[45px]">
        <div className="flex gap-4">
          <div>
            <h2 className="text-[#30507D] text-[10px] text-center font-medium">
              Tasks
            </h2>
            <Image
              className="cursor-pointer"
              alt="tasks icon"
              width={36}
              height={36}
              src="/tasks.png"
            />
          </div>
          <div>
            <h2 className="text-[#30507D] text-[10px] text-center font-medium">
              History
            </h2>
            <Image
              className="cursor-pointer"
              alt="history icon"
              width={36}
              height={36}
              src="/history.png"
            />
          </div>
        </div>
        <div className=" underline ml-auto mt-auto text-[#30507D] text-xs font-medium">
          Clear all Tasks
        </div>
      </div>
      <CreateTask
        isCreateTaskOpen={isCreateTaskOpen}
        setIsCreateTaskOpen={setIsCreateTaskOpen}
      />

      <div className="h-[1px] bg-[#6A6CE04D] mt-4"></div>

      {/* <Tasks /> */}
      {/* <HistoryTasks /> */}

      <div className="flex justify-center mt-auto relative pt-3 mb-2">
        <div className="absolute bottom-4 ">
          <Image
            className="cursor-pointer"
            onClick={() => setIsCreateTaskOpen(true)}
            alt="add task icon"
            width={52}
            height={52}
            src="/add.png"
          />
        </div>
        <div className="w-[133px] h-[5px] bg-[#6C86A8] mt-auto rounded-full"></div>
      </div>
    </div>
  );
}
