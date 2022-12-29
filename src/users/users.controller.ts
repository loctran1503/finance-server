import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { CreateUserDto, UserLoginDto } from './dto';
import { JwtGuard } from './guard';
import { UsersService } from './users.service';

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

    @Post('findAll')
    findAll(){
        return this.userService.findAll()
    }

    @Post('me')
    @UseGuards(JwtGuard)
    me(@Req() req){
        
        return req.headers
    }
}
