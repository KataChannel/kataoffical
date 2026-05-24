import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

/**
 * 🛑 SSR SHIMS for Production Build
 * These catch any early global access during module imports.
 */
if (typeof global !== 'undefined') {
  const windowMock: any = {
    document: {
      documentElement: { style: {} },
      body: { style: {} },
      createElement: () => ({ 
        style: {}, 
        getContext: () => ({}),
        setAttribute: () => {},
        appendChild: () => {},
        classList: { add: () => {}, remove: () => {} }
      }),
      getElementById: () => null,
      querySelector: () => null,
      querySelectorAll: () => [],
      addEventListener: () => {},
      removeEventListener: () => {},
    },
    localStorage: {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
      clear: () => {},
      key: () => null,
      length: 0
    },
    sessionStorage: {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
      clear: () => {},
      key: () => null,
      length: 0
    },
    navigator: {
      userAgent: 'node',
      platform: 'node',
      languages: ['en']
    },
    location: {
      href: '',
      protocol: 'http:',
      host: 'localhost',
      hostname: 'localhost',
      pathname: '/',
      search: '',
      hash: '',
      reload: () => {}
    },
    history: {
      pushState: () => {},
      replaceState: () => {},
      back: () => {},
      forward: () => {},
      go: () => {},
      length: 0,
      state: null
    },
    addEventListener: () => {},
    removeEventListener: () => {},
    getSelection: () => ({
      removeAllRanges: () => {},
      addRange: () => {},
    }),
    scrollTo: () => {},
    alert: () => {},
    confirm: () => true,
    prompt: () => '',
    setTimeout: global.setTimeout,
    clearTimeout: global.clearTimeout,
    setInterval: global.setInterval,
    clearInterval: global.clearInterval,
    requestAnimationFrame: (cb: any) => global.setTimeout(cb, 0),
    cancelAnimationFrame: (id: any) => global.clearTimeout(id),
    Node: function() {},
    HTMLElement: function() {},
    Event: function() {},
    CustomEvent: function() {},
    requestIdleCallback: (cb: any) => global.setTimeout(cb, 0),
    cancelIdleCallback: (id: any) => global.clearTimeout(id),
    matchMedia: () => ({
      matches: false,
      addListener: () => {},
      removeListener: () => {}
    }),
  };

  windowMock.window = windowMock;
  windowMock.self = windowMock;
  windowMock.top = windowMock;
  windowMock.parent = windowMock;

  const safeDefineOnGlobal = (key: string, value: any) => {
    try {
      Object.defineProperty(global, key, {
        value: value,
        writable: true,
        configurable: true
      });
    } catch (e) {
      try {
        (global as any)[key] = value;
      } catch (err) {
        try {
          if ((global as any)[key] && typeof (global as any)[key] === 'object') {
            Object.assign((global as any)[key], value);
          }
        } catch (assignErr) {
          console.warn(`Could not set or extend global.${key}:`, assignErr);
        }
      }
    }
  };

  safeDefineOnGlobal('window', windowMock);
  safeDefineOnGlobal('document', windowMock.document);
  safeDefineOnGlobal('localStorage', windowMock.localStorage);
  safeDefineOnGlobal('sessionStorage', windowMock.sessionStorage);
  safeDefineOnGlobal('navigator', windowMock.navigator);
  safeDefineOnGlobal('location', windowMock.location);
  safeDefineOnGlobal('history', windowMock.history);
  safeDefineOnGlobal('getSelection', windowMock.getSelection);
  safeDefineOnGlobal('addEventListener', windowMock.addEventListener);
  safeDefineOnGlobal('removeEventListener', windowMock.removeEventListener);
}

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
