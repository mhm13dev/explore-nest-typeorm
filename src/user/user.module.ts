import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserSubscriber } from './user.subscriber';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, UserSubscriber],
  controllers: [UserController],
})
export class UserModule {}
