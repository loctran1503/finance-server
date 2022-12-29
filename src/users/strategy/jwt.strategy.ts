import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { User } from '../entities/user.entity';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor( configService : ConfigService,private dataSource : DataSource) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('ACCESS_TOKEN_SECRET'),
    });
  }

  async validate(payload: {sub:string}) {

    
    const userExisting = await this.dataSource.getRepository(User).findOne({
      where:{
        userId:payload.sub
      },
    
    });
  
    if(userExisting) return userExisting
    else throw new UnauthorizedException("User not found")
 
  }
}