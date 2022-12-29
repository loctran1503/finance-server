import { Module } from '@nestjs/common';
import { CoinsService } from './coins.service';
import { CoinsGateWay } from './coins.gateway';
import { CoinsController } from './coins.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../users/strategy';

@Module({
  imports: [JwtModule.register({})],
  controllers: [CoinsController],
  providers: [CoinsGateWay, CoinsService, JwtStrategy],
})
export class CoinsModule {}
