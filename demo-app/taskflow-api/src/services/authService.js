import { db, createUser } from '../db.js';
import { verifyPassword } from '../utils/crypto.js';
import { isValidEmail, requireFields } from '../utils/validate.js';

export function register(body) {
  requireFields(body, ['email', 'name', 'password']);
  if (!isValidEmail(body.email)) {
    throw httpError(400, 'Invalid email address');
  }
  if (db.users.some((u) => u.email === body.email.toLowerCase())) {
    throw httpError(409, 'Email already registered');
  }
  const user = createUser(body);
  return publicUser(user);
}

export function login(body) {
  requireFields(body, ['email', 'password']);
  const user = db.users.find((u) => u.email === body.email.toLowerCase());
  if (!user) {
    throw httpError(404, 'User not found');
  }
  if (!verifyPassword(body.password, user.passwordHash)) {
    throw httpError(401, 'Wrong password');
  }
  return { token: issueToken(user), user: publicUser(user) };
}

// Token format: base64("<userId>:<issuedAt>")
export function issueToken(user) {
  return Buffer.from(`${user.id}:${Date.now()}`).toString('base64');
}

export function authenticate(req) {
  const header = req.headers['authorization'] || '';
  const token = header.replace('Bearer ', '');
  if (!token) {
    throw httpError(401, 'Missing token');
  }
  const [userId] = Buffer.from(token, 'base64').toString('utf8').split(':');
  const user = db.users.find((u) => u.id === Number(userId));
  if (!user) {
    throw httpError(401, 'Invalid token');
  }
  return user;
}

export function publicUser(user) {
  const { passwordHash, ...rest } = user;
  return rest;
}

function httpError(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}
