import React, { useState, useEffect } from 'react';
import './App.css';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import FoodPage from './pages/FoodPage';
import RecipePage from './pages/RecipePage';

function MainApp() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const { isAuthenticated, loading, user, logout } = useAuth();

  // Auto-reset to dashboard when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      setCurrentPage('dashboard');
    }
  }, [isAuthenticated]);

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <div className="app">
      <nav className="navbar">
        <h1>🥗 NutriVision</h1>
        <ul className="nav-links">
          <li>
            <a 
              href="#/"
              onClick={() => setCurrentPage('dashboard')}
              className={currentPage === 'dashboard' ? 'active' : ''}
            >
              Dashboard
            </a>
          </li>
          <li>
            <a 
              href="#/foods"
              onClick={() => setCurrentPage('foods')}
              className={currentPage === 'foods' ? 'active' : ''}
            >
              Foods
            </a>
          </li>
          <li>
            <a 
              href="#/recipes"
              onClick={() => setCurrentPage('recipes')}
              className={currentPage === 'recipes' ? 'active' : ''}
            >
              Recipes
            </a>
          </li>
          <li className="navbar-user">
            <span className="user-info">👤 {user?.name || user?.fullName || 'User'}</span>
            <button
              onClick={logout}
              className="logout-button"
            >
              🔓 Logout
            </button>
          </li>
        </ul>
      </nav>

      <div className="container">
        {currentPage === 'dashboard' && <Dashboard />}
        {currentPage === 'foods' && <FoodPage />}
        {currentPage === 'recipes' && <RecipePage />}
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

export default App;

