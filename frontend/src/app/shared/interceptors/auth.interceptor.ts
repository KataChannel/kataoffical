import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageService } from '../utils/storage.service';

/**
 * HTTP Interceptor to automatically add JWT token to requests
 * 
 * Usage: Add to app.config.ts providers:
 * provideHttpClient(withInterceptors([authInterceptor]))
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(StorageService);
  
  // Get token from storage (using 'token' key to match login.component.ts)
  const token = storageService.getItem('token');
  
  // If token exists, clone request and add Authorization header
  if (token) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedReq);
  }
  
  // If no token, proceed with original request
  return next(req);
};
