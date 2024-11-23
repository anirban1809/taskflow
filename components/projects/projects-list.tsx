"use client";

import { useState } from "react";
import { Project } from "@/lib/types";
import { ProjectCard } from "./project-card";

const initialProjects: Project[] = [
  {
    id: "1",
    name: "Website Redesign",
    description: "Complete overhaul of the company website with modern design",
    members: ["John Doe", "Sarah Chen", "Mike Johnson"],
    createdAt: "2024-03-10T10:00:00Z",
    status: "active",
  },
  {
    id: "2",
    name: "Mobile App Development",
    description: "Native mobile application for iOS and Android platforms",
    members: ["Sarah Chen", "Alex Wong", "Emma Davis"],
    createdAt: "2024-03-08T15:30:00Z",
    status: "active",
  },
];

export function ProjectsList() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  const handleDeleteProject = (projectId: string) => {
    setProjects(projects.filter((project) => project.id !== projectId));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onDelete={handleDeleteProject}
        />
      ))}
    </div>
  );
}