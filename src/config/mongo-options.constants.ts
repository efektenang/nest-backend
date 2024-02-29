import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';

export const mongoOptions: MongooseModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (configSecret: ConfigService) => ({
    uri: configSecret.get('DATABASE_URI'),
  }),
  inject: [ConfigService],
};
