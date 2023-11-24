import { Body, Controller, Post, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { AuthUserService } from './auth-user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authUserService: AuthUserService, private readonly configService: ConfigService) {}

  @Post('register')
  async register(@Body() { email, password, name }: RegisterDto) {
    return this.authUserService.register(email, password, name);
  }

  @Post('login')
  async login(@Body() { email, password }: LoginDto, @Res() res: Response) {
    const accessToken = await this.authUserService.login(email, password);

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: this.configService.get<string>('NODE_ENV') === 'production',
      domain: this.configService.get<string>('FRONTEND_DOMAIN'),
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    });
    res.send({ success: true });
  }
}
