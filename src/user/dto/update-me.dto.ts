import { PickType } from '@nestjs/mapped-types';
import { User } from '../user.entity';

export class UpdateMeInput extends PickType(User, ['publicId', 'name']) {}
