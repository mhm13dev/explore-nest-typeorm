import { DataSourceOptions } from 'typeorm';

/**
 * Enum set via NODE_ENV environment variable.
 *
 * The application can run in one of the given environments.
 */
export enum NodeEnv {
  development = 'development',
  staging = 'staging',
  production = 'production',
  test = 'test',
}

/**
 * This interface defines the configuration object available via the `ConfigService`.
 */
export interface IConfig {
  core: {
    NODE_ENV: NodeEnv;
    PORT: number;
  };

  database: {
    POSTGRES: DataSourceOptions;
  };
}
