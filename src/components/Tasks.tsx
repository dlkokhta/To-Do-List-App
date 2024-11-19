import React from "react";
import Image from "next/image";
import { useState, useRef } from "react";
import { tasksTypes } from "../types/tasksTypes";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import axios from "axios";
import EditTask from "../components/EditTask";

interface ChildProps {
  updateData: () => void;
  searchQuery: string;
}

const Tasks: React.FC<ChildProps> = ({ updateData, searchQuery }) => {
  const [isTaskTextHidden, setIsTaskTextHidden] = useState<{
    [key: number]: boolean;
  }>({});
  const [isEditTaskOpen, setIsEditTaskOpen] = useState<boolean>(false);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

  //scroll
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollThumbPosition, setScrollThumbPosition] = useState(0);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollableHeight =
        scrollContainerRef.current.scrollHeight -
        scrollContainerRef.current.clientHeight;
      const thumbPosition =
        (scrollContainerRef.current.scrollTop / scrollableHeight) * 100;
      setScrollThumbPosition(thumbPosition);
    }
  };

  const fetchedTasks: tasksTypes[] = useSelector(
    (state: RootState) => state.tasks.tasks
  );

  const toggleTaskVisibility = (taskId: number) => {
    setIsTaskTextHidden((prevState) => ({
      ...prevState,
      [taskId]: !prevState[taskId],
    }));
  };

  const url = "https://to-do-app.dimitrikokhtashvili.site/api/deleteToDo";
  const deleteClickHandler = async (id: number) => {
    try {
      const response = await axios.delete(`${url}/${id}`);

      console.log("responsee", response);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
    updateData();
  };

  const editClickHandler = (id: number) => {
    setSelectedTaskId(id);
    setIsEditTaskOpen(true);
  };

  const markCompleteClickhandler = async (id: number) => {
    const url = "https://to-do-app.dimitrikokhtashvili.site/api/completedToDo";
    try {
      const response = await axios.patch(`${url}/${id}`);
      console.log("response", response);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
    updateData();
  };

  const filteredTasks = fetchedTasks.filter(
    (task) =>
      !task.completed &&
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <>
      {filteredTasks.length === 0 ? (
        <div className="px-5 sm:px-36 md:px-48 lg:px-[340px] xl:px-[460px] 2xl:px-[590px] 3xl:px-[800px]">
          <div className="h-[1px] bg-[#6A6CE04D] mt-4"></div>
        </div>
      ) : (
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="overflow-y-auto h-full scrollbar-none px-5 pb-5 sm:px-36 md:px-48 lg:px-[340px] xl:px-[460px] 2xl:px-[590px] 3xl:px-[800px]"
        >
          <EditTask
            isEditTaskOpen={isEditTaskOpen}
            setIsEditTaskOpen={setIsEditTaskOpen}
            taskId={selectedTaskId}
            updateData={updateData}
          />
          <div
            className="absolute w-[6px] h-[159px] bg-[#4470E24D] rounded-full right-[6px] transition-transform mt-40 sm:right-[130px] md:right-[178px] lg:right-[326px] xl:right-[446px] 2xl:right-[576px] 3xl:right-[786px]"
            style={{ transform: `translateY(${scrollThumbPosition}%)` }}
          ></div>
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className="bg-[#F6FAFF] mt-[15px] p-3 rounded-xl shadow-outer-all-sides "
              style={{ clipPath: "none" }}
            >
              <div className="flex justify-between items-center">
                <h1 className="text-[#30507D] text-sm font-medium">
                  {task.title}
                </h1>

                {isTaskTextHidden && (
                  <div>
                    <Image
                      className="cursor-pointer"
                      onClick={() => toggleTaskVisibility(task.id)}
                      alt={
                        isTaskTextHidden[task.id]
                          ? "chevron-down icon"
                          : "chevron-up icon"
                      }
                      width={20}
                      height={20}
                      src={
                        isTaskTextHidden[task.id]
                          ? "/chevron-down.png"
                          : "/chevron-up.png"
                      }
                    />
                  </div>
                )}
              </div>
              {!isTaskTextHidden[task.id] && (
                <p className="bg-[#E8F1FD] mt-10 shadow-inner-all-sides p-3 text-[#6C86A8] font-semibold text-[10px] min-h-[54px]">
                  {task.text}
                </p>
              )}
              <div
                className={`flex justify-between  ${
                  isTaskTextHidden ? `mt-[23px]` : `mt-[36px]`
                }`}
              >
                <div className="flex gap-[10px]">
                  <div>
                    <Image
                      className="cursor-pointer"
                      onClick={() => editClickHandler(task.id)}
                      alt="edit icon"
                      width={20}
                      height={20}
                      src="/edit.png"
                    />
                  </div>
                  <div>
                    <Image
                      className="cursor-pointer"
                      onClick={() => deleteClickHandler(task.id)}
                      alt="delete icon"
                      width={20}
                      height={20}
                      src="/delete.png"
                    />
                  </div>
                </div>
                <div className="flex gap-1 items-center">
                  <h2
                    onClick={() => markCompleteClickhandler(task.id)}
                    className="text-[#6C86A8] text-[10px] font-medium cursor-pointer"
                  >
                    Mark Completed
                  </h2>
                  <div>
                    <Image
                      alt="check icon"
                      width={20}
                      height={20}
                      src="/check.png"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Tasks;
