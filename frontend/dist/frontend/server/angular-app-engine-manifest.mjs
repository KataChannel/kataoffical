
export default {
  basePath: '/',
  supportedLocales: {
    "en-US": ""
  },
  entryPoints: {
    '': () => import('./main.server.mjs')
  },
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
};
