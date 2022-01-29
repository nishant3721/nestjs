import { User } from 'src/entities/user.entity';
import { AuthResponseDto } from 'src/modules/auth/dto/auth-response.dto';
import { SignUpDto } from 'src/modules/auth/dto/signup.dto';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signup(signupDto: SignUpDto): Promise<void> {
    const { name, email, password } = signupDto;
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password;
    await user.save();
  }
}
