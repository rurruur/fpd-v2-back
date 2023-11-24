import { randomBytes } from 'crypto';

export const createRandomBytes = (bytes = 16) => {
  return randomBytes(bytes).toString('hex');
};
