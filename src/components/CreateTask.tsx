import React from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import CreateTaskSchema from "./CreateTaskSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

interface CreateTaskProps {
  isCreateTaskOpen: boolean;
  setIsCreateTaskOpen: (isOpen: boolean) => void;
  updateData: () => void;
}
interface TaskFormData {
  taskName: string;
  taskText: string;
}

export default function CreateTask({
  isCreateTaskOpen,
  setIsCreateTaskOpen,
  updateData,
}: CreateTaskProps) {
  const {
    register,
    handleSubmit,
    reset,
    // formState: { errors },
  } = useForm({
    resolver: yupResolver(CreateTaskSchema),
  });

  const url = "https://to-do-app.dimitrikokhtashvili.site";

  const onSubmit = async (data: TaskFormData) => {
    const taskData = {
      title: data.taskName,
      text: data.taskText,
    };

    console.log("dataaaaa", taskData);
    try {
      const response = await axios.post(`${url}/api/addToDo`, taskData);
      console.log("response", response);

      reset();
      setIsCreateTaskOpen(false);
    } catch (errors) {
      console.log(errors);
    }
    updateData();
  };

  return (
    <>
      {isCreateTaskOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75 px-4 sm:px-36 md:px-48 lg:px-[340px] xl:px-[460px] 2xl:px-[590px] 3xl:px-[800px]">
          <div className="pt-[14px] pb-3 px-3 pt- flex flex-col bg-[#F6FAFF] rounded-xl">
            <div className="flex items-center">
              <h1 className="font-bold text-xs text-[#30507D] m-auto">
                Create task
              </h1>
              <div>
                <Image
                  className="cursor-pointer"
                  alt="close icon"
                  width={20}
                  height={20}
                  src="/close.png"
                  onClick={() => setIsCreateTaskOpen(false)}
                />
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                {...register("taskName")}
                className="w-full border-[1px] border-[#6A6CE0] rounded-lg mt-2 text-[12px] placeholder:text-[#B0B0B0] pl-[7px] py-[7px] focus:outline-none"
                placeholder="Task Name"
              />
              <textarea
                {...register("taskText")}
                className="w-full h-[99px] bg-[#E8F1FD] mt-[10px] placeholder:text-[#6C86A8] text-[10px] font-semibold pl-3 pt-5 shadow-inner-all-sides focus:outline-none"
                placeholder="Type task details here..."
              />
              <button className="bg-butoonColor px-[140px] w-full text-[#FFFEFC] bg-[#6A6CE0] text-xs py-3 rounded cursor-pointer">
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
