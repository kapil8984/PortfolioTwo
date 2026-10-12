import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config();

function apiDevServerPlugin(): Plugin {
  return {
    name: 'api-dev-server',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/')) {
          return next();
        }

        // Collect request body
        let rawBody = '';
        req.on('data', (chunk) => {
          rawBody += chunk;
        });

        req.on('end', async () => {
          try {
            if (rawBody) {
              (req as any).body = JSON.parse(rawBody);
            }
          } catch {
            (req as any).body = {};
          }

          // Enhance res with status() and json() helpers
          const enhancedRes = res as any;
          enhancedRes.status = (code: number) => {
            res.statusCode = code;
            return enhancedRes;
          };
          enhancedRes.json = (data: any) => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
            return enhancedRes;
          };

          try {
            if (req.url?.startsWith('/api/contact')) {
              const { default: contactHandler } = await server.ssrLoadModule('/api/contact.ts');
              return await contactHandler(req, enhancedRes);
            }

            if (req.url?.startsWith('/api/ai/chat')) {
              const { default: chatHandler } = await server.ssrLoadModule('/api/ai/chat.ts');
              return await chatHandler(req, enhancedRes);
            }

            enhancedRes.status(404).json({ error: 'Endpoint not found' });
          } catch (err: any) {
            console.error('[API Middleware Error]', err);
            enhancedRes.status(500).json({ error: err.message || 'Internal server error' });
          }
        });
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), apiDevServerPlugin()],
  server: {
    port: 3000,
    host: true,
  },
});
