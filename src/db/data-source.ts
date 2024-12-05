import 'dotenv/config';
import { DataSource } from 'typeorm';
import { getConfig } from '../config/utils/get-config.util';

const config = getConfig();

export const AppDataSource = new DataSource({
  ...config.database.POSTGRES,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/db/migrations/*.ts'],
});
