"use client";

import { useTask } from "@/hooks/use-task";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Calendar, Clock, Edit2, MessageSquare, Plus, User } from "lucide-react";
import { TaskDialog } from "../task-dialog";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { format, formatDistanceToNow } from "date-fns";
import { Textarea } from "../ui/textarea";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { ScrollArea } from "../ui/scroll-area";
import { Card } from "../ui/card";
import { TaskTypeIcon } from "./task-type-icon";
import { getProject } from "@/lib/data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";

interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

interface TaskDetailsProps {
  projectId: string;
  taskId: string;
}

export function TaskDetails({ projectId, taskId }: TaskDetailsProps) {
  const router = useRouter();
  const { task, updateTask } = useTask(projectId, taskId);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [createChildDialogOpen, setCreateChildDialogOpen] = useState(false);
  const [selectedTaskType, setSelectedTaskType] = useState<string | null>(null);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      author: "John Doe",
      content: "Let's try to complete this by end of week.",
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    },
  ]);

  const project = projectId ? getProject(projectId) : null;
  const taskTypes = project?.taskTypes || [];

  if (!task || !project) {
    return null;
  }

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

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Math.random().toString(36).substring(7),
      author: "Current User",
      content: newComment.trim(),
      createdAt: new Date().toISOString(),
    };

    setComments([...comments, comment]);
    setNewComment("");
  };

  const handleCreateChildTask = (childTask: any) => {
    // Handle child task creation
    setCreateChildDialogOpen(false);
    setSelectedTaskType(null);
  };

  const renderCustomFieldValue = (field: any, value: string) => {
    switch (field.type) {
      case "date":
        return value ? format(new Date(value), "PPP") : "Not set";
      case "url":
        return (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            {value}
          </a>
        );
      case "email":
        return (
          <a
            href={`mailto:${value}`}
            className="text-primary hover:underline"
          >
            {value}
          </a>
        );
      default:
        return value;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          onClick={() => router.push(`/projects/${projectId}/tasks`)}
        >
          ← Back to Tasks
        </Button>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Child Task
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {taskTypes.map((type) => (
                <DropdownMenuItem
                  key={type.id}
                  onClick={() => {
                    setSelectedTaskType(type.id);
                    setCreateChildDialogOpen(true);
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
            onClick={() => setEditDialogOpen(true)}
          >
            <Edit2 className="h-4 w-4 mr-2" />
            Edit Task
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-8">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-3xl font-bold">{task.title}</h1>
              <Badge
                variant="secondary"
                className={priorityColors[task.priority]}
              >
                {task.priority} priority
              </Badge>
              <Badge
                variant="secondary"
                className={statusColors[task.status]}
              >
                {task.status.replace("-", " ")}
              </Badge>
            </div>
            <p className="text-lg text-muted-foreground">
              {task.description}
            </p>
          </div>

          {/* Task Relationships */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Task Relationships</h2>
            <div className="space-y-4">
              {task.parentId && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Parent Task</h3>
                  <Link 
                    href={`/projects/${projectId}/tasks/${task.parentId}`}
                    className="block p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <TaskTypeIcon type={task.type} className="h-4 w-4" />
                      <span className="font-medium">Parent Task Title</span>
                    </div>
                  </Link>
                </div>
              )}

              {task.childTasks && task.childTasks.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Child Tasks</h3>
                  <div className="space-y-2">
                    {task.childTasks.map((childTask) => (
                      <Link
                        key={childTask.id}
                        href={`/projects/${projectId}/tasks/${childTask.id}`}
                        className="block p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <TaskTypeIcon type={childTask.type} className="h-4 w-4" />
                            <span className="font-medium">{childTask.title}</span>
                          </div>
                          <Badge variant="secondary" className={statusColors[childTask.status]}>
                            {childTask.status.replace("-", " ")}
                          </Badge>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>

          {task.type.customFields?.length > 0 && (
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TaskTypeIcon type={task.type} className="h-5 w-5" />
                {task.type.name} Fields
              </h2>
              <div className="grid gap-4">
                {task.type.customFields.map((field) => (
                  <div key={field.id}>
                    <div className="text-sm font-medium text-muted-foreground mb-1">
                      {field.name}
                    </div>
                    <div>
                      {task.customFields?.[field.id]
                        ? renderCustomFieldValue(field, task.customFields[field.id])
                        : "Not set"}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          <div className="space-y-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Comments & Notes
            </h2>
            
            <form onSubmit={handleAddComment} className="space-y-4">
              <Textarea
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[100px]"
              />
              <Button type="submit" disabled={!newComment.trim()}>
                Add Comment
              </Button>
            </form>

            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {comments.map((comment) => (
                  <Card key={comment.id} className="p-4">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarFallback>
                          {comment.author.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold">{comment.author}</span>
                          <span className="text-sm text-muted-foreground">
                            {formatDistanceToNow(new Date(comment.createdAt))} ago
                          </span>
                        </div>
                        <p className="text-sm">{comment.content}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="p-4">
            <h3 className="font-semibold mb-4">Task Details</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <User className="h-4 w-4" />
                <span>Assigned to {task.assignee}</span>
              </div>
              
              {task.startDate && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Starts {format(new Date(task.startDate), "PPP")}</span>
                </div>
              )}
              
              {task.endDate && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Due {format(new Date(task.endDate), "PPP")}</span>
                </div>
              )}
              
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Created {formatDistanceToNow(new Date())} ago</span>
              </div>
              
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Last updated {formatDistanceToNow(new Date())} ago</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <TaskDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onSubmit={(updatedTask) => {
          updateTask({ ...updatedTask, id: task.id });
          setEditDialogOpen(false);
        }}
        defaultValues={task}
        projectId={projectId}
      />

      <TaskDialog
        open={createChildDialogOpen}
        onOpenChange={(open) => {
          setCreateChildDialogOpen(open);
          if (!open) setSelectedTaskType(null);
        }}
        onSubmit={handleCreateChildTask}
        projectId={projectId}
        defaultValues={selectedTaskType ? { 
          type: selectedTaskType,
          parentId: task.id 
        } : undefined}
      />
    </div>
  );
}