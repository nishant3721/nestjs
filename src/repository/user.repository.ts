import { Users } from 'src/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { AuthDto } from 'src/modules/auth/dto/auth.dto';
import { EntityRepository, Repository } from 'typeorm';
import {
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
@EntityRepository(Users)
export class UserRepository extends Repository<Users> {
  async signup(signupDto: AuthDto): Promise<AuthDto> {
    const { name, email, password } = signupDto;
    const salt = await bcrypt.genSalt();
    const user = new Users();
    user.name = name;
    user.email = email;
    user.salt = salt;
    user.password = await this.hashPassword(password, salt);
    try {
      await user.save();
      return user;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('User with this email already exists');
      }
    }
  }

  async login(authDto: AuthDto): Promise<AuthDto> {
    const { email, password } = authDto;
    const userInfo = await this.findOne({ email });
    if (userInfo && (await userInfo.validatePasswrord(password))) {
      return userInfo;
    } else {
      throw new UnauthorizedException('Invalid Credentials');
    }
  }

  async getUser(id: number): Promise<AuthDto> {
    const userInfo = await this.findOne(id);
    if (!userInfo) {
      throw new NotFoundException('User not found.');
    }
    return userInfo;
  }

  async hashPassword(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }
}
