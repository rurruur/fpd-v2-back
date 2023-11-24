import { Module } from '@nestjs/common';
import { AuthUserService } from './auth-user.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';

@Module({
  imports: [],
  providers: [AuthUserService, AuthRepository],
  controllers: [AuthController],
})
export class AuthModule {}
