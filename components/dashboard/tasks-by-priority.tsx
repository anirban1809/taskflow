"use client";

import { useProjects } from "@/hooks/use-projects";
import { getTasks } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export function TasksByPriority() {
  const { projects } = useProjects();
  const allTasks = projects.flatMap(project => getTasks(project.id));
  
  const tasksByPriority = {
    high: allTasks.filter(task => task.priority === "high").length,
    medium: allTasks.filter(task => task.priority === "medium").length,
    low: allTasks.filter(task => task.priority === "low").length,
  };

  const priorityColors = {
    high: "bg-red-500",
    medium: "bg-yellow-500",
    low: "bg-green-500",
  };

  const total = Object.values(tasksByPriority).reduce((a, b) => a + b, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tasks by Priority</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(tasksByPriority).map(([priority, count]) => (
            <div key={priority} className="flex items-center">
              <div className="w-full">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">
                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {count} tasks
                  </span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full ${priorityColors[priority as keyof typeof priorityColors]}`}
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