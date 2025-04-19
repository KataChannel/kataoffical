// header-stripper.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class HeaderStripperInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          // You can't directly modify headers in HttpResponse, but you can log or handle logic here
          if (event.headers.has('reload')) {
            console.log('Reload header detected, consider server-side fix or proxy');
          }
        }
      })
    );
  }
}