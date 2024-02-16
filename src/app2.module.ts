import { Module } from '@nestjs/common';
import { HeroModule } from './hero/hero.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from './config';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';
import { ChatModule } from './chat/chat.module';
import { App2Service } from './app2.service';
import { App2Controller } from './app2.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config]
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configSecret: ConfigService) => ({
        uri: configSecret.get('mongoUri'),
      })
    }),
    HeroModule,
    AuthModule,
    EventsModule,
    ChatModule
  ],
  controllers: [App2Controller],
  providers: [App2Service],
})
export class App2Module {}
