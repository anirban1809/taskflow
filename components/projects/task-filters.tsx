"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getTasks } from "@/lib/data";
import { TaskFiltersType } from "@/lib/types";
import { X } from "lucide-react";

interface TaskFiltersProps {
  filters: TaskFiltersType;
  onChange: (filters: TaskFiltersType) => void;
  projectId: string;
}

export function TaskFilters({ filters, onChange, projectId }: TaskFiltersProps) {
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

  const clearFilters = () => {
    onChange({
      status: [],
      priority: [],
      assignee: [],
    });
  };

  const hasActiveFilters = Object.values(filters).some((f) => f.length > 0);

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Filters</h3>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="h-8 text-muted-foreground"
            >
              Clear all
            </Button>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Status</label>
            <div className="flex flex-wrap gap-2">
              {statuses.map((status) => (
                <Badge
                  key={status}
                  variant={filters.status.includes(status) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleFilter("status", status)}
                >
                  {status.replace("-", " ")}
                  {filters.status.includes(status) && (
                    <X className="ml-1 h-3 w-3" />
                  )}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Priority</label>
            <div className="flex flex-wrap gap-2">
              {priorities.map((priority) => (
                <Badge
                  key={priority}
                  variant={filters.priority.includes(priority) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleFilter("priority", priority)}
                >
                  {priority}
                  {filters.priority.includes(priority) && (
                    <X className="ml-1 h-3 w-3" />
                  )}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Assignee</label>
            <div className="flex flex-wrap gap-2">
              {assignees.map((assignee) => (
                <Badge
                  key={assignee}
                  variant={filters.assignee.includes(assignee) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleFilter("assignee", assignee)}
                >
                  {assignee}
                  {filters.assignee.includes(assignee) && (
                    <X className="ml-1 h-3 w-3" />
                  )}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}