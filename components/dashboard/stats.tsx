"use client";

import { useProjects } from "@/hooks/use-projects";
import { getTasks } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Clock, ListTodo, Users2 } from "lucide-react";

export function DashboardStats() {
  const { projects } = useProjects();
  const allTasks = projects.flatMap(project => getTasks(project.id));
  const totalMembers = [...new Set(projects.flatMap(p => p.members))].length;
  const urgentTasks = allTasks.filter(task => task.priority === "high").length;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
          <ListTodo className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {projects.filter(p => p.status === "active").length}
          </div>
          <p className="text-xs text-muted-foreground">
            {projects.length} total projects
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Team Members</CardTitle>
          <Users2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalMembers}</div>
          <p className="text-xs text-muted-foreground">
            Across all projects
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Urgent Tasks</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{urgentTasks}</div>
          <p className="text-xs text-muted-foreground">
            High priority tasks
          </p>
        </CardContent>
      </Card>
    </div>
  );
}