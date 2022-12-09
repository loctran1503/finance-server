import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './db/data-source';






import { UsersModule } from './users/users.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal:true}),
            TypeOrmModule.forRootAsync(dataSourceOptions),
            UsersModule,

    ],
  controllers: [],
  providers: [],
})
export class AppModule {}
