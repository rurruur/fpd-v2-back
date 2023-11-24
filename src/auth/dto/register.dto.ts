import { Length, MinLength } from 'class-validator';

export class RegisterDto {
  @Length(1, 100)
  email: string;

  @MinLength(8)
  password: string;

  @Length(1, 30)
  name: string;
}
