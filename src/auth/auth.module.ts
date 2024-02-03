import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema } from './schemas/auth.schema';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { EventsGateway } from 'src/events/events.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Auth.name,
        schema: AuthSchema,
      },
    ]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: {expiresIn: '60s'}
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, EventsGateway],
})
export class AuthModule {}
