/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/user.entity';
import { UserRepository } from 'src/repository/user.repository';
import { AuthDto } from './dto/auth.dto';

require('dotenv').config();
const jwt = require('jsonwebtoken');

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  getToken(userId: AuthDto): string {
    const token = jwt.sign({ data: userId }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });
    return token;
  }

  validateUser(token: string): Users {
    const userInfo = jwt.verify(token, process.env.JWT_SECRET);
    return userInfo.data;
  }

  async signup(signupDto: AuthDto): Promise<AuthDto> {
    let userInfo;
    userInfo = await this.userRepository.signup(signupDto);
    delete userInfo.password;
    delete userInfo.salt;
    delete userInfo.tasks;
    userInfo.token = this.getToken(userInfo);
    return userInfo;
  }

  async login(loginDto: AuthDto): Promise<AuthDto> {
    let userInfo;
    userInfo = await this.userRepository.login(loginDto);
    delete userInfo.password;
    delete userInfo.salt;
    delete userInfo.tasks;
    userInfo.token = this.getToken(userInfo);
    return userInfo;
  }

  async getUserDetails(req: any): Promise<AuthDto> {
    const parseId = req.user.id;
    let userInfo;
    userInfo = await this.userRepository.getUser(parseId);
    delete userInfo.password;
    delete userInfo.salt;
    delete userInfo.tasks;
    return userInfo;
  }
}
