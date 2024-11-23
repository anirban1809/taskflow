"use client";

import { useState } from "react";
import { Task, TaskFiltersType } from "@/lib/types";
import { TaskList } from "./task-list";
import { Button } from "./ui/button";
import { TaskDialog } from "./task-dialog";
import { Plus } from "lucide-react";
import { getTasks } from "@/lib/data";

interface TaskBoardProps {
  projectId?: string;
  filters?: TaskFiltersType;
}

export function TaskBoard({ projectId, filters }: TaskBoardProps) {
  const initialTasks = getTasks(projectId || "");
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [open, setOpen] = useState(false);

  const filteredTasks = tasks.filter((task) => {
    if (!filters) return true;
    
    const statusMatch = filters.status.length === 0 || filters.status.includes(task.status);
    const priorityMatch = filters.priority.length === 0 || filters.priority.includes(task.priority);
    const assigneeMatch = filters.assignee.length === 0 || filters.assignee.includes(task.assignee);

    return statusMatch && priorityMatch && assigneeMatch;
  });

  const handleCreateTask = (task: Omit<Task, "id">) => {
    const newTask = {
      ...task,
      id: Math.random().toString(36).substr(2, 9),
      projectId,
    };
    setTasks([...tasks, newTask]);
  };

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks(tasks.map((task) => 
      task.id === updatedTask.id ? updatedTask : task
    ));
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="space-y-8">
      <TaskList
        tasks={filteredTasks}
        onUpdateTask={handleUpdateTask}
        onDeleteTask={handleDeleteTask}
      />
      <TaskDialog
        open={open}
        onOpenChange={setOpen}
        onSubmit={handleCreateTask}
      />
    </div>
  );
}