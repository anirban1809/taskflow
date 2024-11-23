import { Navbar } from "@/components/navbar";
import { ProjectHeader } from "@/components/projects/project-header";
import { ProjectTasks } from "@/components/projects/project-tasks";
import { getAllProjectIds } from "@/lib/data";

export function generateStaticParams() {
  return getAllProjectIds().map(id => ({ id }));
}

export default function ProjectTasksPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProjectHeader projectId={params.id} />
        <ProjectTasks projectId={params.id} />
      </main>
    </div>
  );
}