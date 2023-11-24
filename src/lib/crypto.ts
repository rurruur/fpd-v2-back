import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';

export const createRandomBytes = (bytes = 16) => {
  return randomBytes(bytes).toString('hex');
};

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return { salt, hashedPassword };
};
