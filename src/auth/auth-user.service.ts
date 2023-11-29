import { BadRequestException, Injectable } from '@nestjs/common';
import { createRandomBytes } from '../lib/crypto';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';

@Injectable()
export class AuthUserService {
  constructor(private readonly authRepository: AuthRepository, private readonly authService: AuthService) {}

  async register(email: string, password: string, name: string) {
    const users = await this.authRepository.findUserByEmailOrName(email, name);
    if (users.find((user) => user.email === email)) {
      throw new BadRequestException('이미 가입된 이메일입니다.');
    } else if (users.find((user) => user.name === name)) {
      throw new BadRequestException('사용중인 이름입니다.');
    }

    const uid = createRandomBytes();
    const { hashedPassword, salt } = await this.authService.hashPassword(password);

    await this.authRepository.insertUser(uid, email, name, hashedPassword);
    await this.authRepository.insertSalt(uid, salt);

    return { uid, email, name };
  }

  async login(email: string, password: string) {
    const user = await this.authRepository.findUserWithSaltByEmail(email);
    const isValid = await this.authService.validatePassword(user, password);
    if (!isValid) {
      throw new BadRequestException('잘못된 비밀번호입니다.');
    }

    const accessToken = this.authService.generateAccessToken(user);

    return { name: user.name, accessToken };
  }
}
