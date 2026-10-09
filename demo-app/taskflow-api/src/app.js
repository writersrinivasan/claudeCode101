import { createRouter } from './router.js';
import { registerAuthRoutes } from './routes/auth.js';
import { registerTaskRoutes } from './routes/tasks.js';

export function createApp() {
  const router = createRouter();
  registerAuthRoutes(router);
  registerTaskRoutes(router);

  return async function handle(req, res) {
    const url = new URL(req.url, 'http://localhost');
    const found = router.match(req.method, url.pathname);

    if (!found) {
      return send(res, 404, { error: 'Not found' });
    }

    try {
      const body = await readJson(req);
      const query = Object.fromEntries(url.searchParams);
      const result = await found.handler({ req, body, query, params: found.params });
      send(res, result.status, result.json);
    } catch (err) {
      send(res, err.status || 500, { error: err.message });
    }
  };
}

function send(res, status, payload) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(payload));
}

async function readJson(req) {
  if (req.method === 'GET' || req.method === 'DELETE') return {};
  let raw = '';
  for await (const chunk of req) raw += chunk;
  return raw ? JSON.parse(raw) : {};
}
