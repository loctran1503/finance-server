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

export class UserLoginDto{
    @IsNotEmpty()
    firebaseId:string
}

export interface UserListResponse extends DefaultResponse{
    userList?:User[]
}

export interface UserResponse extends DefaultResponse{
    access_token?:string;
    user?:User
}