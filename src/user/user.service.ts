import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignupUserInput } from './dto/signup-user.dto';
import { UpdateMeInput } from './dto/update-me.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async signupUser(input: SignupUserInput): Promise<User> {
    const { email, password } = input;
    const existingUser = await this.userRepository.exists({
      where: { email },
      withDeleted: true,
    });
    if (existingUser) {
      throw new ConflictException('User already exists');
    }
    const user = this.userRepository.create({ email, password });
    return this.userRepository.save(user);
  }

  async updateMe(input: UpdateMeInput): Promise<User> {
    const { publicId, name } = input;
    const user = await this.userRepository.findOneBy({ publicId });
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    user.name = name !== undefined ? name : user.name;
    return this.userRepository.save(user);
  }
}
