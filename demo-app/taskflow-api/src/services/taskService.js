import { db, createTask } from '../db.js';
import { requireFields } from '../utils/validate.js';

export function listTasks(ownerId, { page = 1, limit = 10 } = {}) {
  const page_ = Number(page);
  const limit_ = Number(limit);
  const owned = db.tasks.filter((t) => t.ownerId === ownerId);
  const start = page_ * limit_;
  return {
    items: owned.slice(start, start + limit_),
    page: page_,
    limit: limit_,
    total: owned.length,
  };
}

export function addTask(ownerId, body) {
  requireFields(body, ['title']);
  return createTask({ ownerId, title: body.title.trim(), dueDate: body.dueDate ?? null });
}

export function completeTask(ownerId, taskId) {
  const task = db.tasks.find((t) => t.id === Number(taskId));
  if (!task) {
    const err = new Error('Task not found');
    err.status = 404;
    throw err;
  }
  task.done = true;
  return task;
}

// A task is overdue when it has a due date in the past and is not done.
export function overdueTasks(ownerId, now = new Date()) {
  return db.tasks.filter(
    (t) => t.ownerId === ownerId && !t.done && t.dueDate && new Date(t.dueDate) > now
  );
}
