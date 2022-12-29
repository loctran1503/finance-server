import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets/decorators';

import 'dotenv/config';
import { JwtPayload, verify } from 'jsonwebtoken';
import { Server, Socket } from 'socket.io';
import { User } from 'src/users/entities/user.entity';
import { isProduction } from 'src/utils/constants';
import { DataSource } from 'typeorm';


import { Cron, CronExpression } from '@nestjs/schedule';
import { Message } from '../messages/entities/message.entity';
import MessageBlocker from '../utils/MessageBlocker';
import SocketManager from '../utils/SocketManager';

@WebSocketGateway({
  transports: ['websocket'],
  cors: {
    origin: isProduction ? process.env.CORS_PROD : process.env.CORS_DEV,
  },
  namespace: 'finance/api/coins',
  path: '/finance/api/coins/socket.io',
})
export class CoinsGateWay implements OnGatewayInit, OnGatewayDisconnect {
  
  @WebSocketServer() socket: Server;
  constructor(
 
    private dataSource: DataSource,
    private config: ConfigService,
  ) {}
  listenForMessages() {
    this.socket.on('connection', (ws) => {
      //console.log(ws.id, 'is connecting.....');
    });
  }
  afterInit(socket: Server) {
    this.listenForMessages();
  }
  handleDisconnect(@ConnectedSocket() client: any) {
    const result = SocketManager.deleteSocket(client.id);
    console.log('Clients disconect coins gateway...');

    console.log(result);
  }

  @SubscribeMessage('client-send-indentify')
  async clientSendIndentify(
    @MessageBody('name') name: string,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const result = SocketManager.insertSocket({
        name,
        socketId: client.id,
      });
      console.log('Client-connecting...');

      console.log(result);
    } catch (error) {
      console.log(
        `Chat.gateway.ts - client-send-identify error:${JSON.stringify(error)}`,
      );
    }
  }

  @SubscribeMessage('client-convert-usd-to-usdt')
  async convertToUsdt(
    @MessageBody('amount') amount: number,
    @ConnectedSocket() client: Socket,
  ) {
    try {

      if(typeof amount !=='number') throw new Error('usd type not valid')

      const token = client.handshake.auth.token;

      const decoded = verify(
        token,
        this.config.get('ACCESS_TOKEN_SECRET'),
      ) as JwtPayload & { sub: string };
      if (!decoded.sub) throw new Error('decoded.sub not found')
      const userExisting = await this.dataSource
          .createQueryBuilder()
          .select('users')
          .from(User, 'users')
          .where('users.userId=:id', { id: decoded.sub })
          .getOne();
        if (!userExisting) throw new UnauthorizedException('user not found');
      
      
     

    } catch (error) {
      console.log(
        `Chat.gateway.ts - client-send-message error:${JSON.stringify(error)}`,
      );
    }
  }

}
