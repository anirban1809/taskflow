import { ProjectsList } from "@/components/projects/projects-list";
import { CreateProject } from "@/components/projects/create-project";
import { Navbar } from "@/components/navbar";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
            <p className="text-muted-foreground mt-1">
              Manage and collaborate on projects
            </p>
          </div>
          <CreateProject />
        </div>
        <ProjectsList />
      </main>
    </div>
  );
}