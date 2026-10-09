import { register, login, authenticate, publicUser } from '../services/authService.js';

export function registerAuthRoutes(router) {
  router.post('/auth/register', ({ body }) => ({ status: 201, json: register(body) }));
  router.post('/auth/login', ({ body }) => ({ status: 200, json: login(body) }));
  router.get('/me', ({ req }) => ({ status: 200, json: publicUser(authenticate(req)) }));
}
