import { createHash } from 'node:crypto';

// NOTE: intentionally naive. Used in the "find the auth problems" lab.
export function hashPassword(password) {
  return createHash('sha256').update(password).digest('hex');
}

export function verifyPassword(password, hash) {
  return hashPassword(password) === hash;
}
