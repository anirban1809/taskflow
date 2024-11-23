"use client";

import { Project } from "@/lib/types";
import { useState } from "react";
import { projects as initialProjects } from "@/lib/data";

export function useProjects() {
  const [projects, setProjects] = useState(initialProjects);

  const getProject = (id: string) => {
    return projects.find(project => project.id === id);
  };

  const updateProject = (id: string, updatedData: Partial<Project>) => {
    setProjects(projects.map(project => 
      project.id === id 
        ? { ...project, ...updatedData }
        : project
    ));
  };

  return {
    projects,
    getProject,
    updateProject,
  };
}