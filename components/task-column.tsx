"use client";

import { Task } from "@/lib/types";
import { TaskCard } from "./task-card";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

interface TaskColumnProps {
  title: string;
  status: Task["status"];
  tasks: Task[];
  onUpdateTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
}

export function TaskColumn({
  title,
  status,
  tasks,
  onUpdateTask,
  onDeleteTask,
}: TaskColumnProps) {
  const { setNodeRef } = useDroppable({
    id: status,
  });

  return (
    <div
      ref={setNodeRef}
      className="p-4 bg-muted/50 rounded-lg space-y-4"
    >
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">{title}</h2>
        <span className="text-muted-foreground text-sm">{tasks.length}</span>
      </div>
      <SortableContext items={tasks.map(t => t.id)} strategy={rectSortingStrategy}>
        <div className="space-y-4">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onUpdate={onUpdateTask}
              onDelete={onDeleteTask}
            />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}