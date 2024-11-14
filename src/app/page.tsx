"use client";
import Header from "../components/Header";
import SearchNotes from "../components/SearchNotes";
import CreateTask from "../components/CreateTask";
import Image from "next/image";
import { useState } from "react";
import Tasks from "../components/Tasks";
import HistoryTasks from "../components/HistoryTasks";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setTasks } from "../store/tasksSlice";

export default function Home() {
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState<boolean>(false);
  const [isTasksDisplay, setIsTasksDisplay] = useState<boolean>(true);
  const [isHistoryTasksDisplay, setIsHistoryTasksDisplay] =
    useState<boolean>(false);

  const dispatch = useDispatch();

  const url = "http://localhost:4000/api/getToDos/";

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(url);
        dispatch(setTasks(response.data.tasks));
        // console.log("response dataaaaa", response.data.tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

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
              onClick={() => {
                setIsTasksDisplay(true);
                setIsHistoryTasksDisplay(false);
              }}
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
              onClick={() => {
                setIsTasksDisplay(false);
                setIsHistoryTasksDisplay(true);
              }}
              className="cursor-pointer"
              alt="history icon"
              width={36}
              height={36}
              src="/history.png"
            />
          </div>
        </div>
        {isTasksDisplay && (
          <div className=" underline ml-auto mt-auto text-[#30507D] text-xs font-medium">
            Clear all Tasks
          </div>
        )}

        {isHistoryTasksDisplay && (
          <div className=" underline ml-auto mt-auto text-[#30507D] text-xs font-medium">
            Clear history
          </div>
        )}
      </div>
      <CreateTask
        isCreateTaskOpen={isCreateTaskOpen}
        setIsCreateTaskOpen={setIsCreateTaskOpen}
      />

      {/* <div className="h-[1px] bg-[#6A6CE04D] mt-4"></div> */}

      {isTasksDisplay && <Tasks />}
      {isHistoryTasksDisplay && <HistoryTasks />}

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
