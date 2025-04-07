import axios from 'axios';

const baseURL = 'https://localhost:7212/api'; // Използвай порта на твоето API

const apiClient = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Добавяне на interceptor за автоматично добавяне на JWT токен
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default apiClient;