import { DefaultResponse } from "../../users/dto/other"

export class MessagePaginateDto{
    timestamp?:Date

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