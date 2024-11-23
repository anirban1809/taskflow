import { Navbar } from "@/components/navbar";
import { TaskDetails } from "@/components/tasks/task-details";
import { getAllProjectIds, getAllTaskIds } from "@/lib/data";

export function generateStaticParams() {
  const paths = [];
  const projectIds = getAllProjectIds();
  
  for (const projectId of projectIds) {
    const taskIds = getAllTaskIds(projectId);
    for (const taskId of taskIds) {
      paths.push({ id: projectId, taskId });
    }
  }
  
  return paths;
}

export default function TaskDetailsPage({ 
  params 
}: { 
  params: { id: string; taskId: string } 
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TaskDetails projectId={params.id} taskId={params.taskId} />
      </main>
    </div>
  );
}