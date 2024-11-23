"use client";

import { Project } from "@/lib/types";
import { Badge } from "../ui/badge";
import { Edit2, Plus, Users } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useProjects } from "@/hooks/use-projects";
import { Button } from "../ui/button";
import { useState } from "react";
import { ProjectDialog } from "./project-dialog";
import { MembersDialog } from "./members-dialog";
import { TaskDialog } from "../task-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { TaskTypeIcon } from "../tasks/task-type-icon";

export function ProjectHeader({ projectId }: { projectId: string }) {
  const { getProject, updateProject } = useProjects();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [membersDialogOpen, setMembersDialogOpen] = useState(false);
  const [createTaskDialogOpen, setCreateTaskDialogOpen] = useState(false);
  const [selectedTaskType, setSelectedTaskType] = useState<string | null>(null);
  const project = getProject(projectId);

  if (!project) return null;

  const handleCreateTask = (task: any) => {
    // Handle task creation
    setCreateTaskDialogOpen(false);
    setSelectedTaskType(null);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
            <Badge variant={project.status === "active" ? "default" : "secondary"}>
              {project.status}
            </Badge>
          </div>
          <p className="text-muted-foreground mt-1">{project.description}</p>
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {project.taskTypes.map((type) => (
                <DropdownMenuItem
                  key={type.id}
                  onClick={() => {
                    setSelectedTaskType(type.id);
                    setCreateTaskDialogOpen(true);
                  }}
                  className="flex items-center gap-2"
                >
                  <TaskTypeIcon type={type} className="h-4 w-4" />
                  New {type.name} Task
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="outline"
            onClick={() => setMembersDialogOpen(true)}
          >
            <Users className="h-4 w-4 mr-2" />
            Manage Members
          </Button>
          <Button
            variant="outline"
            onClick={() => setEditDialogOpen(true)}
          >
            <Edit2 className="h-4 w-4 mr-2" />
            Edit Project
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <Users className="h-4 w-4 mr-1" />
          {project.members.length} members
        </div>
        <div className="text-sm text-muted-foreground">
          Created {formatDistanceToNow(new Date(project.createdAt))} ago
        </div>
      </div>

      <ProjectDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onSubmit={(updatedData) => {
          updateProject(projectId, updatedData);
          setEditDialogOpen(false);
        }}
        defaultValues={project}
      />

      <MembersDialog
        open={membersDialogOpen}
        onOpenChange={setMembersDialogOpen}
        project={project}
        onUpdateMembers={(members) => {
          updateProject(projectId, { members });
        }}
      />

      <TaskDialog
        open={createTaskDialogOpen}
        onOpenChange={(open) => {
          setCreateTaskDialogOpen(open);
          if (!open) setSelectedTaskType(null);
        }}
        onSubmit={handleCreateTask}
        projectId={projectId}
        defaultValues={selectedTaskType ? { type: selectedTaskType } : undefined}
      />
    </div>
  );
}