"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getTasks } from "@/lib/data";
import { TaskFiltersType } from "@/lib/types";
import { Filter, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskFiltersDropdownProps {
  filters: TaskFiltersType;
  onChange: (filters: TaskFiltersType) => void;
  projectId: string;
}

export function TaskFiltersDropdown({
  filters,
  onChange,
  projectId,
}: TaskFiltersDropdownProps) {
  const tasks = getTasks(projectId);
  
  // Get unique values for each filter
  const statuses = [...new Set(tasks.map((task) => task.status))];
  const priorities = [...new Set(tasks.map((task) => task.priority))];
  const assignees = [...new Set(tasks.map((task) => task.assignee))];

  const toggleFilter = (type: keyof TaskFiltersType, value: string) => {
    const currentFilters = filters[type];
    const newFilters = currentFilters.includes(value)
      ? currentFilters.filter((v) => v !== value)
      : [...currentFilters, value];

    onChange({
      ...filters,
      [type]: newFilters,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuLabel>Status</DropdownMenuLabel>
        {statuses.map((status) => (
          <div
            key={status}
            className={cn(
              "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
              filters.status.includes(status) && "bg-accent"
            )}
            onClick={() => toggleFilter("status", status)}
          >
            <Check
              className={cn(
                "mr-2 h-4 w-4",
                filters.status.includes(status) ? "opacity-100" : "opacity-0"
              )}
            />
            <span className="flex-grow">
              {status.replace("-", " ")}
            </span>
          </div>
        ))}

        <DropdownMenuSeparator />
        <DropdownMenuLabel>Priority</DropdownMenuLabel>
        {priorities.map((priority) => (
          <div
            key={priority}
            className={cn(
              "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
              filters.priority.includes(priority) && "bg-accent"
            )}
            onClick={() => toggleFilter("priority", priority)}
          >
            <Check
              className={cn(
                "mr-2 h-4 w-4",
                filters.priority.includes(priority) ? "opacity-100" : "opacity-0"
              )}
            />
            <span className="flex-grow">{priority}</span>
          </div>
        ))}

        <DropdownMenuSeparator />
        <DropdownMenuLabel>Assignee</DropdownMenuLabel>
        {assignees.map((assignee) => (
          <div
            key={assignee}
            className={cn(
              "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
              filters.assignee.includes(assignee) && "bg-accent"
            )}
            onClick={() => toggleFilter("assignee", assignee)}
          >
            <Check
              className={cn(
                "mr-2 h-4 w-4",
                filters.assignee.includes(assignee) ? "opacity-100" : "opacity-0"
              )}
            />
            <span className="flex-grow">{assignee}</span>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}