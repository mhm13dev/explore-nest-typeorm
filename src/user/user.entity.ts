import { Column, Entity } from 'typeorm';
import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Exclude, Transform } from 'class-transformer';
import { AbstractEntity } from '../utils/abstract.entity';

@Entity({ name: 'users' })
export class User extends AbstractEntity {
  @Column({ length: 255, unique: true })
  @IsEmail()
  @MaxLength(255)
  @Transform(({ value }) => value.trim().toLowerCase(), { toClassOnly: true })
  email: string;

  @Column({ length: 255, nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  @Transform(({ value }) => value && value.trim(), { toClassOnly: true })
  name?: string;

  @Column()
  @MinLength(8)
  @MaxLength(255)
  @Exclude({ toPlainOnly: true })
  password: string;
}
