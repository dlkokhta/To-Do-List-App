import React from "react";
import Image from "next/image";
import { useState } from "react";
import { tasksTypes } from "../types/tasksTypes";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import axios from "axios";
import EditTask from "../components/EditTask";

interface ChildProps {
  updateData: () => void;
  searchName: string;
}

const Tasks: React.FC<ChildProps> = ({ updateData, searchName }) => {
  const [isTaskTextHidden, setIsTaskTextHidden] = useState<{
    [key: number]: boolean;
  }>({});
  const [isEditTaskOpen, setIsEditTaskOpen] = useState<boolean>(false);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

  const fetchedTaks: tasksTypes[] = useSelector(
    (state: RootState) => state.tasks.tasks
  );

  const toggleTaskVisibility = (taskId: number) => {
    setIsTaskTextHidden((prevState) => ({
      ...prevState,
      [taskId]: !prevState[taskId],
    }));
  };

  const url = "http://localhost:4000/api/deleteToDo";
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
    const url = "http://localhost:4000/api/completedToDo";
    try {
      const response = await axios.patch(`${url}/${id}`);
      console.log("response", response);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
    updateData();
  };

  const filteredTasks = fetchedTaks.filter(
    (task) =>
      !task.completed &&
      task.text.toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    <div className="overflow-y-auto max-h-[600px]">
      <EditTask
        isEditTaskOpen={isEditTaskOpen}
        setIsEditTaskOpen={setIsEditTaskOpen}
        taskId={selectedTaskId}
        updateData={updateData}
      />
      {/* <div className="absolute w-[6px] h-[159px] bg-[#4470E24D] rounded-full"></div> */}
      {filteredTasks.map((task) => (
        <div
          key={task.id}
          className="bg-[#F6FAFF] mt-[15px] p-3 rounded-xl shadow-outer-all-sides"
        >
          <div className="flex justify-between items-center">
            <h1 className="text-[#30507D] text-sm font-medium">{task.text}</h1>

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
                <Image
                  onClick={() => editClickHandler(task.id)}
                  alt="edit icon"
                  width={20}
                  height={20}
                  src="/edit.png"
                />
              </div>
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
            <div className="flex gap-1 items-center">
              <h2
                onClick={() => markCompleteClickhandler(task.id)}
                className="text-[#6C86A8] text-[10px] font-medium"
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
  );
};

export default Tasks;
