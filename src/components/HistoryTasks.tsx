import React from "react";
import Image from "next/image";
import { useState } from "react";
import { tasksTypes } from "../types/tasksTypes";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import axios from "axios";

interface ChildProps {
  updateData: () => void;
}

const HistoryTasks: React.FC<ChildProps> = ({ updateData }) => {
  const [isTaskTextHidden, setIsTaskTextHidden] = useState<{
    [key: number]: boolean;
  }>({});

  const toggleTaskVisibility = (taskId: number) => {
    setIsTaskTextHidden((prevState) => ({
      ...prevState,
      [taskId]: !prevState[taskId],
    }));
  };

  const fetchedTaks: tasksTypes[] = useSelector(
    (state: RootState) => state.tasks.tasks
  );

  const url = "http://localhost:4000/api/deleteToDo";
  const deleteClickHandler = async (id: number) => {
    try {
      await axios.delete(`${url}/${id}`);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
    updateData();
  };

  return (
    <div className="overflow-y-auto max-h-[600px]">
      {fetchedTaks
        .filter((task) => task.completed)
        .map((task) => (
          <div
            key={task.id}
            className="bg-[#F6FAFF] mt-[15px] p-3 rounded-xl shadow-outer-all-sides"
          >
            <div className="flex justify-between items-center">
              <div className="flex gap-[5px] items-center">
                <h1 className="text-[#30507D] text-sm font-medium">
                  {task.title}
                </h1>
                {isTaskTextHidden[task.id] && (
                  <div>
                    <Image
                      alt="check icon"
                      width={20}
                      height={20}
                      src="/check.png"
                    />
                  </div>
                )}
              </div>

              {isTaskTextHidden && (
                <div>
                  <Image
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
                isTaskTextHidden[task.id] ? `mt-[0]` : `mt-[23px]`
              }`}
            >
              {!isTaskTextHidden[task.id] && (
                <div className="flex">
                  <div>
                    <Image
                      onClick={() => deleteClickHandler(task.id)}
                      alt="delete icon"
                      width={20}
                      height={20}
                      src="/delete.png"
                    />
                  </div>
                </div>
              )}
              {!isTaskTextHidden[task.id] && (
                <div className="flex gap-1 items-center">
                  <h2 className="text-[#6C86A8] text-[10px] font-medium">
                    Completed
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
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default HistoryTasks;
