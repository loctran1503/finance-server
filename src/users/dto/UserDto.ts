import { IsNotEmpty } from "class-validator";
import { User } from "../entities/user.entity";
import { DefaultResponse } from "./other";

export class CreateUserDto{
    @IsNotEmpty()
    firebaseId:string;
    @IsNotEmpty()
    avatar:string;
    @IsNotEmpty()
    name:string;
}

export class MessagePaginateDto{
    timestamp?:Date

}

export class UserLoginDto{
    @IsNotEmpty()
    firebaseId:string
}



 interface MessageIO{
    content:string,
    timestamp:Date,
    messageId:string
    user:{
        userId:string
        name:string,
        avatar:string
    }
}

export interface MessageResponse extends DefaultResponse{
    messageList?:MessageIO[],
    hasMore?:boolean
}

export interface UserResponse extends DefaultResponse{

    access_token?:string;
    user?:User
}