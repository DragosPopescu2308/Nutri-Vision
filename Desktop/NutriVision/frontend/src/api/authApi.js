import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const authApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth endpoints
export const authService = {
  login: (email, password) =>
    authApi.post('/auth/login', { email, password }),

  register: (fullName, email, password) =>
    authApi.post('/auth/register', { fullName, email, password }),

  logout: () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('user');
  },
};

// Get token from localStorage
export const getToken = () => localStorage.getItem('jwtToken');

// Set token in localStorage
export const setToken = (token) => localStorage.setItem('jwtToken', token);

// Get current user from localStorage
export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Set current user in localStorage
export const setCurrentUser = (user) => localStorage.setItem('user', JSON.stringify(user));

export default authApi;



