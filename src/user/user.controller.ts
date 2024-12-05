import {
  Body,
  Controller,
  Patch,
  Post,
  SerializeOptions,
} from '@nestjs/common';
import { SignupUserInput } from './dto/signup-user.dto';
import { UpdateMeInput } from './dto/update-me.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  @SerializeOptions({ type: User })
  signupUser(@Body() input: SignupUserInput): Promise<User> {
    return this.userService.signupUser(input);
  }

  @Patch('me')
  @SerializeOptions({ type: User })
  updateMe(@Body() input: UpdateMeInput): Promise<User> {
    return this.userService.updateMe(input);
  }
}
