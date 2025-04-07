import apiClient from './api-client';
import { Task, CreateTaskDto, UpdateTaskDto } from '../models/task';

export const taskService = {
    getTasks: async () => {
        const response = await apiClient.get<Task[]>('/Tasks');
        return response.data;
    },

    getTask: async (id: number) => {
        const response = await apiClient.get<Task>(`/Tasks/${id}`);
        return response.data;
    },

    createTask: async (task: CreateTaskDto) => {
        const response = await apiClient.post<Task>('/Tasks', task);
        return response.data;
    },

    updateTask: async (id: number, task: UpdateTaskDto) => {
        const response = await apiClient.put<void>(`/Tasks/${id}`, task);
        return response.data;
    },

    deleteTask: async (id: number) => {
        const response = await apiClient.delete<void>(`/Tasks/${id}`);
        return response.data;
    }
};