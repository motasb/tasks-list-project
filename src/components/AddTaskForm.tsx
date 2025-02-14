"use client";
import { createTask } from "@/utils/actions";
import { CreateTaskDto } from "@/utils/dtos";
import {createTaskSchema} from "@/utils/validationSchema";
import { toast } from "react-toastify";

const AddTaskForm = () => {

    const clientAction = async (formData:FormData): Promise<void>=>{
        const title = formData.get("title")?.toString();
        const description = formData.get("description")?.toString();

        const validation = createTaskSchema.safeParse({title , description});
        if(!validation.success){
            toast.error(validation.error.errors[0].message);
            return;
        }
        await createTask({title , description} as CreateTaskDto);
        return;
    }

  return (
    <form action={clientAction} className="flex flex-col gap-6">
    <input
      type="text"
      name="title"
      placeholder="Task Title"
      className="p-2 text-xl rounded-md text-gray-950"
    />
    <textarea
      name="description"
      rows={5}
      placeholder="TaskDescription"
      className="p-2 text-xl rounded-md text-gray-950 resize-none"
    ></textarea>
    <button
      type="submit"
      className="bg-cyan-300 hover:bg-cyan-400 text-black font-semibold text-xl rounded-md p-3 transition-colors"
    >
      Add Task
    </button>
  </form>
  )
}

export default AddTaskForm