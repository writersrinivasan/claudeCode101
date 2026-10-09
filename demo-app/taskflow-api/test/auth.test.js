import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { startTestServer } from '../test-utils/server.js';

let t;
before(async () => { t = await startTestServer(); });
after(async () => { await t.close(); });

test('registers a new user without leaking the password hash', async () => {
  const res = await t.api('POST', '/auth/register', {
    body: { email: 'grace@example.com', name: 'Grace', password: 'cobol4ever' },
  });
  assert.equal(res.status, 201);
  assert.equal(res.body.email, 'grace@example.com');
  assert.equal(res.body.passwordHash, undefined);
});

test('rejects duplicate emails', async () => {
  const res = await t.api('POST', '/auth/register', {
    body: { email: 'GRACE@example.com', name: 'Grace 2', password: 'x' },
  });
  assert.equal(res.status, 409);
});

test('logs in and returns a token', async () => {
  const res = await t.api('POST', '/auth/login', {
    body: { email: 'grace@example.com', password: 'cobol4ever' },
  });
  assert.equal(res.status, 200);
  assert.ok(res.body.token);
});

test('GET /me requires a token', async () => {
  const res = await t.api('GET', '/me');
  assert.equal(res.status, 401);
});
