import { IConfig, NodeEnv } from '../config.types';

/**
 * This is a custom configuration function that returns the configuration object available via the `ConfigService`.
 */
export function getConfig(): IConfig {
  return {
    core: {
      NODE_ENV: (process.env.NODE_ENV ?? NodeEnv.development) as NodeEnv,
      PORT: parseInt(process.env.PORT!, 10) || 5001,
    },
    database: {
      POSTGRES: {
        type: 'postgres',
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        host: process.env.POSTGRES_HOST,
        port: parseInt(process.env.POSTGRES_PORT!, 10),
        logging: true,
        synchronize: false, // It's better to generate and run migrations when entities change
      },
    },
  };
}
