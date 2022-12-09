import { Injectable, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { DataSource } from 'typeorm';
import { CreateUserDto, UserLoginDto, UserResponse } from './dto';
import { User } from './entities/user.entity';
import { JwtGuard } from './guard';
import { Secret, verify, JwtPayload } from 'jsonwebtoken';
import { DefaultResponse } from './dto/other';

@Injectable()
export class UsersService {
  constructor(
    private dataSource: DataSource,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  //signup
  async signUp(dto: CreateUserDto, res: Response): Promise<UserResponse> {
    try {
      const userExisting = await this.dataSource
        .createQueryBuilder()
        .select('user.name')
        .from(User, 'user')
        .where('user.firebaseId=:id', { id: dto.firebaseId })
        .getOne();
      if (userExisting) {
        return {
          code: 400,
          success: false,
          message: 'User already exist',
        };
      } else {
        const newUser = await this.dataSource
          .createQueryBuilder()
          .insert()
          .into(User)
          .values({
            firebaseId: dto.firebaseId,
            name: dto.name,
            avatar: dto.avatar,
          })
          .returning('*')
          .execute();
        this.setCookie(newUser.raw.userId, res);
        return {
          code: 200,
          success: true,
          message: 'Signup Successfully!',
          access_token: await this.signToken(newUser.raw.userId, 'access'),
          user: newUser.generatedMaps[0] as User,
        };
      }
    } catch (error) {
      console.log(`user signup error: ${JSON.stringify(error)}`);

      return {
        code: 500,
        success: false,
        message: `Server Error:${JSON.stringify(error)}`,
      };
    }
  }

  //login
  async login(dto: UserLoginDto, res: Response): Promise<UserResponse> {
    try {
        const userExisting = await this.dataSource
      .createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where('user.firebaseId=:id', { id: dto.firebaseId })
      .getOne();
    if (!userExisting) {
      return {
        code: 400,
        success: false,
        message: 'User not found',
      };
    } else {
      this.setCookie(userExisting.userId, res);
      return {
        code: 200,
        success: true,
        message: 'Login Successfully!',
        access_token: await this.signToken(userExisting.userId, 'access'),
        user: userExisting,
      };
    }
    } catch (error) {
        return{
            code:500,
            success:false,
            message:`user login internal server error:${JSON.stringify(error)}`
        }
    }
  }


  logout(response : Response) : DefaultResponse {
    try {
        response.clearCookie(this.config.get('COOKIE_NAME'),{
   
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            path: '/users/checkAuth',
          })
        return{
          success:true,
          code:200,
          message:'Log out successfully!'
        }
    } catch (error) {
        console.log(`user log out server internal error:${JSON.stringify(error)}`)
        return {
          code:500,
          success:false,
          message:JSON.stringify(error)
        }
    }
  }

  @UseGuards(JwtGuard)
  async me() {}



  //Check authenticate
  async checkAuth(request: Request,response : Response) : Promise<UserResponse> {

    
    try {
        const refresh_token = request.cookies[this.config.get('COOKIE_NAME')];
        
        
        
    if(!refresh_token) return{
        code:400,
        success:false, 
        message:"Not found cookie"
    }
    const decoded = verify(
      refresh_token,
      process.env.REFRESH_TOKEN_SECRET as Secret,
    ) as JwtPayload & {
      sub: string;
    };
    if(!decoded) return{
        code:400,
        success:false,
        message:"Refresh Token invalid"
    }
    const userExisting = await this.dataSource.createQueryBuilder()
    .select('user')
    .from(User, 'user')
    .where('user.userId=:id', { id: decoded.sub })
    .getOne();
    if(!userExisting) return{
        code:400,
        success:false,
        message:"User not found"
    }
    await this.setCookie(userExisting.userId,response)
    return{
        code:200,
        success:true,
        user:userExisting,
        message:"Authenticated"
    }

    } catch (error) {
        return{
            code:500,
            success:false,
            message:`check authenticate internal server error:${JSON.stringify(error)}`
        }
    }

    
  }
  async setCookie(userId: string, res: Response) {
    const refresh_token = await this.signToken(userId, 'refresh');

    res.cookie(this.config.get('COOKIE_NAME'), refresh_token, {
   
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/users/checkAuth',
    });
  }
  signToken(userId: string, type: 'access' | 'refresh'): Promise<string> {
    try {
      const payload = {
        sub: userId,
      };
      return type === 'access'
        ? //Access Token
          this.jwt.signAsync(payload, {
            expiresIn: '1days',
            secret: this.config.get('ACCESS_TOKEN_SECRET'),
          })
        : //Reresh Token
          this.jwt.signAsync(payload, {
            expiresIn: '10days',
            secret: this.config.get('REFRESH_TOKEN_SECRET'),
          });
    } catch (error) {
      throw error;
    }
  }
}
