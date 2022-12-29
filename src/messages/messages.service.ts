import { Injectable } from '@nestjs/common';
import { MESSAGE_LIMIT } from 'src/utils/constants';
import { DataSource, FindManyOptions, LessThan } from 'typeorm';
import { MessagePaginateDto, MessageResponse } from './dto';

import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  constructor(private dataSource : DataSource){}
 

  async findAll(dto: MessagePaginateDto): Promise<MessageResponse> {
    try {
    
      let findOptions : FindManyOptions<Message> = {
        where: {},
        order:{
          timestamp:'DESC'
        },
        take:MESSAGE_LIMIT,
        relations:{
          user:true
        },
      };
      if (dto.timestamp)
        findOptions.where = {
          timestamp: LessThan(dto.timestamp),
        };

      const messageList = await this.dataSource
        .getRepository(Message)
        .find(findOptions);
   

      const firstMessage = await this.dataSource.getRepository(Message).find({
        take:1,
        order:{
          timestamp:'ASC'
        }
      })

      let hasMore : boolean
      
      
      if(dto.timestamp){
        hasMore= new Date(dto.timestamp).valueOf()!==new Date(firstMessage[0].timestamp).valueOf()
      }else{
        hasMore=messageList.length>=MESSAGE_LIMIT
      }

      
        
      return {
        code: 200,
        success: true,
        message: 'get all user message successfully!',
        messageList,
        hasMore:true
      };
    } catch (error) {
      console.log("get message list server internal error");
      
      console.log(error);
      
      

      return {
        code: 500,
        success: false,
        message: JSON.stringify(error),
      };
    }
  }

 
}
