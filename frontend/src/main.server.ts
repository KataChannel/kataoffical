import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

/**
 * 🛑 SSR SHIMS for Production Build
 * These catch any early global access during module imports.
 */
if (typeof global !== 'undefined') {
  (global as any).window = global;
  (global as any).document = {
    documentElement: { style: {} },
    body: { style: {} },
    createElement: () => ({ style: {}, getContext: () => ({}) }),
    getElementById: () => null,
    querySelector: () => null,
    querySelectorAll: () => [],
    addEventListener: () => {},
    removeEventListener: () => {},
  };
  (global as any).localStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {},
    key: () => null,
    length: 0
  };
  (global as any).navigator = {
    userAgent: 'node',
    platform: 'node',
    languages: ['en']
  };
  (global as any).location = {
    href: '',
    protocol: 'http:',
    host: 'localhost',
    hostname: 'localhost',
    pathname: '/',
    search: '',
    hash: '',
    reload: () => {}
  };
  (global as any).history = {
    pushState: () => {},
    replaceState: () => {},
    back: () => {},
    forward: () => {},
    go: () => {},
    length: 0,
    state: null
  };
}

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
