"use client";

import { Task } from "@/lib/types";
import { useState, useCallback } from "react";
import { getTasks } from "@/lib/data";

export function useTask(projectId: string, taskId: string) {
  const [task, setTask] = useState<Task | null>(() => {
    const tasks = getTasks(projectId);
    return tasks.find(t => t.id === taskId) || null;
  });

  const updateTask = useCallback((updatedTask: Task) => {
    setTask(updatedTask);
  }, []);

  return {
    task,
    updateTask,
  };
}