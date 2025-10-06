# Authentication Implementation Guide

## 📋 Overview

Sistem authentication telah diimplementasikan dengan fitur:
- ✅ **Protected Routes**: Route `/dashboard-admin` hanya bisa diakses setelah login
- ✅ **Middleware Next.js**: Validasi token di server-side
- ✅ **Auth Context**: State management untuk user authentication
- ✅ **API Interceptors**: Automatic token injection & error handling
- ✅ **Cookie + localStorage**: Dual storage untuk server & client side

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      User Flow                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. User mengakses /dashboard-admin                        │
│     ↓                                                       │
│  2. Middleware check token di cookies                      │
│     ↓                                                       │
│  3. Jika tidak ada token → redirect ke /login              │
│     ↓                                                       │
│  4. User login → token disimpan ke cookies + localStorage  │
│     ↓                                                       │
│  5. Redirect ke /dashboard-admin                           │
│     ↓                                                       │
│  6. API calls otomatis include Bearer token                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 📁 File Structure

```
src/
├── middleware.ts                          # Route protection
├── lib/
│   ├── api-client.ts                     # Axios config + interceptors
│   └── auth-helpers.ts                   # Auth utility functions
├── context/
│   └── AuthContext.tsx                   # Auth state management
└── app/
    ├── login/
    │   ├── page.tsx                      # Login page
    │   ├── hooks/
    │   │   └── useLogin.tsx              # Login logic
    │   └── service/
    │       ├── validation.ts             # Form validation
    │       └── auth-service.ts           # API service
    └── dashboard-admin/
        └── ...                           # Protected pages
```

## 🔧 Implementation Details

### 1. Middleware (`src/middleware.ts`)

Middleware ini berjalan di **server-side** sebelum request mencapai page:

```typescript
// Protected routes
if (pathname.startsWith("/dashboard-admin") && !token) {
  // Redirect to login
}

// Prevent logged-in users from accessing login page
if (pathname.startsWith("/login") && token) {
  // Redirect to dashboard
}
```

**Kenapa pakai cookies?**
- Middleware Next.js berjalan di server-side
- `localStorage` hanya tersedia di client-side
- Cookies bisa diakses dari server & client

### 2. Auth Helpers (`src/lib/auth-helpers.ts`)

Utility functions untuk mengelola auth data:

```typescript
setAuthData(token, user)    // Save to localStorage + cookies
clearAuthData()             // Clear from localStorage + cookies
getAuthToken()              // Get token from localStorage
getAuthUser()               // Get user from localStorage
isAuthenticated()           // Check if user is logged in
```

### 3. API Client (`src/lib/api-client.ts`)

Axios instance dengan interceptors:

**Request Interceptor:**
- Automatically add `Authorization: Bearer <token>` header

**Response Interceptor:**
- Handle 401 (Unauthorized) → clear auth + redirect to login
- Handle 403, 404, 422, 429, 500 dengan toast notification

### 4. Auth Context (`src/context/AuthContext.tsx`)

React Context untuk state management:

```typescript
const { user, login, logout, isAuthenticated, isLoading } = useAuth();
```

## 🚀 Usage

### Login Flow

```typescript
// src/app/login/hooks/useLogin.tsx

// 1. Import auth service (saat API sudah ready)
import { loginService } from '../service/auth-service';

// 2. Di onSubmit function
const response = await loginService({
  email: data.email,
  password: data.password
});

// 3. Save auth data
login(response.data.user, response.data.token);

// 4. Redirect
router.push('/dashboard-admin');
```

### Logout Flow

```typescript
import { useAuth } from '@/context/AuthContext';

const { logout } = useAuth();

// Call logout (will clear auth + redirect to login)
logout();
```

### Making API Calls

```typescript
import apiClient from '@/lib/api-client';

// Token akan otomatis ditambahkan ke header
const response = await apiClient.get('/api/data');
```

### Check Authentication

```typescript
import { useAuth } from '@/context/AuthContext';

const { isAuthenticated, user } = useAuth();

if (isAuthenticated) {
  console.log('User:', user);
}
```

## 🔌 Integrasi dengan Backend API

### Step 1: Update API Base URL

```env
# .env.local
NEXT_PUBLIC_API_BASE_URL=https://your-api-url.com/api
```

### Step 2: Sesuaikan Auth Service

Edit `src/app/login/service/auth-service.ts`:

```typescript
export const loginService = async (credentials: LoginRequest) => {
  const response = await apiClient.post<LoginResponse>(
    "/auth/login",  // ← Sesuaikan endpoint
    credentials
  );

  return response.data;
};
```

### Step 3: Update Response Type

Sesuaikan interface `LoginResponse` dengan struktur response dari backend:

```typescript
export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: number;
      name: string;
      email: string;
      role: string;
      // tambahkan field sesuai backend
    };
    token: string;
  };
}
```

### Step 4: Replace Mock Login

Di `src/app/login/hooks/useLogin.tsx`, uncomment bagian API real dan hapus mock code:

```typescript
// Remove mock implementation
// const mockUser = { ... }

// Use real API
import { loginService } from '../service/auth-service';

const response = await loginService({
  email: data.email,
  password: data.password
});

login(response.data.user, response.data.token);
```

## 🛡️ Security Features

1. **Automatic Token Expiry**: Cookies expire dalam 7 hari (bisa disesuaikan)
2. **Token Validation**: Middleware check token sebelum akses protected route
3. **Auto Redirect**: 401 response otomatis redirect ke login
4. **Secure Cookies**: `SameSite=Strict` untuk prevent CSRF

## 🧪 Testing

### Test Protected Route
1. Buka browser (logout dulu jika sudah login)
2. Akses `http://localhost:3000/dashboard-admin`
3. Expected: Redirect ke `/login?callbackUrl=/dashboard-admin`

### Test Login
1. Akses `http://localhost:3000/login`
2. Login dengan email/password apapun (mock mode)
3. Expected: Redirect ke `/dashboard-admin`

### Test Logout
1. Setelah login, call `logout()` function
2. Expected: Redirect ke `/login`

### Test Auto Redirect
1. Setelah login, coba akses `/login` lagi
2. Expected: Auto redirect ke `/dashboard-admin`

## 🔍 Debugging

### Check Token
```typescript
// Di browser console
localStorage.getItem('token')
document.cookie
```

### Check Middleware
Middleware akan log ke console:
```
🔐 Middleware: Unauthorized access to protected route
✅ Middleware: User already authenticated, redirecting to dashboard
```

### Check API Interceptor
API interceptor akan log errors:
```
❌ API Error: ...
🔐 Unauthorized access - clearing auth data
```

## 📝 Notes

- **Mock Mode**: Saat ini masih menggunakan mock login (tidak hit API real)
- **Token Storage**: Token disimpan di cookies (7 hari expiry) + localStorage
- **SSR Compatible**: Menggunakan cookies agar bisa diakses dari server-side
- **Type Safe**: Semua function menggunakan TypeScript dengan proper typing

## 🚨 Common Issues

### Issue: Middleware tidak redirect
**Solution**: Pastikan cookies tersimpan dengan benar
```typescript
// Check di browser console
document.cookie
```

### Issue: 401 error terus menerus
**Solution**: Clear cookies + localStorage
```typescript
localStorage.clear();
document.cookie.split(";").forEach(c => {
  document.cookie = c.replace(/^ +/, "").replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
});
```

### Issue: Token tidak ter-inject ke API call
**Solution**: Pastikan menggunakan `apiClient` dari `@/lib/api-client`, bukan axios langsung

## 📞 Support

Jika ada pertanyaan atau issue, silakan:
1. Check file ini untuk troubleshooting
2. Check console browser untuk error messages
3. Check Network tab untuk API calls
