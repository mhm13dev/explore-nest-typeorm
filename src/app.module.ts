import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import {
  ClassSerializerInterceptor,
  Module,
  ValidationPipe,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from './config/config.module';
import { AppConfigService } from './config/config.service';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    AppConfigModule.register(),
    TypeOrmModule.forRootAsync({
      useFactory: (appConfigService: AppConfigService) => {
        return {
          ...appConfigService.database.POSTGRES,
          autoLoadEntities: true,
        };
      },
      inject: [AppConfigService],
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    AppService,
  ],
})
export class AppModule {}
