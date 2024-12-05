import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getConfig } from './utils/get-config.util';
import { validateConfig } from './utils/validate-config.util';
import { AppConfigService } from './config.service';

@Module({})
@Global()
export class AppConfigModule {
  static register(envFilePath: string = '.env'): DynamicModule {
    return {
      module: AppConfigModule,
      imports: [
        ConfigModule.forRoot({
          envFilePath: envFilePath,
          validate: validateConfig,
          load: [getConfig],
          isGlobal: false,
        }),
      ],
      providers: [AppConfigService],
      exports: [AppConfigService],
    };
  }
}
