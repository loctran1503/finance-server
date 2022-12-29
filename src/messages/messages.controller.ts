import { Body, Controller, Get, Post } from '@nestjs/common';
import { MessagePaginateDto } from './dto';
import { MessagesService } from './messages.service';


@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

 

  @Post('findAll')
  findAll(@Body() dto: MessagePaginateDto) {
    return this.messagesService.findAll(dto);
  }


}
