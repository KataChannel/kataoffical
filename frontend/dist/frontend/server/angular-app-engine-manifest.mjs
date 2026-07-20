
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
    'styles-DYGJMV3Q.css': {
      text: () => import('node:fs/promises').then(fs => fs.readFile(new URL('../browser/styles-DYGJMV3Q.css', import.meta.url), 'utf-8')),
      size: 0,
      hash: 'manual'
    }
  },
};
