export interface Task {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "completed";
  assignee: string;
  priority: "low" | "medium" | "high";
  projectId?: string;
  startDate?: string;
  endDate?: string;
  type: TaskType;
  customFields?: Record<string, string>;
  parentId?: string;
  childTasks?: Task[];
}

export interface TaskType {
  id: string;
  name: string;
  color: string;
  icon: string;
  customFields: CustomField[];
}

export interface CustomField {
  id: string;
  name: string;
  type: "text" | "number" | "url" | "email" | "date" | "select";
  required: boolean;
  options?: string[]; // For select type fields
}

export interface Project {
  id: string;
  name: string;
  description: string;
  members: string[];
  createdAt: string;
  status: "active" | "archived";
  taskTypes: TaskType[];
}

export interface TaskFiltersType {
  status: string[];
  priority: string[];
  assignee: string[];
  type: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "member";
  status: "active" | "invited";
  joinedAt: string;
}</content>