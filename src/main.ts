import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { EnvSchema } from './env/env.js';
import { AppModule } from './app.module.js';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService<EnvSchema, true>>(ConfigService)
  const port = configService.get('PORT', { infer: true })

  await app.listen(port);
}
bootstrap();
