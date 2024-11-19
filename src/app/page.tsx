"use client";
import Header from "../components/Header";
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

  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const dispatch = useDispatch();

  const url = "https://to-do-app.dimitrikokhtashvili.site/api/getToDos/";

  const [update, setUpdate] = useState<boolean>(false);
  const updateData = async () => {
    setUpdate((prevUpdate) => !prevUpdate);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(url);
        dispatch(setTasks(response.data.tasks.reverse()));
        console.log("response", response);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, [dispatch, url, update]);

  const clearAllClickHandler = async () => {
    const url = "https://to-do-app.dimitrikokhtashvili.site/api/deleteAllToDo";

    try {
      await axios.delete(url);
    } catch (error) {
      console.log(error);
    }
    updateData();
  };

  const clearCompleted = async () => {
    const url =
      "https://to-do-app.dimitrikokhtashvili.site/api/deleteCompletedToDo";

    try {
      await axios.delete(url);
    } catch (error) {
      console.log(error);
    }
    updateData();
  };

  return (
    <div className="pt-[30px] bg-bgColor h-screen flex flex-col justify-between ">
      <Header />

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

      <div className="flex mt-[45px] px-5 sm:px-36 md:px-48 lg:px-[340px] xl:px-[460px] 2xl:px-[590px] 3xl:px-[800px]">
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
          <div
            onClick={clearAllClickHandler}
            className=" underline ml-auto mt-auto text-[#30507D] text-xs font-medium cursor-pointer"
          >
            Clear all Tasks
          </div>
        )}

        {isHistoryTasksDisplay && (
          <div
            onClick={clearCompleted}
            className=" underline ml-auto mt-auto text-[#30507D] text-xs font-medium cursor-pointer"
          >
            Clear history
          </div>
        )}
      </div>
      <CreateTask
        updateData={updateData}
        isCreateTaskOpen={isCreateTaskOpen}
        setIsCreateTaskOpen={setIsCreateTaskOpen}
      />

      {isTasksDisplay && (
        <Tasks searchQuery={searchQuery} updateData={updateData} />
      )}
      {isHistoryTasksDisplay && (
        <HistoryTasks updateData={updateData} searchQuery={searchQuery} />
      )}

      <div className="flex justify-center mt-auto relative mb-2">
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
