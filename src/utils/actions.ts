"use server";

import { prisma } from "@/utils/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { CreateTaskDto, UpdateTaskDto } from "./dtos";

// create task server action
export async function createTask({ title, description }: CreateTaskDto) {
  if (typeof title !== "string" || title.length < 2) return;
  if (typeof description !== "string" || description.length < 4) return;

  try {
    await prisma.task.create({
      data: {
        title,
        description,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error("could not create the task , please try again");
  }

  // revalidatePath("/");
  redirect("/");
}

// delete task server action
export async function deleteTask(formData: FormData) {
  const id = formData.get("id")?.toString();
  if (!id) return;
  try {
    await prisma.task.delete({ where: { id: parseInt(id) } });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error("could not delete the task , please try again");
  }
  
  // revalidatePath("/");
  redirect("/");
}

// update task server action
export async function updateTask({description ,  title , status , id}:UpdateTaskDto){
  if (typeof title !== "string" || title.length < 2) return;
  if (typeof description !== "string" || description.length < 4) return;
  if (!status) return;
  if (typeof id !== "string") return;

  try {
    await prisma.task.update({
      where:{id:parseInt(id)},
      data :{
        title,
        description, 
        status,
    }}) 
    
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error("could not update the task , please try again");
  }

  // revalidatePath("/");
  revalidatePath(`/task/${id}`);
  redirect(`/task/${id}`);

} 