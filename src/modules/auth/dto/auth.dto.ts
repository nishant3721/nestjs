import { IsString, MinLength, IsEmail } from 'class-validator';

export class AuthDto {
  name: string;
  @IsString()
  @IsEmail()
  email: string;
  @IsString()
  @MinLength(5)
  password: string;
}
