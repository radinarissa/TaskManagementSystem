import apiClient from './api-client';
import { LoginModel, RegisterModel, AuthResponse } from '../models/auth';

export const authService = {
    register: async (registerData: RegisterModel) => {
        const response = await apiClient.post<void>('/Auth/register', registerData);
        return response.data;
    },

    login: async (loginData: LoginModel) => {
        const response = await apiClient.post<AuthResponse>('/Auth/login', loginData);
        localStorage.setItem('token', response.data.token);
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('token');
    },

    isAuthenticated: () => {
        return localStorage.getItem('token') !== null;
    }
};