import { PickType } from '@nestjs/mapped-types';
import { User } from '../user.entity';

export class SignupUserInput extends PickType(User, ['email', 'password']) {}
