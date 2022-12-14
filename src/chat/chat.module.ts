import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "../users/strategy";
import { ChatGateWay } from "./chat.gateway";
import { ChatService } from "./chat.service";


@Module({
    imports:[JwtModule.register({})],
    providers:[ChatGateWay,ChatService,JwtStrategy]
})
export class ChatModule{

}