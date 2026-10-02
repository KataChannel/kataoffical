import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import { ɵsetAngularAppEngineManifest, ɵsetAngularAppManifest } from '@angular/ssr';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();

let angularApp: any;
const initPromise = (async () => {
  try {
    // Load manifests manually before initializing the engine
    const manifestPath = resolve(serverDistFolder, 'angular-app-manifest.mjs');
    const engineManifestPath = resolve(serverDistFolder, 'angular-app-engine-manifest.mjs');

    // Use pathToFileURL to ensure valid file URLs on all platforms
    const { default: manifest } = await import(pathToFileURL(manifestPath).href);
    const { default: engineManifest } = await import(pathToFileURL(engineManifestPath).href);

    ɵsetAngularAppManifest(manifest);
    ɵsetAngularAppEngineManifest(engineManifest);

    angularApp = new AngularNodeAppEngine();
  } catch (e) {
    console.error('CRITICAL ERROR: Failed to initialize AngularNodeAppEngine', e);
  }
})();

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/**', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

// Fallback alias for /images/qrcodemoi.jpg
app.get('/images/qrcodemoi.jpg', (req, res) => {
  res.redirect(301, '/images/qr-congty2.jpg');
});

// Guard static asset routes so missing files do NOT fallback to SSR HTML
app.use(['/images', '/assets'], (req, res) => {
  res.status(404).set('Cache-Control', 'no-store, no-cache, must-revalidate').send('Static file not found');
});

app.use((req, res, next) => {
  if (/\.(jpe?g|png|gif|svg|webp|ico|css|js|map|woff2?|ttf|eot)$/i.test(req.path)) {
    res.status(404).set('Cache-Control', 'no-store, no-cache, must-revalidate').send('File not found');
    return;
  }
  next();
});



/**
 * Handle all other requests by rendering the Angular application.
 */
app.use('/**', (req, res, next) => {
  initPromise.then(() => {
    if (!angularApp) {
      return next(new Error('AngularNodeAppEngine not initialized'));
    }
    angularApp
      .handle(req)
      .then((response: any) =>
        response ? writeResponseToNodeResponse(response, res) : next(),
      )
      .catch(next);
  });
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4301.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4301;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * The request handler used by the Angular CLI (dev-server and during build).
 */
export const reqHandler = createNodeRequestHandler(app);
