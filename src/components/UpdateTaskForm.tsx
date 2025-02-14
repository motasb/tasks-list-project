"use client";

import { updateTask } from "@/utils/actions";
import { UpdateTaskDto } from "@/utils/dtos";
import { createTaskSchema } from "@/utils/validationSchema";
import { Status } from "@prisma/client";
import { toast } from "react-toastify";




const UpdateTaskForm = ({id , title ,description ,status}:UpdateTaskDto) => {

const updateTaskFormHandler = async (formData:FormData) => {
    const title = formData.get("title")?.toString();
    const status = formData.get("status") as Status;
    const description = formData.get("description")?.toString();
    const id = formData.get("id")?.toString();

    const newUpdateTask = {title , status , description , id};

    const validation = createTaskSchema.safeParse(newUpdateTask);

    if(!validation.success){
        toast.error(validation.error.errors[0].message);
        return;
    }

    await updateTask(newUpdateTask as UpdateTaskDto)
    return;
  }

  return (
    <form action={updateTaskFormHandler} className="flex flex-col gap-6">
      <input type="text" hidden name="id" defaultValue={id} />
      <input
        type="text"
        placeholder="Task Title"
        name="title"
        className="p-2 text-xl rounded-md text-gray-950"
        defaultValue={title}
      />
      <select
        name="status"
        defaultValue={status}
        className="p-2 text-xl rounded-md text-gray-950"
      >
        <option value="TODO">TODO</option>
        <option value="IN_PROGRESS">IN_PROGRESS</option>
        <option value="COMPLETED">COMPLETED</option>
      </select>
      <textarea
        name="description"
        rows={5}
        placeholder="Task Description"
        defaultValue={description}
        className="p-2 text-xl rounded-md text-gray-950 resize-none"
      ></textarea>
      <button
        className="bg-cyan-300 hover:bg-cyan-400 text-black font-semibold text-xl rounded-md p-3 transition-colors"
        type="submit"
      >
        Edit Task
      </button>
    </form>
  );
};

export default UpdateTaskForm;
