import { BadRequestException, Injectable } from '@nestjs/common';
import { createRandomBytes, hashPassword } from '../lib/crypto';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthUserService {
  constructor(private readonly authRepository: AuthRepository) {}

  async register(email: string, password: string, name: string) {
    const users = await this.authRepository.findUserByEmailOrName(email, name);
    if (users.find((user) => user.email === email)) {
      throw new BadRequestException('이미 가입된 이메일입니다.');
    } else if (users.find((user) => user.name === name)) {
      throw new BadRequestException('사용중인 이름입니다.');
    }

    const uid = createRandomBytes();
    const { hashedPassword, salt } = await hashPassword(password);

    await this.authRepository.insertUser(uid, email, name, hashedPassword);
    await this.authRepository.insertSalt(uid, salt);

    return { uid, email, name };
  }
}
