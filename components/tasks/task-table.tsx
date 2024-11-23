"use client";

import { Task, TaskFiltersType } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit2, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { TaskDialog } from "@/components/task-dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import { getTasks } from "@/lib/data";

interface TaskTableProps {
  projectId: string;
  filters?: TaskFiltersType;
}

export function TaskTable({ projectId, filters }: TaskTableProps) {
  const [tasks, setTasks] = useState<Task[]>(getTasks(projectId));
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const filteredTasks = tasks.filter((task) => {
    if (!filters) return true;
    
    const statusMatch = filters.status.length === 0 || filters.status.includes(task.status);
    const priorityMatch = filters.priority.length === 0 || filters.priority.includes(task.priority);
    const assigneeMatch = filters.assignee.length === 0 || filters.assignee.includes(task.assignee);

    return statusMatch && priorityMatch && assigneeMatch;
  });

  const priorityColors = {
    low: "bg-green-500/10 text-green-500",
    medium: "bg-yellow-500/10 text-yellow-500",
    high: "bg-red-500/10 text-red-500",
  };

  const statusColors = {
    todo: "bg-slate-500/10 text-slate-500",
    "in-progress": "bg-blue-500/10 text-blue-500",
    completed: "bg-green-500/10 text-green-500",
  };

  const handleCreateTask = (task: Omit<Task, "id">) => {
    const newTask = {
      ...task,
      id: Math.random().toString(36).substr(2, 9),
      projectId,
    };
    setTasks([...tasks, newTask]);
    setCreateDialogOpen(false);
  };

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks(tasks.map((task) => 
      task.id === updatedTask.id ? updatedTask : task
    ));
    setEditTask(null);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => setCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Assignee</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>
                  <Link
                    href={`/projects/${projectId}/tasks/${task.id}`}
                    className="hover:underline"
                  >
                    {task.title}
                  </Link>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={statusColors[task.status]}
                  >
                    {task.status.replace("-", " ")}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={priorityColors[task.priority]}
                  >
                    {task.priority}
                  </Badge>
                </TableCell>
                <TableCell>{task.assignee}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setEditTask(task)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Task</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this task? This action
                            cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteTask(task.id)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <TaskDialog
        open={!!editTask}
        onOpenChange={(open) => !open && setEditTask(null)}
        onSubmit={(updatedTask) =>
          handleUpdateTask({ ...updatedTask, id: editTask!.id })
        }
        defaultValues={editTask || undefined}
      />

      <TaskDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSubmit={handleCreateTask}
      />
    </div>
  );
}