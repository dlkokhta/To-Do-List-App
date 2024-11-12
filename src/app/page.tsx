"use client";
import Header from "../components/Header";
import SearchNotes from "../components/SearchNotes";
import CreateTask from "../components/CreateTask";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState<boolean>(false);
  return (
    <div className="pt-[30px] px-5 bg-bgColor h-screen pb-28">
      <Header />
      <SearchNotes />
      <CreateTask
        isCreateTaskOpen={isCreateTaskOpen}
        setIsCreateTaskOpen={setIsCreateTaskOpen}
      />

      <div className="flex justify-center h-full relative">
        <div className="absolute bottom-4">
          <Image
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
