import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { Observable } from 'rxjs';
import { Socket } from 'socket.io';
import { jwtConstants } from '../constants';

@Injectable()
export class WsJwtGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    if (context.getType() !== 'ws') {
      return true
    }
    const client: Socket = context.switchToWs().getClient<Socket>();
    WsJwtGuard.validateToken(client)

    return true;
  }

  static validateToken(client: Socket) {
    const authToken = client.handshake?.headers?.authorization;
    const token: string = authToken.split(' ')[1]
    const payload = verify(token, jwtConstants.secret)
    return payload
  }
}
