import type { Task, TaskFormData } from '../../types/Task';

export const mockTasks: Task[] = [
  {
    id: 1,
    name: "Test Task 1",
    dueDate: "2024-12-31T00:00:00.000Z",
    priority: 3,
    createdAt: "2024-12-01T10:00:00.000Z",
    updatedAt: "2024-12-01T10:00:00.000Z",
    isOverdue: false,
  },
  {
    id: 2,
    name: "Overdue Task",
    dueDate: "2024-01-01T00:00:00.000Z",
    priority: 5,
    createdAt: "2024-01-01T10:00:00.000Z",
    updatedAt: "2024-01-01T10:00:00.000Z",
    isOverdue: true,
  },
];

export const mockTaskApi = {
  getAllTasks: vi.fn().mockResolvedValue(mockTasks),
  getTasksByType: vi.fn().mockImplementation((type: 'pending' | 'overdue') => {
    const filtered = mockTasks.filter(task => 
      type === 'pending' ? !task.isOverdue : task.isOverdue
    );
    return Promise.resolve(filtered);
  }),
  createTask: vi.fn().mockImplementation((task: TaskFormData) => {
    const newTask: Task = {
      id: 3,
      ...task,
      createdAt: "2024-12-12T10:00:00.000Z",
      updatedAt: "2024-12-12T10:00:00.000Z",
      isOverdue: false,
    };
    return Promise.resolve(newTask);
  }),
  updateTask: vi.fn().mockImplementation((id: number, task: TaskFormData) => {
    const updatedTask: Task = {
      id,
      ...task,
      createdAt: "2024-12-01T10:00:00.000Z",
      updatedAt: "2024-12-12T10:00:00.000Z",
      isOverdue: false,
    };
    return Promise.resolve(updatedTask);
  }),
  deleteTask: vi.fn().mockResolvedValue(undefined),
};