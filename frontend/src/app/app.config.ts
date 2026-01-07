import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { APOLLO_OPTIONS, Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { environment } from '../environments/environment.development';
import { routes } from './app.routes';
import { DynamicDateAdapter } from './dynamic-date-adapter';
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

import { onError } from '@apollo/client/link/error';

// Apollo GraphQL configuration
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  // Error handling link
  const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path, extensions }) => {
        console.group(`[GraphQL error]: Message: ${message}, Path: ${path}`);
        console.log('Extensions:', extensions);
        console.log('Locations:', locations);
        console.log('Operation:', operation);
        console.groupEnd();
      });
    }
    if (networkError) {
      console.group(`[Network error]: ${networkError.name}`);
      console.log('Message:', networkError.message);
      console.log('Detail:', networkError);
      console.groupEnd();
    }
  });

  // Auth link to add token to every request
  const authLink = setContext((_, { headers }) => {
    // Get token from localStorage
    let token = null;
    if (typeof window !== 'undefined' && window.localStorage) {
      const tokenStr = localStorage.getItem('token');
      if (tokenStr) {
        try {
          token = JSON.parse(tokenStr);
        } catch (e) {
          token = tokenStr; // fallback if not JSON
        }
      }
    }
    
    // Return headers with token
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
    link: errorLink.concat(authLink).concat(link),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'network-only'
      },
      query: {
        fetchPolicy: 'network-only'
      }
    }
  };
}
export const appConfig: ApplicationConfig = {
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig },
    { provide: MAT_DATE_LOCALE, useValue: 'vi-VN' }, // Ngôn ngữ tiếng Việt
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
    provideClientHydration(withEventReplay()),
    provideNativeDateAdapter(),
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor])
    ), 
    provideAnimationsAsync(),
    { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig }, 
    provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          })
  ]
};
