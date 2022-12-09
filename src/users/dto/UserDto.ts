import { IsNotEmpty } from "class-validator";
import { User } from "../entities/user.entity";

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



export class UserResponse{
    success:boolean;
    code:number;
    message:string;
    access_token?:string;
    user?:User
}