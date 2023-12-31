import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { AuthUserService } from './auth-user.service';
import { AuthGuard } from './auth.guard';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authUserService: AuthUserService, private readonly configService: ConfigService) {}

  @UseGuards(AuthGuard)
  @Get()
  async auth(@Req() req: Request & { user: any }) {
    return req.user;
  }

  @Post('register')
  async register(@Body() { email, password, name }: RegisterDto) {
    return this.authUserService.register(email, password, name);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() { email, password }: LoginDto, @Res() res: Response) {
    const result = await this.authUserService.login(email, password);

    res.cookie('accessToken', result.accessToken, {
      httpOnly: true,
      secure: this.configService.get<string>('NODE_ENV') === 'production',
      domain: this.configService.get<string>('FRONTEND_DOMAIN'),
      path: '/',
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    });
    res.send(result);
  }

  @Post('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('accessToken');
    res.sendStatus(HttpStatus.OK);
  }
}
