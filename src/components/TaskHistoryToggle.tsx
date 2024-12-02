import React from "react";
import Image from "next/image";

interface TaskHistoryToggleProps {
  isTasksDisplay: boolean;
  setIsTasksDisplay: React.Dispatch<React.SetStateAction<boolean>>;
  isHistoryTasksDisplay: boolean;
  setIsHistoryTasksDisplay: React.Dispatch<React.SetStateAction<boolean>>;
  clearAllClickHandler: () => void;
  clearCompleted: () => void;
}

const TaskHistoryToggle: React.FC<TaskHistoryToggleProps> = ({
  isTasksDisplay,
  setIsTasksDisplay,
  setIsHistoryTasksDisplay,
  isHistoryTasksDisplay,
  clearAllClickHandler,
  clearCompleted,
}) => {
  return (
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
  );
};

export default TaskHistoryToggle;
