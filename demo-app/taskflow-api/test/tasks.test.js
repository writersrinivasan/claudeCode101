import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { startTestServer } from '../test-utils/server.js';

let t;
let token;
before(async () => {
  t = await startTestServer();
  token = await t.signup();
});
after(async () => { await t.close(); });

test('creates a task', async () => {
  const res = await t.api('POST', '/tasks', { token, body: { title: '  Ship it  ' } });
  assert.equal(res.status, 201);
  assert.equal(res.body.title, 'Ship it');
  assert.equal(res.body.done, false);
});

test('page 1 returns the first tasks', async () => {
  for (let i = 2; i <= 12; i++) {
    await t.api('POST', '/tasks', { token, body: { title: `Task ${i}` } });
  }
  const res = await t.api('GET', '/tasks?page=1&limit=5', { token });
  assert.equal(res.status, 200);
  assert.equal(res.body.total, 12);
  assert.equal(res.body.items.length, 5);
  assert.equal(res.body.items[0].title, 'Ship it');
});

test('lists only tasks whose due date has passed as overdue', async () => {
  await t.api('POST', '/tasks', { token, body: { title: 'Old', dueDate: '2001-01-01' } });
  await t.api('POST', '/tasks', { token, body: { title: 'Future', dueDate: '2999-01-01' } });
  const res = await t.api('GET', '/tasks/overdue', { token });
  assert.equal(res.status, 200);
  assert.deepEqual(res.body.map((x) => x.title), ['Old']);
});

test('completes a task', async () => {
  const created = await t.api('POST', '/tasks', { token, body: { title: 'Finish me' } });
  const res = await t.api('POST', `/tasks/${created.body.id}/complete`, { token });
  assert.equal(res.status, 200);
  assert.equal(res.body.done, true);
});
