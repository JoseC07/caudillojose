import express from 'express';
import compression from 'compression';
import { createServer as createViteServer } from 'vite';

async function createServer() {
  const app = express();
  
  // Enable Brotli/Gzip compression
  app.use(compression());
  
  // Cache control for static assets
  app.use(express.static('dist', {
    maxAge: '30d',
    immutable: true,
    etag: true,
    lastModified: true
  }));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('dist'));
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom'
    });
    app.use(vite.middlewares);
  }

  app.listen(3000);
}

createServer(); 