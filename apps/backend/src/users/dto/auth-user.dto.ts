import { IsString } from 'class-validator';

export class AuthUserDto {
  @IsString()
  email: string;
  @IsString()
  password: string;
}
