import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { NodeEnv } from '../config.types';

/**
 * This DTO class is used to validate the environment variables. If the environment variables are not valid, the application will not start.
 */
export class ConfigDto {
  // Core
  @IsNotEmpty()
  @IsEnum(NodeEnv)
  NODE_ENV: NodeEnv;

  @IsNotEmpty()
  @IsNumber()
  PORT: number;

  // Database
  @IsNotEmpty()
  @IsString()
  POSTGRES_USER: string;

  @IsNotEmpty()
  @IsString()
  POSTGRES_PASSWORD: string;

  @IsNotEmpty()
  @IsString()
  POSTGRES_DB: string;

  @IsNotEmpty()
  @IsString()
  POSTGRES_HOST: string;

  @IsNotEmpty()
  @IsNumber()
  POSTGRES_PORT: number;
}
