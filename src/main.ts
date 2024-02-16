import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisIoAdapter } from './RedisIoAdapter';
import { App2Module } from './app2.module';

async function bootstrap() {
  // server app in port 3000
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('port1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  const redisIoAdapter = new RedisIoAdapter(app);
  await redisIoAdapter.connectToRedis();

  app.useWebSocketAdapter(redisIoAdapter);
  await app.listen(port);

  // server app in port 5000
  const app2 = await NestFactory.create(App2Module);
  const configService2 = app2.get(ConfigService);
  const port2 = configService2.get('port2');
  app2.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  const redisIoAdapter2 = new RedisIoAdapter(app2);
  await redisIoAdapter2.connectToRedis();

  app2.useWebSocketAdapter(redisIoAdapter2);
  await app2.listen(port2);
}
bootstrap();
