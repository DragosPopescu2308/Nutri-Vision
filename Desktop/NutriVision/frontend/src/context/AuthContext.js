import React, { createContext, useState, useEffect, useCallback } from 'react';
import { getToken, getCurrentUser, setToken, setCurrentUser } from '../api/authApi';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setTokenState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const savedToken = getToken();
    const savedUser = getCurrentUser();

    if (savedToken) {
      setTokenState(savedToken);
      setUser(savedUser);
      setIsAuthenticated(true);
    } else {
      setTokenState(null);
      setUser(null);
      setIsAuthenticated(false);
    }

    setLoading(false);
  }, []);

  const login = useCallback((user, token) => {
    setToken(token);
    setCurrentUser(user);

    setTokenState(token);
    setUser(user || null);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('user');

    setTokenState(null);
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const value = {
    user,
    token,
    loading,
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
};