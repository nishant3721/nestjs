import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signup(@Body() signupDto: AuthDto): Promise<AuthDto> {
    return this.authService.signup(signupDto);
  }

  @Post('/login')
  login(@Body() loginDto: AuthDto): Promise<AuthDto> {
    return this.authService.login(loginDto);
  }
}
