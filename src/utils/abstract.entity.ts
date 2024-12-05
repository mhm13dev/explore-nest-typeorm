import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { nanoid } from './nano-id.util';

export abstract class AbstractEntity {
  @PrimaryGeneratedColumn('identity')
  @Exclude()
  id: number;

  @Column({ name: 'public_id', unique: true })
  @IsString()
  @IsNotEmpty()
  publicId: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @CreateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
    default: null,
  })
  @Exclude()
  deletedAt?: Date;

  @BeforeInsert()
  async generateId() {
    if (!this.publicId) {
      this.publicId = nanoid();
    }
  }
}
