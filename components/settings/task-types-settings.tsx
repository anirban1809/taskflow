"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { TaskTypeDialog } from "./task-type-dialog";
import { TaskTypeList } from "./task-type-list";
import { TaskType } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

const defaultTaskTypes: TaskType[] = [
  {
    id: "feature",
    name: "Feature",
    color: "violet",
    icon: "puzzle",
  },
  {
    id: "bug",
    name: "Bug",
    color: "red",
    icon: "bug",
  },
  {
    id: "improvement",
    name: "Improvement",
    color: "blue",
    icon: "git-branch",
  },
  {
    id: "documentation",
    name: "Documentation",
    color: "yellow",
    icon: "book-open",
  },
];

export function TaskTypesSettings() {
  const [taskTypes, setTaskTypes] = useState<TaskType[]>(defaultTaskTypes);
  const [editingType, setEditingType] = useState<TaskType | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCreate = (taskType: Omit<TaskType, "id">) => {
    const newType = {
      ...taskType,
      id: Math.random().toString(36).substring(7),
    };
    setTaskTypes([...taskTypes, newType]);
    setDialogOpen(false);
  };

  const handleUpdate = (taskType: TaskType) => {
    setTaskTypes(taskTypes.map(type => 
      type.id === taskType.id ? taskType : type
    ));
    setEditingType(null);
  };

  const handleDelete = (typeId: string) => {
    setTaskTypes(taskTypes.filter(type => type.id !== typeId));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Types</CardTitle>
        <CardDescription>
          Manage the types of tasks that can be created in your projects.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-end">
            <Button onClick={() => setDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Type
            </Button>
          </div>

          <TaskTypeList
            taskTypes={taskTypes}
            onEdit={setEditingType}
            onDelete={handleDelete}
          />

          <TaskTypeDialog
            open={dialogOpen}
            onOpenChange={setDialogOpen}
            onSubmit={handleCreate}
          />

          <TaskTypeDialog
            open={!!editingType}
            onOpenChange={(open) => !open && setEditingType(null)}
            onSubmit={(data) => handleUpdate({ ...data, id: editingType!.id })}
            defaultValues={editingType || undefined}
          />
        </div>
      </CardContent>
    </Card>
  );
}