import http from 'node:http';
import { createApp } from './app.js';
import { seed } from './db.js';

const PORT = process.env.PORT || 3001;

seed();
http.createServer(createApp()).listen(PORT, () => {
  console.log(`TaskFlow API listening on http://localhost:${PORT}`);
  console.log('Seed user: ada@example.com / password123');
});
