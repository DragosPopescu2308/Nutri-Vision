import axios from 'axios';
import { getToken } from './authApi';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = getToken();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }

        return Promise.reject(error);
    }
);

export const foodAPI = {
    getAll: () => api.get('/foods'),
    getById: (id) => api.get(`/foods/${id}`),
    create: (data) => api.post('/foods', data),
    update: (id, data) => api.put(`/foods/${id}`, data),
    delete: (id) => api.delete(`/foods/${id}`),
};

export const recipeAPI = {
    getAll: () => api.get('/recipes'),
    getById: (id) => api.get(`/recipes/${id}`),
    create: (data) => api.post('/recipes', data),
    update: (id, data) => api.put(`/recipes/${id}`, data),
    delete: (id) => api.delete(`/recipes/${id}`),
};

export const dailyLogAPI = {
    getToday: () => api.get('/daily-log'),
    create: (data) => api.post('/daily-log', data),
    delete: (id) => api.delete(`/daily-log/${id}`),
};

export default api;