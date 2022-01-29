/* eslint-disable @typescript-eslint/no-empty-function */
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/repository/user.repository';
import { AuthResponseDto } from './dto/auth-response.dto';
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  async signup(signupDto: SignUpDto): Promise<void> {
    const user = await this.userRepository.findOne(signupDto.email);
    if (user) {
      throw new HttpException(
        'Sorry a user with this email, already exists',
        401,
      );
    }
    return await this.userRepository.signup(signupDto);
  }
}
