# 🔧 Registration/Login Troubleshooting Guide

## ✅ Fixed Issues

### Issue #1: Register Parameter Order
**Problem:** Parameters passed in wrong order to backend
**Fixed:** Now sends `{ name, email, password }` in correct order

### Issue #2: Error Handling
**Improved:** Better error logging and messages
**Added:** Console logging for debugging

---

## 🧪 Testing Registration/Login

### Test 1: Register New User
1. Open app
2. Click "Register here"
3. Fill form:
   - Name: `Test User`
   - Email: `test@example.com`
   - Password: `password123`
   - Confirm: `password123`
4. Click "Create Account"
5. Check:
   - ✓ Success message?
   - ✓ Redirected to Dashboard?
   - ✓ Username shows in navbar?

### Test 2: Login
1. Logout (click button or clear localStorage manually)
2. Enter email & password from registration
3. Click "Login"
4. Check:
   - ✓ Success message?
   - ✓ Redirected to Dashboard?
   - ✓ Username shows in navbar?

### Test 3: Check DevTools
1. Open DevTools (F12)
2. Go to Console tab
3. Try register
4. Look for error messages (they'll be logged with `console.error`)
5. Check Network tab to see request/response

---

## 🚨 If Registration Still Fails

### Step 1: Check Backend
Make sure backend has `/api/auth/register` endpoint:

```bash
# Test with curl
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

Expected response:
```json
{
  "token": "eyJhbGc...",
  "user": {
    "id": 1,
    "name": "Test User",
    "email": "test@example.com"
  }
}
```

### Step 2: Check Console Errors
1. Open DevTools (F12)
2. Click Console tab
3. Try to register
4. Look for red error messages
5. Copy error and check what it says

### Step 3: Check Network
1. Open DevTools (F12)
2. Click Network tab
3. Try to register
4. Find the POST request to `/api/auth/register`
5. Check:
   - Response status (should be 200)
   - Response body (should have `token` and `user`)
   - Request body (should have `name`, `email`, `password`)

### Step 4: Verify Backend Response Format
Backend must return exactly:
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "name": "User Name",
    "email": "user@email.com"
  }
}
```

If it returns different field names, you need to update the frontend.

---

## 🔍 What the Code Does Now

### Registration Flow
```
User submits form
  ↓
Validates: All fields filled? ✓
Validates: Passwords match? ✓
Validates: Password length ≥ 6? ✓
  ↓
Sends POST to /api/auth/register:
{
  "name": "User Name",
  "email": "user@email.com",
  "password": "password123"
}
  ↓
Backend responds with:
{
  "token": "jwt_token",
  "user": { id, name, email }
}
  ↓
Frontend saves token to localStorage
Frontend saves user to localStorage
Frontend calls login(user, token)
Frontend shows success message
Frontend redirects to Dashboard
  ↓
✓ User authenticated!
```

### Login Flow
```
User submits form
  ↓
Validates: Email filled? ✓
Validates: Password filled? ✓
  ↓
Sends POST to /api/auth/login:
{
  "email": "user@email.com",
  "password": "password123"
}
  ↓
Backend responds with:
{
  "token": "jwt_token",
  "user": { id, name, email }
}
  ↓
Frontend saves token to localStorage
Frontend saves user to localStorage
Frontend calls login(user, token)
Frontend shows success message
Frontend redirects to Dashboard
  ↓
✓ User authenticated!
```

---

## 📋 Checklist

### Backend Setup
- [ ] SecurityConfig.java created
- [ ] /api/auth/register endpoint exists
- [ ] /api/auth/login endpoint exists
- [ ] Returns format: `{ token, user }`
- [ ] Token is valid JWT

### Frontend Setup
- [ ] authApi.js correct (parameters in right order)
- [ ] LoginPage.js correct (passing parameters correctly)
- [ ] AuthContext.js exists
- [ ] App.js wrapped with AuthProvider
- [ ] App.js checks isAuthenticated

### Testing
- [ ] Can register new user
- [ ] Can login with credentials
- [ ] Can logout
- [ ] Token saved to localStorage
- [ ] Token included in API requests
- [ ] User info shows in navbar

---

## 💡 Common Issues

### Issue: "Register failed"
**Check:**
1. Is backend running? `http://localhost:8080/api/auth/register`
2. Is endpoint returning correct format?
3. Are all fields sent? (name, email, password)

### Issue: "Login successful" but not redirected
**Check:**
1. Does backend return `{ token, user }`?
2. Is `user` object in response?
3. Check DevTools Console for errors

### Issue: Can't access pages after login
**Check:**
1. Is token saved to localStorage?
2. Is AuthContext initialized correctly?
3. Is App.js wrapped with AuthProvider?

### Issue: Keeps redirecting to login
**Check:**
1. Is token valid (not expired)?
2. Is SecurityConfig protecting endpoints?
3. Are endpoints requiring Authorization header?

---

## 🔗 File References

### Key Files
- `frontend/src/api/authApi.js` - API calls
- `frontend/src/pages/LoginPage.js` - Login/Register forms
- `frontend/src/context/AuthContext.js` - Auth state
- `frontend/src/App.js` - App entry point with auth check

### Backend Files
- `SecurityConfig.java` - JWT configuration
- `/api/auth/register` endpoint
- `/api/auth/login` endpoint

---

## 🚀 Next Steps

1. **Test backend endpoints** with curl or Postman
2. **Check DevTools Console** for error messages
3. **Check Network tab** to verify requests/responses
4. **Verify data format** matches what backend expects
5. **Run app** and test registration/login flow

---

## 📞 Debug Tips

### Enable Detailed Logging
DevTools will now show:
```
console.error('Register error:', error)
console.error('Login error:', error)
```

### Common Backend Issues
- ❌ No SecurityConfig
- ❌ No auth endpoints
- ❌ Wrong response format
- ❌ Token generation failing
- ❌ CORS blocking request

### Common Frontend Issues
- ❌ Parameters in wrong order
- ❌ AuthContext not wrapping app
- ❌ Wrong localStorage key names
- ❌ Token not being sent in requests

---

**Status:** Fixes Applied ✅  
**Next:** Test registration and login with the fixed code

If still having issues, check:
1. Console errors (F12 → Console)
2. Network requests (F12 → Network)
3. Backend responses
4. Backend logs

