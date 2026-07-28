const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '../dist/frontend/server');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// 1. routes-manifest.json
const routesManifest = {
  version: 1,
  routes: [
    {
      path: '/**',
      renderMode: 'server'
    }
  ]
};
fs.writeFileSync(path.join(distDir, 'routes-manifest.json'), JSON.stringify(routesManifest, null, 2));

const browserDir = path.join(__dirname, '../dist/frontend/browser');
const cssFiles = fs.existsSync(browserDir) ? fs.readdirSync(browserDir).filter(f => f.endsWith('.css')) : [];
const mainJsFile = fs.existsSync(browserDir) ? fs.readdirSync(browserDir).find(f => f.startsWith('main-') && f.endsWith('.js')) : '';

const assetsString = `{
    'index.server.html': {
      text: () => import('node:fs/promises').then(fs => fs.readFile(new URL('./index.server.html', import.meta.url), 'utf-8')),
      size: 0,
      hash: 'manual'
    },
    ${cssFiles.map(f => `'${f}': {
      text: () => import('node:fs/promises').then(fs => fs.readFile(new URL('../browser/${f}', import.meta.url), 'utf-8')),
      size: 0,
      hash: 'manual'
    }`).join(',\n    ')}
  }`;

const engineManifestContent = `
export default {
  basePath: '/',
  supportedLocales: {
    "en-US": ""
  },
  entryPoints: {
    '': () => import('./main.server.mjs')
  },
  assets: ${assetsString},
};
`;
fs.writeFileSync(path.join(distDir, 'angular-app-engine-manifest.mjs'), engineManifestContent);

// 3. angular-app-manifest.mjs (Minimal)
const appManifest = `
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
     { route: '/**', renderMode: 0 }
  ],
  assets: ${assetsString},
  entryPointToBrowserMapping: {
    '': [${mainJsFile ? `'${mainJsFile}'` : ''}]
  }
};
`;
fs.writeFileSync(path.join(distDir, 'angular-app-manifest.mjs'), appManifest);

console.log('✅ Manually created all SSR manifest files in:', distDir);
