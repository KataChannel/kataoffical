import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter, withRouterConfig } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from '../environments/environment.development';
import { provideServiceWorker } from '@angular/service-worker';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { HeaderStripperInterceptor } from './header-stripper.interceptor';
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
export const appConfig: ApplicationConfig = {
  providers: [
    provideNativeDateAdapter(),
    { provide: HTTP_INTERCEPTORS, useClass: HeaderStripperInterceptor, multi: true },
    { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig },
    { provide: MAT_DATE_LOCALE, useValue: 'vi-VN' }, // Ngôn ngữ tiếng Việt
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()), provideAnimationsAsync(),
    { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig }, 
    provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          })
  ]
};
