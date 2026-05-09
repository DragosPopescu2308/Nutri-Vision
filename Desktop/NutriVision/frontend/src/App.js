import React, { useState, useEffect } from 'react';
import './App.css';

import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import FoodPage from './pages/FoodPage';
import RecipePage from './pages/RecipePage';
import DailyJournalPage from './pages/DailyJournalPage';

import logo from './assets/nutrivision-logo.png';

function MainApp() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const { isAuthenticated, loading, user, logout } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      setCurrentPage('dashboard');
    }
  }, [isAuthenticated]);

  if (loading) {
    return (
        <div className="loading-screen">
          <div className="loading-spinner"></div>
          <p>Loading NutriVision...</p>
        </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  const username = user?.fullName || user?.name || user?.email || 'User';

  return (
      <div className="app-shell">
        <aside className="sidebar">
          <button
              className="sidebar-logo"
              onClick={() => setCurrentPage('dashboard')}
          >
            <img src={logo} alt="NutriVision logo" className="app-logo" />

            <div>
              <h1>NutriVision</h1>
              <span>Smart nutrition tracker</span>
            </div>
          </button>

          <nav className="sidebar-nav">
            <button
                className={`sidebar-link ${currentPage === 'dashboard' ? 'active' : ''}`}
                onClick={() => setCurrentPage('dashboard')}
            >
              📊 Dashboard
            </button>

            <button
                className={`sidebar-link ${currentPage === 'foods' ? 'active' : ''}`}
                onClick={() => setCurrentPage('foods')}
            >
              🥗 Foods
            </button>

            <button
                className={`sidebar-link ${currentPage === 'recipes' ? 'active' : ''}`}
                onClick={() => setCurrentPage('recipes')}
            >
              🍽️ Recipes
            </button>

            <button
                className={`sidebar-link ${currentPage === 'dailyJournal' ? 'active' : ''}`}
                onClick={() => setCurrentPage('dailyJournal')}
            >
              📘 Daily Journal
            </button>
          </nav>

          <div className="sidebar-footer">
            <div className="user-card">
              <div className="user-avatar">👤</div>
              <div>
                <strong>{username}</strong>
                <span>Logged in</span>
              </div>
            </div>

            <button className="logout-button" onClick={logout}>
              🔓 Logout
            </button>
          </div>
        </aside>

        <main className="main-content">
          {currentPage === 'dashboard' && <Dashboard />}
          {currentPage === 'foods' && <FoodPage />}
          {currentPage === 'recipes' && <RecipePage />}
          {currentPage === 'dailyJournal' && <DailyJournalPage />}
        </main>
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