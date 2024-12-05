import { NestFactory } from '@nestjs/core';
import { AppConfigService } from './config/config.service';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfigService = app.get(AppConfigService);
  await app.listen(appConfigService.core.PORT);
}
bootstrap();
