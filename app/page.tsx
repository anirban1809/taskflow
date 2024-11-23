import { Navbar } from "@/components/navbar";
import { DashboardStats } from "@/components/dashboard/stats";
import { RecentProjects } from "@/components/dashboard/recent-projects";
import { TasksByStatus } from "@/components/dashboard/tasks-by-status";
import { TasksByPriority } from "@/components/dashboard/tasks-by-priority";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Overview of your projects and tasks
          </p>
        </div>
        
        <div className="space-y-8">
          <DashboardStats />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <TasksByStatus />
            <TasksByPriority />
          </div>
          
          <RecentProjects />
        </div>
      </main>
    </div>
  );
}