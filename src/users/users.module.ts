import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports:[JwtModule.register({})],
  controllers: [UsersController],
  providers: [UsersService,JwtStrategy]
})
export class UsersModule {}
