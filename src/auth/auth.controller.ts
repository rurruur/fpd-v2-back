import { Body, Controller, Post } from '@nestjs/common';
import { AuthUserService } from './auth-user.service';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authUserService: AuthUserService) {}

  @Post('register')
  async register(@Body() { email, password, name }: RegisterDto) {
    return this.authUserService.register(email, password, name);
  }
}
