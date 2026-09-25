
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
     { route: '/**', renderMode: 0 }
  ],
  assets: {
    'index.server.html': {
      text: () => import('node:fs/promises').then(fs => fs.readFile(new URL('./index.server.html', import.meta.url), 'utf-8')),
      size: 0,
      hash: 'manual'
    },
    'styles-KIQNXNC7.css': {
      text: () => import('node:fs/promises').then(fs => fs.readFile(new URL('../browser/styles-KIQNXNC7.css', import.meta.url), 'utf-8')),
      size: 0,
      hash: 'manual'
    }
  },
  entryPointToBrowserMapping: {
    '': ['main-AZ2OQYKZ.js']
  }
};
