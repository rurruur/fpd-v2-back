import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { AuthUser } from '../entity/auth-user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async hashPassword(password: string, salt?: string) {
    if (!salt) {
      salt = await bcrypt.genSalt(10);
    }
    const hashedPassword = await bcrypt.hash(password, salt);

    return { salt, hashedPassword };
  }

  async validatePassword(user: AuthUser & { salt: string }, inputPassword: string) {
    const { hashedPassword } = await this.hashPassword(inputPassword, user.salt);

    return hashedPassword === user.password;
  }

  generateAccessToken(user: AuthUser) {
    const payload = { sub: user.uid, email: user.email, name: user.name, uid: user.uid };

    return this.jwtService.sign(payload);
  }
}
