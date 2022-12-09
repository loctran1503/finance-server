import { Body, Controller, Post, UseGuards, Res, Req } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto, UserLoginDto } from './dto';
import { JwtGuard } from './guard';
import { UsersService } from './users.service';
import { Request, Response } from 'express';

@Controller('users')
export class UsersController {
    constructor(private userService : UsersService,private config : ConfigService){}

    @Post('signup')
    signUp(@Body() dto : CreateUserDto,@Res({ passthrough: true }) response: Response){
        return this.userService.signUp(dto,response)
    }

    @Post('login')
    login(@Body() dto : UserLoginDto,@Res({ passthrough: true }) response: Response){
        return this.userService.login(dto,response)
    }

    @Post('checkAuth')
    checkAuth(@Req() request: Request,@Res({ passthrough: true }) response: Response){
        return this.userService.checkAuth(request,response)
    }

    @Post('logout')
    logout(@Res({ passthrough: true }) response: Response){
        return this.userService.logout(response)
    }

    // @Post('me')
    // // @UseGuards(JwtGuard)
    // me(@Request() req){
        
    //     return req.user
    // }
}
