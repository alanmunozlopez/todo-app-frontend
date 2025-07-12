import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { TaskFormData } from '../../types/Task';

const mockAxiosInstance = {
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  delete: vi.fn(),
  interceptors: {
    response: {
      use: vi.fn(),
    },
  },
};

vi.mock('axios', () => ({
  default: {
    create: vi.fn(() => mockAxiosInstance),
  },
}));

const mockTask = {
  id: 1,
  name: "Test Task",
  dueDate: "2024-12-31T00:00:00.000Z",
  priority: 3,
  createdAt: "2024-12-01T10:00:00.000Z",
  updatedAt: "2024-12-01T10:00:00.000Z",
  isOverdue: false,
};

const mockTaskFormData: TaskFormData = {
  name: "New Task",
  dueDate: "2024-12-31",
  priority: 3,
};

describe('taskApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getAllTasks', () => {
    it('should fetch all tasks', async () => {
      const mockResponse = { data: [mockTask] };
      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const { taskApi } = await import('../api');
      const result = await taskApi.getAllTasks();

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/task');
      expect(result).toEqual([mockTask]);
    });
  });

  describe('getTasksByType', () => {
    it('should fetch tasks by type', async () => {
      const mockResponse = { data: [mockTask] };
      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const { taskApi } = await import('../api');
      const result = await taskApi.getTasksByType('pending');

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/task?type=pending');
      expect(result).toEqual([mockTask]);
    });
  });

  describe('createTask', () => {
    it('should create a new task', async () => {
      const mockResponse = { data: mockTask };
      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const { taskApi } = await import('../api');
      const result = await taskApi.createTask(mockTaskFormData);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/task', expect.objectContaining({
        name: "New Task",
        priority: 3,
      }));
      expect(result).toEqual(mockTask);
    });
  });

  describe('updateTask', () => {
    it('should update an existing task', async () => {
      const mockResponse = { data: mockTask };
      mockAxiosInstance.put.mockResolvedValue(mockResponse);

      const { taskApi } = await import('../api');
      const result = await taskApi.updateTask(1, mockTaskFormData);

      expect(mockAxiosInstance.put).toHaveBeenCalledWith('/task/1', expect.objectContaining({
        name: "New Task",
        priority: 3,
      }));
      expect(result).toEqual(mockTask);
    });
  });

  describe('deleteTask', () => {
    it('should delete a task', async () => {
      mockAxiosInstance.delete.mockResolvedValue({});

      const { taskApi } = await import('../api');
      await taskApi.deleteTask(1);

      expect(mockAxiosInstance.delete).toHaveBeenCalledWith('/task/1');
    });
  });
});