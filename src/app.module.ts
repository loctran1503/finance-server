import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './db/data-source';

import { UsersModule } from './users/users.module';

import { ChatModule } from './chat/chat.module';
import { MarketModule } from './market/market.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoinsModule } from './coins/coins.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal:true}),
            TypeOrmModule.forRootAsync(dataSourceOptions),
            UsersModule,
            ChatModule,
            MarketModule,
            CoinsModule,
            MessagesModule

    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
