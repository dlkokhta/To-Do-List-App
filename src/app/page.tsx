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
import { Search } from "@/components/Search";
import TaskHistoryToggle from "../components/TaskHistoryToggle";

export default function Home() {
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState<boolean>(false);
  const [isTasksDisplay, setIsTasksDisplay] = useState<boolean>(true);
  const [isHistoryTasksDisplay, setIsHistoryTasksDisplay] =
    useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [update, setUpdate] = useState<boolean>(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    console.log(e.target.value);
  };

  const dispatch = useDispatch();

  const url = "http://localhost:4000/api/getToDos/";

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
    const url = "http://localhost:4000/api/deleteAllToDo";

    try {
      await axios.delete(url);
    } catch (error) {
      console.log(error);
    }
    updateData();
  };

  const clearCompleted = async () => {
    const url = "http://localhost:4000/api/deleteCompletedToDo";

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

      <Search
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
      />

      <TaskHistoryToggle
        isTasksDisplay={isTasksDisplay}
        setIsTasksDisplay={setIsTasksDisplay}
        setIsHistoryTasksDisplay={setIsHistoryTasksDisplay}
        isHistoryTasksDisplay={isHistoryTasksDisplay}
        clearAllClickHandler={clearAllClickHandler}
        clearCompleted={clearCompleted}
      />

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
