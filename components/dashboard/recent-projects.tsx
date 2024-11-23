"use client";

import { useProjects } from "@/hooks/use-projects";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { getTasks } from "@/lib/data";

export function RecentProjects() {
  const { projects } = useProjects();
  
  const recentProjects = [...projects]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Projects</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentProjects.map((project) => {
            const tasks = getTasks(project.id);
            const completedTasks = tasks.filter(t => t.status === "completed").length;
            const totalTasks = tasks.length;
            
            return (
              <Link
                key={project.id}
                href={`/projects/${project.id}/tasks`}
                className="block"
              >
                <div className="rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{project.name}</h3>
                    <Badge variant={project.status === "active" ? "default" : "secondary"}>
                      {project.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mb-3">
                    {project.description}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {completedTasks} of {totalTasks} tasks completed
                    </span>
                    <span className="text-muted-foreground">
                      Created {formatDistanceToNow(new Date(project.createdAt))} ago
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}