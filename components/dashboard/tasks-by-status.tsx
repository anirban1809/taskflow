"use client";

import { useProjects } from "@/hooks/use-projects";
import { getTasks } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export function TasksByStatus() {
  const { projects } = useProjects();
  const allTasks = projects.flatMap(project => getTasks(project.id));
  
  const tasksByStatus = {
    todo: allTasks.filter(task => task.status === "todo").length,
    "in-progress": allTasks.filter(task => task.status === "in-progress").length,
    completed: allTasks.filter(task => task.status === "completed").length,
  };

  const total = Object.values(tasksByStatus).reduce((a, b) => a + b, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tasks by Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(tasksByStatus).map(([status, count]) => (
            <div key={status} className="flex items-center">
              <div className="w-full">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">
                    {status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {count} tasks
                  </span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-primary"
                    style={{ width: `${(count / total) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}