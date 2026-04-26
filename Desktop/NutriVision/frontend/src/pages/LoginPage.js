import React, { useState } from 'react';
import { authService } from '../api/authApi';
import { useAuth } from '../context/AuthContext';
import Alert from '../components/Alert';
import '../styles/AuthPages.css';

function LoginPage({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const { login } = useAuth();

  // Login state
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setAlert({ type: 'error', message: 'Please enter email and password' });
      return;
    }

    try {
      setLoading(true);
      const response = await authService.login(email, password);
      const { token, user } = response.data;

      login(user, token);
      setAlert({ type: 'success', message: 'Login successful!' });

      // Don't need callback - App.js will handle redirect via isAuthenticated
    } catch (error) {
      console.error('Login error:', error);

      let errorMessage = 'Login failed. Please try again.';

      // More explicit error messages based on status code
      if (error.response?.status === 401 || error.response?.status === 403) {
        errorMessage = '❌ Invalid email or password. Please check your credentials and try again.';
      } else if (error.response?.status === 404) {
        errorMessage = '❌ Account not found. Please register first or check your email address.';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message === 'Network Error') {
        errorMessage = '❌ Network error. Please check if the server is running on port 8080.';
      }

      setAlert({
        type: 'error',
        message: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (
      !registerData.name ||
      !registerData.email ||
      !registerData.password ||
      !registerData.confirmPassword
    ) {
      setAlert({ type: 'error', message: 'Please fill in all fields' });
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      setAlert({ type: 'error', message: 'Passwords do not match' });
      return;
    }

    if (registerData.password.length < 6) {
      setAlert({ type: 'error', message: 'Password must be at least 6 characters' });
      return;
    }

    try {
      setLoading(true);
      const response = await authService.register(
        registerData.name,
        registerData.email,
        registerData.password
      );
      const { token, user } = response.data;

      login(user, token);
      setAlert({ type: 'success', message: 'Registration successful!' });

      // Don't need callback - App.js will handle redirect via isAuthenticated
    } catch (error) {
      console.error('Register error:', error);

      let errorMessage = 'Registration failed. Please try again.';

      // More explicit error messages based on response
      if (error.response?.status === 400) {
        if (error.response.data?.message?.includes('email')) {
          errorMessage = '❌ This email is already registered. Please login or use a different email.';
        } else if (error.response.data?.message?.includes('password')) {
          errorMessage = '❌ Password must be at least 6 characters long.';
        } else {
          errorMessage = '❌ ' + (error.response.data?.message || 'Invalid input. Please check your data.');
        }
      } else if (error.response?.status === 409) {
        errorMessage = '❌ Email already exists. Please use a different email or login instead.';
      } else if (error.message === 'Network Error') {
        errorMessage = '❌ Network error. Please check if the server is running on port 8080.';
      } else if (error.response?.data?.message) {
        errorMessage = '❌ ' + error.response.data.message;
      }

      setAlert({
        type: 'error',
        message: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  if (showRegister) {
    return (
      <div className="auth-container">
        <div className="auth-box">
          <h1 className="auth-title">🥗 Create Account</h1>
          <p className="auth-subtitle">Join NutriVision</p>

          {alert && (
            <Alert
              type={alert.type}
              message={alert.message}
              onClose={() => setAlert(null)}
            />
          )}

          <form onSubmit={handleRegister} className="auth-form">
            <div className="form-field">
              <label>Full Name *</label>
              <input
                type="text"
                value={registerData.name}
                onChange={(e) =>
                  setRegisterData((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="John Doe"
                required
              />
            </div>

            <div className="form-field">
              <label>Email *</label>
              <input
                type="email"
                value={registerData.email}
                onChange={(e) =>
                  setRegisterData((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="form-field">
              <label>Password *</label>
              <input
                type="password"
                value={registerData.password}
                onChange={(e) =>
                  setRegisterData((prev) => ({ ...prev, password: e.target.value }))
                }
                placeholder="At least 6 characters"
                required
              />
            </div>

            <div className="form-field">
              <label>Confirm Password *</label>
              <input
                type="password"
                value={registerData.confirmPassword}
                onChange={(e) =>
                  setRegisterData((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }))
                }
                placeholder="Confirm your password"
                required
              />
            </div>

            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? '⏳ Creating Account...' : '✨ Create Account'}
            </button>
          </form>

          <div className="auth-footer">
            <p>Already have an account?</p>
            <button
              className="auth-link-button"
              onClick={() => {
                setShowRegister(false);
                setRegisterData({ name: '', email: '', password: '', confirmPassword: '' });
                setAlert(null);
              }}
            >
              Log in here
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="auth-title">🥗 NutriVision</h1>
        <p className="auth-subtitle">Login to your account</p>

        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}

        <form onSubmit={handleLogin} className="auth-form">
          <div className="form-field">
            <label>Email *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="form-field">
            <label>Password *</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              required
            />
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? '⏳ Logging in...' : '🔓 Login'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Don't have an account?</p>
          <button className="auth-link-button" onClick={() => setShowRegister(true)}>
            Register here
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;








