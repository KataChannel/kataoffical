
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
    'styles-6WT3ZWXC.css': {
      text: () => import('node:fs/promises').then(fs => fs.readFile(new URL('../browser/styles-6WT3ZWXC.css', import.meta.url), 'utf-8')),
      size: 0,
      hash: 'manual'
    }
  },
  entryPointToBrowserMapping: {
    '': ['main-AF7ORHAZ.js']
  }
};
