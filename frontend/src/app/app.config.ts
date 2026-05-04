import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter, withRouterConfig } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from '../environments/environment.development';
import { provideServiceWorker } from '@angular/service-worker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { DynamicDateAdapter } from './dynamic-date-adapter';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { Apollo } from 'apollo-angular';
import { setContext } from '@apollo/client/link/context';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';
import { authInterceptor } from './shared/interceptors/auth.interceptor';

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

// Apollo GraphQL configuration
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  const authLink = setContext((_, { headers }) => {
    let token = null;
    if (typeof window !== 'undefined' && window.localStorage) {
      const tokenStr = localStorage.getItem('token');
      if (tokenStr) {
        try {
          token = JSON.parse(tokenStr);
        } catch (e) {
          token = tokenStr;
        }
      }
    }
    
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      }
    };
  });

  const link = httpLink.create({
    uri: `${environment.APIURL}/graphql`,
  });

  return {
    link: authLink.concat(link),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: { fetchPolicy: 'network-only' },
      query: { fetchPolicy: 'network-only' }
    }
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig },
    { provide: MAT_DATE_LOCALE, useValue: 'vi-VN' },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: DateAdapter, useClass: DynamicDateAdapter },
    Apollo,
    HttpLink,
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(),
    provideNativeDateAdapter(),
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor])
    ), 
    provideAnimationsAsync(),
    provideServiceWorker('ngsw-worker.js', {
      enabled: false, // Keep disabled for now to ensure stable SSR
      registrationStrategy: 'registerWhenStable:30000'
    })
  ]
};
