"use client";

import { Task } from "@/lib/types";
import { TaskCard } from "./task-card";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useState } from "react";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { TaskColumn } from "./task-column";

interface TaskListProps {
  tasks: Task[];
  onUpdateTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
}

export function TaskList({ tasks, onUpdateTask, onDeleteTask }: TaskListProps) {
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const todoTasks = tasks.filter((task) => task.status === "todo");
  const inProgressTasks = tasks.filter((task) => task.status === "in-progress");
  const completedTasks = tasks.filter((task) => task.status === "completed");

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find((t) => t.id === event.active.id);
    if (task) setActiveTask(task);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    // If there's no over target or it's not a valid status, keep the task in its current state
    if (!over || !["todo", "in-progress", "completed"].includes(over.id as string)) {
      setActiveTask(null);
      return;
    }

    const task = tasks.find((t) => t.id === active.id);
    if (!task) return;

    const newStatus = over.id as Task["status"];
    if (task.status !== newStatus) {
      onUpdateTask({
        ...task,
        status: newStatus,
      });
    }

    setActiveTask(null);
  };

  const handleDragCancel = () => {
    setActiveTask(null);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <TaskColumn
          title="To Do"
          status="todo"
          tasks={todoTasks}
          onDeleteTask={onDeleteTask}
          onUpdateTask={onUpdateTask}
        />
        <TaskColumn
          title="In Progress"
          status="in-progress"
          tasks={inProgressTasks}
          onDeleteTask={onDeleteTask}
          onUpdateTask={onUpdateTask}
        />
        <TaskColumn
          title="Completed"
          status="completed"
          tasks={completedTasks}
          onDeleteTask={onDeleteTask}
          onUpdateTask={onUpdateTask}
        />
      </div>
      <DragOverlay>
        {activeTask && (
          <div className="w-full">
            <TaskCard
              task={activeTask}
              onUpdate={onUpdateTask}
              onDelete={onDeleteTask}
            />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}