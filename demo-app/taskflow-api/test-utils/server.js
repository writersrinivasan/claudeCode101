import http from 'node:http';
import { createApp } from '../src/app.js';
import { resetDb } from '../src/db.js';

// Starts the app on a random port and returns a small fetch wrapper.
export async function startTestServer() {
  resetDb();
  const server = http.createServer(createApp());
  await new Promise((resolve) => server.listen(0, resolve));
  const base = `http://localhost:${server.address().port}`;

  async function api(method, path, { body, token } = {}) {
    const res = await fetch(base + path, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    return { status: res.status, body: await res.json() };
  }

  async function signup(email = 'dev@example.com') {
    await api('POST', '/auth/register', { body: { email, name: 'Dev', password: 'secret-pass' } });
    const { body } = await api('POST', '/auth/login', { body: { email, password: 'secret-pass' } });
    return body.token;
  }

  return { api, signup, close: () => new Promise((r) => server.close(r)) };
}
