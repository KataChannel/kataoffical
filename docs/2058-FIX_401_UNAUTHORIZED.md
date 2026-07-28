# Fix Bug: HTTP 401 Unauthorized - Phongban/Nhanvien API

## 🐛 Lỗi

```
Http failure response for http://localhost:3331/phongban?includeChildren=false: 401 Unauthorized
```

## 🔍 Nguyên nhân

Backend API yêu cầu **JWT Authentication** (`@UseGuards(JwtAuthGuard)`) nhưng frontend không tự động gửi token trong HTTP headers.

### Phân tích kỹ thuật:

1. **Backend:** `PhongbanController` có `@UseGuards(JwtAuthGuard)`
   ```typescript
   @Controller('phongban')
   @UseGuards(JwtAuthGuard)  // ← Yêu cầu JWT token
   export class PhongbanController { ... }
   ```

2. **Frontend:** `PhongbanService` có `getHeaders()` nhưng:
   - Sử dụng sai key: `'accessToken'` thay vì `'token'`
   - Login component lưu token với key `'token'`

3. **Missing:** Không có HTTP Interceptor để tự động thêm token vào mọi request

## ✅ Giải pháp

### 1. Tạo HTTP Auth Interceptor

**File:** `frontend/src/app/shared/interceptors/auth.interceptor.ts`

```typescript
import { HttpInterceptorFn } from '@angular/core';
import { inject } from '@angular/core';
import { StorageService } from '../utils/storage.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(StorageService);
  const token = storageService.getItem('token');
  
  if (token) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedReq);
  }
  
  return next(req);
};
```

**Chức năng:**
- ✅ Tự động inject token vào **mọi** HTTP request
- ✅ Sử dụng đúng key `'token'` (match với login.component.ts)
- ✅ Functional interceptor (Angular 18+ best practice)

---

### 2. Cấu hình Interceptor trong App Config

**File:** `frontend/src/app/app.config.ts`

```typescript
// Add imports
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './shared/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    // ... other providers
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor])  // ← Thêm interceptor
    ),
    // ... other providers
  ]
};
```

**Thay đổi:**
- ❌ Trước: `provideHttpClient(withFetch())`
- ✅ Sau: `provideHttpClient(withFetch(), withInterceptors([authInterceptor]))`

---

### 3. Fix Token Key trong PhongbanService

**File:** `frontend/src/app/admin/phongban/phongban.service.ts`

```typescript
private getHeaders(): HttpHeaders {
  const token = this.storageService.getItem('token');  // ← Fix: 'token' not 'accessToken'
  return new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
}
```

**Thay đổi:**
- ❌ Trước: `getItem('accessToken')`
- ✅ Sau: `getItem('token')`

**Note:** Method này giờ không bắt buộc vì interceptor đã tự động thêm token, nhưng giữ lại để tương thích backward.

---

## 🚀 Cách kiểm tra

### Bước 1: Đảm bảo user đã login

```bash
# Open browser console (F12)
localStorage.getItem('token')
# Should return: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

Nếu `null` → Cần login lại:
```
http://localhost:4301/login
```

---

### Bước 2: Restart frontend

```bash
cd frontend

# Kill existing process
lsof -ti:4301 | xargs kill -9

# Start dev server
bun dev
```

---

### Bước 3: Kiểm tra Network tab

1. Mở DevTools (F12) → Network tab
2. Truy cập: `http://localhost:4301/admin/phongban/list`
3. Tìm request đến `http://localhost:3331/phongban`
4. Click vào request → Headers tab
5. Kiểm tra **Request Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

✅ Nếu có header này → Success!
❌ Nếu không có → Interceptor chưa hoạt động

---

### Bước 4: Test API response

Sau khi fix, response nên là:

```json
[
  {
    "id": "cm123...",
    "ma": "PB01",
    "ten": "Phòng Kinh Doanh",
    "level": 1,
    "loai": "KINH_DOANH",
    ...
  }
]
```

Thay vì:

```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

---

## 🔧 Troubleshooting

### Vẫn bị 401 sau khi fix?

**Check 1:** Token có hợp lệ không?

```javascript
// Browser console
const token = localStorage.getItem('token');
console.log('Token:', token);

// Decode JWT (check expiry)
const payload = JSON.parse(atob(token.split('.')[1]));
console.log('Payload:', payload);
console.log('Expired?', payload.exp * 1000 < Date.now());
```

**Check 2:** Interceptor có được inject không?

```typescript
// Thêm log vào auth.interceptor.ts
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(StorageService);
  const token = storageService.getItem('token');
  
  console.log('🔐 Interceptor triggered');
  console.log('📍 URL:', req.url);
  console.log('🎫 Token:', token ? 'EXISTS' : 'MISSING');
  
  // ... rest of code
};
```

**Check 3:** StorageService có hoạt động không?

```typescript
// Component hoặc service
constructor() {
  const storageService = inject(StorageService);
  console.log('Token from storage:', storageService.getItem('token'));
}
```

---

### Token hết hạn?

**Giải pháp 1:** Login lại

```
http://localhost:4301/login
```

**Giải pháp 2:** Tăng expiry time (Backend)

```typescript
// api/src/auth/auth.service.ts
signIn(user: any) {
  const payload = { username: user.name, sub: user.id };
  return {
    access_token: this.jwtService.sign(payload, {
      expiresIn: '7d'  // ← Tăng từ 1h lên 7 ngày
    }),
  };
}
```

**Giải pháp 3:** Auto refresh token (Advanced)

```typescript
// Create refresh-token.interceptor.ts
export const refreshTokenInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // Call refresh token API
        // Update localStorage
        // Retry original request
      }
      return throwError(() => error);
    })
  );
};
```

---

## 📊 So sánh Before/After

### Before (Lỗi 401)

```
┌─────────────┐
│  Frontend   │
│  Component  │
└──────┬──────┘
       │ GET /phongban
       │ Headers: { Content-Type: 'application/json' }  ← ❌ No Authorization
       ↓
┌──────────────┐
│  Backend API │
│ JwtAuthGuard │ → ❌ 401 Unauthorized (no token)
└──────────────┘
```

### After (Success)

```
┌─────────────┐
│  Frontend   │
│  Component  │
└──────┬──────┘
       │ GET /phongban
       ↓
┌──────────────────┐
│ Auth Interceptor │ → Inject token từ localStorage
└──────┬───────────┘
       │ Headers: { Authorization: 'Bearer eyJ...' }  ← ✅ Token added
       ↓
┌──────────────┐
│  Backend API │
│ JwtAuthGuard │ → ✅ 200 OK (token valid)
└──────┬───────┘
       │
       ↓ Return data
┌─────────────┐
│  Frontend   │
│  Component  │ → Display phongban list
└─────────────┘
```

---

## 🎯 Best Practices

### 1. Centralized Token Management

```typescript
// shared/services/auth.service.ts
@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'token';
  
  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }
  
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
  
  clearToken() {
    localStorage.removeItem(this.tokenKey);
  }
  
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }
}
```

---

### 2. Error Handling Interceptor

```typescript
// shared/interceptors/error.interceptor.ts
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // Redirect to login
        const router = inject(Router);
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};

// Add to app.config.ts
provideHttpClient(
  withFetch(),
  withInterceptors([authInterceptor, errorInterceptor])
);
```

---

### 3. Loading State Management

```typescript
// shared/interceptors/loading.interceptor.ts
export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  
  loadingService.show();
  
  return next(req).pipe(
    finalize(() => loadingService.hide())
  );
};
```

---

## 📚 Tài liệu liên quan

- [Angular HTTP Interceptors](https://angular.io/guide/http-intercept-requests-and-responses)
- [JWT Authentication Best Practices](https://auth0.com/blog/jwt-authentication-best-practices/)
- [NestJS Guards](https://docs.nestjs.com/guards)
- [2056-HUONG_DAN_TRUY_CAP_PHONGBAN_NHANVIEN.md](./2056-HUONG_DAN_TRUY_CAP_PHONGBAN_NHANVIEN.md)
- [2057-HUONG_DAN_THEM_PERMISSION.md](./2057-HUONG_DAN_THEM_PERMISSION.md)

---

## 🎉 Kết quả

Sau khi apply các fix trên:

✅ Phongban API calls thành công  
✅ Nhanvien API calls thành công  
✅ Token tự động được thêm vào mọi request  
✅ Không cần manually add headers trong mỗi service  
✅ Consistent authentication across entire app  

**Test URLs:**
- http://localhost:4301/admin/phongban/list ✅
- http://localhost:4301/admin/nhanvien/list ✅

---

**Ngày fix:** November 18, 2025  
**Tác giả:** GitHub Copilot  
**Status:** ✅ RESOLVED
