import { Body, Controller, Get, Post, Req } from '@nestjs/common';
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

  @Get('/getUser')
  async getUser(@Req() req: any): Promise<AuthDto> {
    return this.authService.getUserDetails(req);
  }
}
