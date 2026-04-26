# 🔐 NutriVision Authentication - Frontend Integration (v1.1.0)

## 🎯 What's New

Authentication system integrated with frontend:

### Features
✅ User Registration
✅ User Login
✅ JWT Token Management
✅ Protected Routes
✅ Auto Token in Requests
✅ Token Expiration Handling
✅ User Session Management
✅ Logout Functionality

---

## 🚀 User Flow

### New User
```
1. Open app
2. See Login page
3. Click "Register here"
4. Enter: Name, Email, Password
5. Submit registration
6. Auto-logged in ✓
7. Access all pages
```

### Existing User
```
1. Open app
2. See Login page
3. Enter: Email, Password
4. Click "Login"
5. Token saved locally
6. Access all pages ✓
```

### Logout
```
1. Click "🔓 Logout" button (top right)
2. Token cleared
3. Redirected to login
```

---

## 📁 New Files Created

### API Integration
- `frontend/src/api/authApi.js`
  - Auth endpoints (login, register)
  - Token/user management
  - localStorage helpers

### Context & State
- `frontend/src/context/AuthContext.js`
  - Authentication state management
  - User and token storage
  - Login/logout functions
  - useAuth hook

### Pages
- `frontend/src/pages/LoginPage.js`
  - Login form
  - Register form (toggle)
  - Form validation
  - Error handling

### Styling
- `frontend/src/styles/AuthPages.css`
  - Auth page styling
  - Beautiful login/register UI
  - Responsive design

---

## 🔧 Modified Files

### `frontend/src/api/api.js`
```javascript
// NOW ADDS JWT TOKEN AUTOMATICALLY:
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// HANDLES TOKEN EXPIRATION:
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('jwtToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

### `frontend/src/App.js`
```javascript
// WRAPPED WITH AuthProvider
// CHECKS isAuthenticated
// SHOWS LoginPage if not authenticated
// SHOWS MainApp with navbar + user info if authenticated
// ADDED logout button in navbar
```

---

## 🎨 UI Changes

### Before (v1.0.2)
```
App opens directly to Dashboard
No authentication
No user info shown
```

### After (v1.1.0)
```
App opens to Login page
User must login/register
Navbar shows: User name + Logout button
Cannot access pages without login
```

---

## 📋 Login Page Features

### Login Form
- Email input
- Password input
- "Login" button
- "Register here" link
- Error handling
- Loading state

### Register Form
- Name input
- Email input
- Password input
- Confirm Password input
- "Create Account" button
- "Log in here" link
- Password validation
- Error handling
- Loading state

### Validation
✅ Email format
✅ Password length (min 6 chars)
✅ Passwords match
✅ All fields required

---

## 🔐 Security Features

✅ **JWT Token Storage**
- Stored in localStorage
- Included in all API requests
- Cleared on logout
- Cleared on token expiration

✅ **Token Management**
- Auto-added to request headers
- Auto-cleared on 401 response
- Auto-redirect on expiration

✅ **Protected Routes**
- Cannot access pages without login
- Redirects to login if token expires
- User data in context

✅ **Session Persistence**
- Token saved to localStorage
- Restored on page refresh
- Automatic re-authentication

---

## 🎯 How It Works

### 1. User Registration
```
User fills form → POST /api/auth/register
  ↓
Backend creates user + generates JWT
  ↓
Frontend receives { token, user }
  ↓
Saves to localStorage
  ↓
Sets AuthContext
  ↓
Redirects to Dashboard
```

### 2. User Login
```
User fills form → POST /api/auth/login
  ↓
Backend verifies + generates JWT
  ↓
Frontend receives { token, user }
  ↓
Saves to localStorage
  ↓
Sets AuthContext
  ↓
Redirects to Dashboard
```

### 3. Authenticated Request
```
Frontend calls API endpoint
  ↓
axios interceptor checks token
  ↓
Adds "Authorization: Bearer [token]"
  ↓
Backend receives with token
  ↓
Validates with SecurityConfig
  ↓
Returns data
  ↓
Frontend displays
```

### 4. Token Expiration
```
Frontend makes API request
  ↓
Backend returns 401 (unauthorized)
  ↓
axios interceptor catches
  ↓
Clears localStorage
  ↓
Redirects to /login
  ↓
User sees login page
```

### 5. User Logout
```
User clicks "🔓 Logout"
  ↓
logout() function called
  ↓
localStorage cleared
  ↓
AuthContext cleared
  ↓
Page redirected to login
  ↓
User sees login page
```

---

## 📝 Code Example

### Using useAuth Hook
```javascript
import { useAuth } from '../context/AuthContext';

function MyComponent() {
  const { user, token, isAuthenticated, logout } = useAuth();

  return (
    <div>
      <p>Hello, {user?.name}</p>
      <p>Authenticated: {isAuthenticated ? 'Yes' : 'No'}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Making API Calls
```javascript
// Token automatically added!
const response = await foodAPI.getAll();
// Request includes: Authorization: Bearer [token]
```

---

## 🎭 AuthContext Structure

```javascript
{
  user: {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    ...
  },
  token: 'eyJhbGciOiJIUzI1NiIs...',
  loading: false,
  isAuthenticated: true,
  login: (user, token) => { ... },
  logout: () => { ... }
}
```

---

## 💾 LocalStorage Data

### Stored Items
```
localStorage = {
  'jwtToken': 'eyJhbGciOiJIUzI1NiIs...',
  'user': '{"id":1,"name":"John","email":"john@example.com"}'
}
```

### Cleared On
- Logout button clicked
- Token expires (401 error)
- Manual browser cleanup

---

## 🧪 Testing

### Test 1: Register New User
1. Open app
2. Click "Register here"
3. Fill form with:
   - Name: Test User
   - Email: test@example.com
   - Password: password123
4. Click "Create Account"
5. ✓ Should see Dashboard
6. ✓ Should show name in top right

### Test 2: Login
1. Logout (clear localStorage manually if needed)
2. Open app
3. Enter email & password
4. Click "Login"
5. ✓ Should see Dashboard
6. ✓ Should show name in top right

### Test 3: Logout
1. Click "🔓 Logout" button
2. ✓ Should see Login page
3. ✓ localStorage should be cleared
4. ✓ Cannot access pages

### Test 4: Page Refresh
1. Login successfully
2. Refresh page
3. ✓ Should NOT redirect to login
4. ✓ Should still be on same page
5. ✓ Should still be authenticated

### Test 5: Token in Requests
1. Login
2. Open DevTools
3. Go to Network tab
4. Create a food
5. Find the POST request
6. ✓ Should see Authorization header with Bearer token

---

## 📚 File Structure

```
frontend/src/
├── api/
│   ├── api.js (UPDATED with interceptors)
│   └── authApi.js (NEW)
├── context/
│   └── AuthContext.js (NEW)
├── pages/
│   ├── LoginPage.js (NEW)
│   ├── Dashboard.js
│   ├── FoodPage.js
│   └── RecipePage.js
├── styles/
│   ├── AuthPages.css (NEW)
│   └── (other styles)
├── components/
│   └── ...
├── App.js (UPDATED)
├── App.css (UPDATED)
└── index.js
```

---

## 🚀 Usage

### For Users
1. First time: Register
2. Later times: Login
3. Use app normally
4. Click logout when done

### For Developers
```javascript
// Access user
const { user } = useAuth();
console.log(user.name);

// Check authentication
const { isAuthenticated } = useAuth();
if (isAuthenticated) { ... }

// Logout programmatically
const { logout } = useAuth();
logout();

// Access token
const { token } = useAuth();
// Token automatically added to all API calls
```

---

## 🔄 Version Update

- **v1.0.2**: Final Weight Logic (read-only)
- **v1.1.0**: ✨ Authentication System (current)

---

## 📊 Integration Timeline

1. ✅ AuthContext created
2. ✅ Login/Register pages created
3. ✅ JWT token interceptors added
4. ✅ Token storage implemented
5. ✅ Route protection added
6. ✅ Logout functionality added
7. ✅ Error handling implemented

---

## ⚠️ Important Notes

### LocalStorage
- JWT token stored in localStorage
- Cleared on logout or token expiration
- Restored on page refresh

### CORS
- Frontend on localhost:3000
- Backend on localhost:8080
- CORS should be configured

### Backend Endpoints
```
POST /api/auth/login
  Request: { email, password }
  Response: { token, user }

POST /api/auth/register
  Request: { email, password, name }
  Response: { token, user }
```

### Token Format
- JWT Bearer token
- Included in Authorization header
- Format: `Bearer [token]`

---

## 🎉 Complete!

Authentication is now fully integrated:
- ✅ Users can register
- ✅ Users can login
- ✅ Users can logout
- ✅ Token auto-managed
- ✅ Protected routes
- ✅ Session persistence
- ✅ Error handling

---

**Version:** 1.1.0  
**Date:** April 19, 2026  
**Status:** ✅ Production Ready

🥗✨ **Ready to use!**

