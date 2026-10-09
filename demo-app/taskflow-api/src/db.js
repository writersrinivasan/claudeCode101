// In-memory data store. Resets every time the process restarts.
import { hashPassword } from './utils/crypto.js';

let nextUserId = 1;
let nextTaskId = 1;

export const db = {
  users: [],
  tasks: [],
};

export function createUser({ email, name, password }) {
  const user = {
    id: nextUserId++,
    email: email.toLowerCase(),
    name,
    passwordHash: hashPassword(password),
    createdAt: new Date().toISOString(),
  };
  db.users.push(user);
  return user;
}

export function createTask({ ownerId, title, dueDate = null }) {
  const task = {
    id: nextTaskId++,
    ownerId,
    title,
    done: false,
    dueDate,
    createdAt: new Date().toISOString(),
  };
  db.tasks.push(task);
  return task;
}

export function resetDb() {
  db.users.length = 0;
  db.tasks.length = 0;
  nextUserId = 1;
  nextTaskId = 1;
}

export function seed() {
  const ada = createUser({ email: 'ada@example.com', name: 'Ada Lovelace', password: 'password123' });
  createTask({ ownerId: ada.id, title: 'Write the first algorithm', dueDate: '2020-01-01' });
  createTask({ ownerId: ada.id, title: 'Review analytical engine notes', dueDate: '2999-12-31' });
  createTask({ ownerId: ada.id, title: 'Reply to Babbage' });
}
