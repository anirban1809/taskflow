"use client";

import { useState } from "react";
import { TaskBoard } from "@/components/task-board";
import { TaskTable } from "@/components/tasks/task-table";
import { Button } from "@/components/ui/button";
import { LayoutGrid, Table } from "lucide-react";
import { TaskFiltersDropdown } from "./task-filters-dropdown";
import { TaskFiltersType } from "@/lib/types";
import { Badge } from "../ui/badge";
import { X } from "lucide-react";

interface ProjectTasksProps {
  projectId: string;
}

export function ProjectTasks({ projectId }: ProjectTasksProps) {
  const [view, setView] = useState<"kanban" | "table">("kanban");
  const [filters, setFilters] = useState<TaskFiltersType>({
    status: [],
    priority: [],
    assignee: [],
  });

  const clearFilters = () => {
    setFilters({
      status: [],
      priority: [],
      assignee: [],
    });
  };

  const hasActiveFilters = Object.values(filters).some((f) => f.length > 0);

  return (
    <div>
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex justify-between items-center">
          <TaskFiltersDropdown
            filters={filters}
            onChange={setFilters}
            projectId={projectId}
          />
          
          <div className="flex gap-2">
            <Button
              variant={view === "kanban" ? "default" : "outline"}
              size="sm"
              onClick={() => setView("kanban")}
            >
              <LayoutGrid className="h-4 w-4 mr-2" />
              Kanban
            </Button>
            <Button
              variant={view === "table" ? "default" : "outline"}
              size="sm"
              onClick={() => setView("table")}
            >
              <Table className="h-4 w-4 mr-2" />
              Table
            </Button>
          </div>
        </div>

        {hasActiveFilters && (
          <div className="flex items-center gap-2 flex-wrap">
            <div className="text-sm text-muted-foreground">Active filters:</div>
            {filters.status.map((status) => (
              <Badge
                key={status}
                variant="secondary"
                className="flex items-center gap-1"
              >
                Status: {status.replace("-", " ")}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() =>
                    setFilters({
                      ...filters,
                      status: filters.status.filter((s) => s !== status),
                    })
                  }
                />
              </Badge>
            ))}
            {filters.priority.map((priority) => (
              <Badge
                key={priority}
                variant="secondary"
                className="flex items-center gap-1"
              >
                Priority: {priority}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() =>
                    setFilters({
                      ...filters,
                      priority: filters.priority.filter((p) => p !== priority),
                    })
                  }
                />
              </Badge>
            ))}
            {filters.assignee.map((assignee) => (
              <Badge
                key={assignee}
                variant="secondary"
                className="flex items-center gap-1"
              >
                Assignee: {assignee}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() =>
                    setFilters({
                      ...filters,
                      assignee: filters.assignee.filter((a) => a !== assignee),
                    })
                  }
                />
              </Badge>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="h-7 px-2 text-muted-foreground"
            >
              Clear all
            </Button>
          </div>
        )}
      </div>

      {view === "kanban" ? (
        <TaskBoard projectId={projectId} filters={filters} />
      ) : (
        <TaskTable projectId={projectId} filters={filters} />
      )}
    </div>
  );
}