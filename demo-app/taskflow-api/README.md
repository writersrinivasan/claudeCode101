# TaskFlow API — Claude Code practice repo

A deliberately small, zero-dependency Node.js REST API used in the
**Claude Code for Developers** hands-on session.

> ⚠️ This codebase contains **intentional bugs and security weaknesses**.
> Do not copy it into production. Finding them with Claude Code is the point.

## Requirements

- Node.js 20 or newer
- No `npm install` needed — there are no dependencies

## Run it

```bash
npm start          # http://localhost:3001
npm test           # runs the test suite with node:test
```

Seed user: `ada@example.com` / `password123`

## Try the API

```bash
# log in
curl -s -X POST localhost:3001/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"ada@example.com","password":"password123"}'

# use the token
curl -s localhost:3001/tasks -H "Authorization: Bearer <token>"
```

## Endpoints

| Method | Path                   | Auth | Description              |
| ------ | ---------------------- | ---- | ------------------------ |
| POST   | `/auth/register`       | —    | Create an account        |
| POST   | `/auth/login`          | —    | Get a bearer token       |
| GET    | `/me`                  | ✓    | Current user             |
| GET    | `/tasks?page=&limit=`  | ✓    | Paginated task list      |
| POST   | `/tasks`               | ✓    | Create a task            |
| POST   | `/tasks/:id/complete`  | ✓    | Mark a task done         |
| GET    | `/tasks/overdue`       | ✓    | Tasks past their due date|

## Layout

```
src/
  server.js            entry point (seeds data, starts HTTP server)
  app.js               request handling, JSON parsing, error mapping
  router.js            tiny method+path router with :params
  db.js                in-memory store + seed data
  routes/              HTTP layer — thin, delegates to services
  services/            business logic (auth, tasks)
  utils/               crypto + validation helpers
test/                  node:test suites (some fail on purpose!)
test-utils/server.js   boots the app on a random port for tests
```

## Lab ideas

1. Ask Claude Code to explain the whole application.
2. Review the authentication logic for security problems.
3. Add a user **profile** feature following existing patterns.
4. Write a `CLAUDE.md` for this repo.
5. Run the tests, find the root causes, fix them.
