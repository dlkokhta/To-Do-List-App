import React from "react";
import Image from "next/image";
import { useState } from "react";
import { tasksTypes } from "../types/tasksTypes";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export default function Tasks() {
  const [isTaskTextHidden, setIsTaskTextHidden] = useState<{
    [key: number]: boolean;
  }>({});

  const fetchedTaks: tasksTypes[] = useSelector(
    (state: RootState) => state.tasks.tasks
  );

  const toggleTaskVisibility = (taskId: number) => {
    setIsTaskTextHidden((prevState) => ({
      ...prevState,
      [taskId]: !prevState[taskId],
    }));
  };

  return (
    <div>
      {fetchedTaks.map((task) => (
        <div
          key={task.id}
          className="bg-[#F6FAFF] mt-[15px] p-3 rounded-xl shadow-outer-all-sides"
        >
          <div className="flex justify-between items-center">
            <h1 className="text-[#30507D] text-sm font-medium">{task.text}</h1>
            {/* {!isTaskTextHidden && (
              <div>
                <Image
                  onClick={() => setIsTaskTextHidden(true)}
                  alt="chevron-up icon"
                  width={20}
                  height={20}
                  src="/chevron-up.png"
                />
              </div>
            )} */}
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
              isTaskTextHidden ? `mt-[36px]` : `mt-[23px]`
            }`}
          >
            <div className="flex gap-[10px]">
              <div>
                <Image alt="edit icon" width={20} height={20} src="/edit.png" />
              </div>
              <div>
                <Image
                  alt="delete icon"
                  width={20}
                  height={20}
                  src="/delete.png"
                />
              </div>
            </div>
            <div className="flex gap-1 items-center">
              <h2 className="text-[#6C86A8] text-[10px] font-medium">
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
  );
}
