import { Body, Controller, Post } from '@nestjs/common';
import { AuthUserService } from './auth-user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authUserService: AuthUserService) {}

  @Post('register')
  async register(@Body() { email, password, name }: RegisterDto) {
    return this.authUserService.register(email, password, name);
  }

  @Post('login')
  async login(@Body() { email, password }: LoginDto) {
    return this.authUserService.login(email, password);
  }
}
