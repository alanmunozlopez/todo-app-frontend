import axios from 'axios';
import { DateTime } from 'luxon';
import type { Task, TaskFormData } from '../types/Task';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    if (error.code === 'ERR_NETWORK') {
      return Promise.reject(new Error('Backend not reachable. Check if server is running on localhost:3000 and CORS is enabled.'));
    }
    return Promise.reject(error);
  }
);

export const taskApi = {
  getAllTasks: async (): Promise<Task[]> => {
    const response = await api.get('/task');
    return response.data;
  },

  getTasksByType: async (type: 'pending' | 'overdue'): Promise<Task[]> => {
    const response = await api.get(`/task?type=${type}`);
    return response.data;
  },

  createTask: async (task: TaskFormData): Promise<Task> => {
    const taskData = {
      ...task,
      dueDate: DateTime.fromISO(task.dueDate).toISO()
    };
    const response = await api.post('/task', taskData);
    return response.data;
  },

  updateTask: async (id: number, task: TaskFormData): Promise<Task> => {
    const taskData = {
      ...task,
      dueDate: DateTime.fromISO(task.dueDate).toISO()
    };
    const response = await api.put(`/task/${id}`, taskData);
    return response.data;
  },

  deleteTask: async (id: number): Promise<void> => {
    await api.delete(`/task/${id}`);
  },
};

export default api;