import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideServerRoutesConfig } from '@angular/ssr';
import { provideRouter } from '@angular/router';
import { appConfig } from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideRouter([]) // 💡 HACK: Provide empty routes to bypass route extraction crash
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
