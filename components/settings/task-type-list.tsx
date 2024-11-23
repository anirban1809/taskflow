"use client";

import { TaskType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";
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
import { TaskTypeIcon } from "../tasks/task-type-icon";

interface TaskTypeListProps {
  taskTypes: TaskType[];
  onEdit: (taskType: TaskType) => void;
  onDelete: (typeId: string) => void;
}

export function TaskTypeList({ taskTypes, onEdit, onDelete }: TaskTypeListProps) {
  return (
    <div className="space-y-4">
      {taskTypes.map((type) => (
        <div
          key={type.id}
          className="flex items-center justify-between p-4 rounded-lg border"
        >
          <div className="flex items-center gap-3">
            <TaskTypeIcon type={type} className="h-5 w-5" />
            <span className="font-medium">{type.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(type)}
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
                  <AlertDialogTitle>Delete Task Type</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete this task type? This action
                    cannot be undone and may affect existing tasks.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => onDelete(type.id)}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      ))}
    </div>
  );
}