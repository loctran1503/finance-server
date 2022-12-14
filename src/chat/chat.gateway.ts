import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets/decorators';

import { JwtPayload, Secret, verify } from 'jsonwebtoken';
import { Server, Socket } from 'socket.io';
import { User } from 'src/users/entities/user.entity';
import { isProduction } from 'src/utils/constants';
import { DataSource } from 'typeorm';
import { ChatService } from './chat.service';
import 'dotenv/config'
@WebSocketGateway({
  transports:['websocket'],
  cors: {
    origin:isProduction ? process.env.CORS_PROD : process.env.CORS_DEV
  },
  namespace:'finance/api',
  path:'/finance/api/socket.io'
})
export class ChatGateWay implements OnGatewayInit, OnGatewayDisconnect {
  @WebSocketServer() socket: Server;
  constructor(
    private chatService: ChatService,
    private dataSource: DataSource,
    private config: ConfigService,
  ) {}
  listenForMessages() {
    this.socket.on('connection', (ws) => {
      console.log(ws.id, 'is connecting.....');
    });
  }
  afterInit(socket: Server) {
    this.listenForMessages();
  }
  handleDisconnect(@ConnectedSocket() client: any) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('client-send-message')
  async test(
    @MessageBody('message') message: string,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const token = client.handshake.auth.token;

      const decoded = verify(
        token,
        this.config.get('ACCESS_TOKEN_SECRET'),
      ) as JwtPayload & { sub: string };
      if (decoded.sub) {
        const userExisting = await this.dataSource
          .createQueryBuilder()
          .select('user')
          .from(User, 'user')
          .where('user.userId=:id', { id: decoded.sub })
          .getOne();
        if (!userExisting) throw new UnauthorizedException('user not found');

          
          

        const result = this.socket.emit('server-send-message', {
          ...userExisting,
          message,
          timestamp: this.formatDate(new Date()),
        });
     
        
      }
    } catch (error) {
      console.log(
        `Chat.gateway.ts - client-send-message error:${JSON.stringify(error)}`,
      );
    }
  }

  formatDate(date : Date) {
    return [
      this.padTo2Digits(date.getDate()),
      this.padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('/');
  }
   padTo2Digits(num : number) {
    return num.toString().padStart(2, '0');
  }
}
