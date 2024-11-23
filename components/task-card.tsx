"use client";

import { Task } from "@/lib/types";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Edit2, Trash2 } from "lucide-react";
import { TaskDialog } from "./task-dialog";
import { useState } from "react";
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
} from "./ui/alert-dialog";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Link from "next/link";
import { TaskTypeIcon } from "./tasks/task-type-icon";

interface TaskCardProps {
  task: Task;
  onUpdate: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

export function TaskCard({ task, onUpdate, onDelete }: TaskCardProps) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const priorityColors = {
    low: "bg-green-500/10 text-green-500",
    medium: "bg-yellow-500/10 text-yellow-500",
    high: "bg-red-500/10 text-red-500",
  };

  return (
    <>
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <Card className="cursor-grab active:cursor-grabbing">
          <Link href={`/projects/${task.projectId}/tasks/${task.id}`}>
            <CardContent className="pt-6 hover:bg-muted/50 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <TaskTypeIcon type={task.type} className="h-4 w-4" />
                  <h3 className="font-semibold">{task.title}</h3>
                </div>
                <Badge
                  variant="secondary"
                  className={priorityColors[task.priority]}
                >
                  {task.priority}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{task.description}</p>
              <div className="text-sm text-muted-foreground">
                Assigned to: {task.assignee}
              </div>
            </CardContent>
          </Link>
          <CardFooter className="justify-end space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.preventDefault();
                setEditDialogOpen(true);
              }}
            >
              <Edit2 className="h-4 w-4" />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={(e) => e.preventDefault()}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Task</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete this task? This action cannot be
                    undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => onDelete(task.id)}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </Card>
      </div>
      <TaskDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onSubmit={(updatedTask) => onUpdate({ ...updatedTask, id: task.id })}
        defaultValues={task}
        projectId={task.projectId}
      />
    </>
  );
}