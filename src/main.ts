import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisIoAdapter } from './RedisIoAdapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService)
  const port = configService.get('port')
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    }),
  );
  const redisIoAdapter = new RedisIoAdapter(app)
  await redisIoAdapter.connectToRedis()

  app.useWebSocketAdapter(redisIoAdapter)
  await app.listen(port);
}
bootstrap();
