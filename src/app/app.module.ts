import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../db/data-source';

import { UsersModule } from '../users/users.module';

import { ChatModule } from '../chat/chat.module';
import { MarketModule } from '../market/market.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ConfigModule.forRoot({isGlobal:true}),
            TypeOrmModule.forRootAsync(dataSourceOptions),
            UsersModule,
            ChatModule,
            MarketModule,

    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
