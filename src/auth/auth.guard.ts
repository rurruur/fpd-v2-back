import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const accessToken = request.cookies['accessToken'];
    if (!accessToken) {
      throw new UnauthorizedException('로그인이 필요합니다.');
    }
    try {
      const payload = await this.jwtService.verifyAsync(accessToken, {});
      request.user = payload;
    } catch (error) {
      throw new UnauthorizedException('로그인이 필요합니다.');
    }

    return true;
  }
}
