import axios from 'axios';

const baseURL = 'https://localhost:7212/api'; // ��������� ����� �� ������ API

const apiClient = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// �������� �� interceptor �� ����������� �������� �� JWT �����
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default apiClient;