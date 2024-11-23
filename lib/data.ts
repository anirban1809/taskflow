import { Project, Task, TaskType } from "./types";

const defaultTaskTypes: TaskType[] = [
  {
    id: "feature",
    name: "Feature",
    color: "violet",
    icon: "puzzle",
    customFields: [
      {
        id: "story-points",
        name: "Story Points",
        type: "number",
        required: true,
      },
      {
        id: "acceptance-criteria",
        name: "Acceptance Criteria",
        type: "text",
        required: true,
      },
    ],
  },
  {
    id: "bug",
    name: "Bug",
    color: "red",
    icon: "bug",
    customFields: [
      {
        id: "steps-to-reproduce",
        name: "Steps to Reproduce",
        type: "text",
        required: true,
      },
      {
        id: "severity",
        name: "Severity",
        type: "select",
        required: true,
        options: ["Low", "Medium", "High", "Critical"],
      },
    ],
  },
  {
    id: "improvement",
    name: "Improvement",
    color: "blue",
    icon: "git-branch",
    customFields: [
      {
        id: "impact",
        name: "Impact",
        type: "text",
        required: false,
      },
    ],
  },
  {
    id: "documentation",
    name: "Documentation",
    color: "yellow",
    icon: "book-open",
    customFields: [
      {
        id: "doc-url",
        name: "Documentation URL",
        type: "url",
        required: false,
      },
    ],
  },
];

export const projects: Project[] = [
  {
    id: "1",
    name: "Website Redesign",
    description: "Complete overhaul of the company website with modern design",
    members: ["John Doe", "Sarah Chen", "Mike Johnson"],
    createdAt: "2024-03-10T10:00:00Z",
    status: "active",
    taskTypes: defaultTaskTypes,
  },
  {
    id: "2",
    name: "Mobile App Development",
    description: "Native mobile application for iOS and Android platforms",
    members: ["Sarah Chen", "Alex Wong", "Emma Davis"],
    createdAt: "2024-03-08T15:30:00Z",
    status: "active",
    taskTypes: defaultTaskTypes,
  },
];

const tasks: Task[] = [
  {
    id: "1",
    title: "Implement authentication",
    description: "Add user authentication using NextAuth.js",
    status: "in-progress",
    assignee: "Sarah Chen",
    priority: "high",
    projectId: "1",
    type: defaultTaskTypes[0],
    customFields: {
      "story-points": "5",
      "acceptance-criteria": "- User can sign up\n- User can sign in\n- User can reset password",
    },
  },
  {
    id: "2",
    title: "Design system documentation",
    description: "Create comprehensive documentation for our design system",
    status: "todo",
    assignee: "Mike Johnson",
    priority: "medium",
    projectId: "1",
    type: defaultTaskTypes[3],
    customFields: {
      "doc-url": "https://docs.example.com/design-system",
    },
  },
];

export function getAllProjectIds() {
  return projects.map(project => project.id);
}

export function getAllTaskIds(projectId: string) {
  return tasks
    .filter(task => task.projectId === projectId)
    .map(task => task.id);
}

export function getProject(id: string) {
  return projects.find(project => project.id === id);
}

export function getTasks(projectId: string) {
  return tasks.filter(task => task.projectId === projectId);
}