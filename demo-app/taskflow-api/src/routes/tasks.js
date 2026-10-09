import { authenticate } from '../services/authService.js';
import { listTasks, addTask, completeTask, overdueTasks } from '../services/taskService.js';

export function registerTaskRoutes(router) {
  router.get('/tasks', ({ req, query }) => {
    const user = authenticate(req);
    return { status: 200, json: listTasks(user.id, query) };
  });

  router.post('/tasks', ({ req, body }) => {
    const user = authenticate(req);
    return { status: 201, json: addTask(user.id, body) };
  });

  router.post('/tasks/:id/complete', ({ req, params }) => {
    const user = authenticate(req);
    return { status: 200, json: completeTask(user.id, params.id) };
  });

  router.get('/tasks/overdue', ({ req }) => {
    const user = authenticate(req);
    return { status: 200, json: overdueTasks(user.id) };
  });
}
