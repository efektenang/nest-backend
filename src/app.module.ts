import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { EventsModule } from './events/events.module';
import { CacheModule } from '@nestjs/cache-manager';
import { redisOptions } from './config/redis-options.constants';
import { mongoOptions } from './config/mongo-options.constants';
import { RouterModule } from '@nestjs/core';
import routersConfig, {
  destructModuleFromRoutes,
} from './config/routers.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NEST_ENV}`],
      isGlobal: true,
    }),
    CacheModule.registerAsync(redisOptions),
    MongooseModule.forRootAsync(mongoOptions),
    ...destructModuleFromRoutes(routersConfig),
    RouterModule.register(routersConfig),
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
