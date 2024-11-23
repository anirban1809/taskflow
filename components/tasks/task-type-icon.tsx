"use client";

import { TaskType } from "@/lib/types";
import { 
  Bug, 
  GitBranch, 
  BookOpen, 
  Puzzle,
  LucideIcon,
  LucideProps 
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  bug: Bug,
  "git-branch": GitBranch,
  "book-open": BookOpen,
  puzzle: Puzzle,
};

interface TaskTypeIconProps extends LucideProps {
  type: TaskType;
}

export function TaskTypeIcon({ type, className, ...props }: TaskTypeIconProps) {
  const Icon = iconMap[type.icon];
  
  if (!Icon) return null;

  const colorMap: Record<string, string> = {
    red: "text-red-500",
    blue: "text-blue-500",
    green: "text-green-500",
    yellow: "text-yellow-500",
    violet: "text-violet-500",
  };

  return (
    <Icon 
      className={cn(colorMap[type.color], className)} 
      {...props} 
    />
  );
}