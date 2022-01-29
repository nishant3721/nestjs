import { IsBoolean, IsString } from 'class-validator';

export class AuthResponseDto {
  @IsBoolean()
  success: boolean;
  @IsString()
  token: string;
}
