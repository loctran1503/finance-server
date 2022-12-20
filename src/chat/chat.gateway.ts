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

import SocketManager from '../utils/SocketManager';
import { Message } from '../users/entities/message.entity';
import MessageBlocker from '../utils/MessageBlocker';
import { Cron, CronExpression } from '@nestjs/schedule';
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
      //console.log(ws.id, 'is connecting.....');
    });
  }
  afterInit(socket: Server) {
    this.listenForMessages();
  }
  handleDisconnect(@ConnectedSocket() client: any) {
   
    const result = SocketManager.deleteSocket(client.id)
    console.log('Clients disconect...');
    
    console.log(result);
    
  }

  @SubscribeMessage('client-send-indentify')
  async clientSendIndentify(@MessageBody('name') name: string,@ConnectedSocket() client: Socket){
    try {
      const result = SocketManager.insertSocket({
        name,
        socketId:client.id
      })
      console.log('Client-connecting...');
      
      console.log(result);
      
    } catch (error) {
      console.log(`Chat.gateway.ts - client-send-identify error:${JSON.stringify(error)}`);
      
    }
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
          .select('users')
          .from(User, 'users')
          .where('users.userId=:id', { id: decoded.sub })
          .getOne();
        if (!userExisting) throw new UnauthorizedException('user not found');

       

        //Check is blocking
        const timestampBlocking = MessageBlocker.findUserIsBlocking(userExisting.userId)
        if(timestampBlocking===0) throw new Error('User Is Blocking...,Can not send message')

       
        const newMessage = await this.dataSource.createQueryBuilder().insert().into(Message).values({
          content:message,
          user:userExisting
        }).returning(['messageId','content','timestamp']).execute()

        const messageForClient = {
          ...newMessage.generatedMaps[0],
          user:{
            userId:userExisting.userId,
            name:userExisting.name,
            avatar:userExisting.avatar
          },
          timestampBlocking
        }
        this.socket.emit('server-send-message', messageForClient);
      }
    } catch (error) {
      console.log(
        `Chat.gateway.ts - client-send-message error:${JSON.stringify(error)}`,
      );
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_3PM)
  async handleDeleteMessage(){
    try {
      await this.dataSource.getRepository(Message).clear()
    } catch (error) {
      console.log(`handleDeleteMessage Interal Server Error: ${JSON.stringify(error)}`);
      
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
