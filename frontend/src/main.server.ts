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

  (global as any).window = windowMock;
  (global as any).document = windowMock.document;
  (global as any).localStorage = windowMock.localStorage;
  (global as any).sessionStorage = windowMock.sessionStorage;
  (global as any).navigator = windowMock.navigator;
  (global as any).location = windowMock.location;
  (global as any).history = windowMock.history;
  (global as any).getSelection = windowMock.getSelection;
  (global as any).addEventListener = windowMock.addEventListener;
  (global as any).removeEventListener = windowMock.removeEventListener;
}

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
