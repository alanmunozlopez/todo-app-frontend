export interface Task {
  id: number;
  name: string;
  dueDate: string;
  priority: number;
  createdAt: string;
  updatedAt: string;
  isOverdue?: boolean;
}

export interface TaskFormData {
  name: string;
  dueDate: string;
  priority: number;
}

export type TaskFilter = "all" | "pending" | "overdue";
