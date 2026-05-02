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
export const getToken = () => {
  return localStorage.getItem('jwtToken');
};

// Set token in localStorage
export const setToken = (token) => {
  if (!token || token === 'undefined' || token === 'null') {
    localStorage.removeItem('jwtToken');
    return;
  }

  localStorage.setItem('jwtToken', token);
};

// Get current user from localStorage
export const getCurrentUser = () => {
  const user = localStorage.getItem('user');

  if (!user || user === 'undefined' || user === 'null') {
    localStorage.removeItem('user');
    return null;
  }

  try {
    return JSON.parse(user);
  } catch (error) {
    localStorage.removeItem('user');
    return null;
  }
};

// Set current user in localStorage
export const setCurrentUser = (user) => {
  if (!user || user === 'undefined' || user === 'null') {
    localStorage.removeItem('user');
    return;
  }

  localStorage.setItem('user', JSON.stringify(user));
};

export default authApi;