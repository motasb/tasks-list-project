import UpdateTaskForm from "@/components/UpdateTaskForm";
import { prisma } from "@/utils/db";
import Link from "next/link";
import { notFound } from "next/navigation";

interface EditTaskPageProps {
  params: Promise<{ id: string }>;
}

const EditTaskPage = async ({ params }: EditTaskPageProps) => {
  const task = await prisma.task.findUnique({
    where: { id: parseInt((await params).id) },
  });
  if (!task) notFound();

  return (
    <section>
      <Link className="underline block mb-10" href={`/task/${task.id}`}>
        {"<<"} Back To task details
      </Link>
      <div className="w-2/3 mx-auto rounded-md p-5 bg-slate-800 border-2 border-gray-300">
        <h1 className="mb-7 font-bold text-3xl">Edit Task</h1>
        <UpdateTaskForm
          title={task.title}
          description={task.description}
          status={task.status}
          id={(await params).id}
        />
      </div>
    </section>
  );
};

export default EditTaskPage;
