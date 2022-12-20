import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ScheduleModule } from "@nestjs/schedule";
import { JwtStrategy } from "../users/strategy";
import { ChatGateWay } from "./chat.gateway";
import { ChatService } from "./chat.service";


@Module({
    imports:[JwtModule.register({}),
        ScheduleModule.forRoot()],
    providers:[ChatGateWay,ChatService,JwtStrategy]
})
export class ChatModule{

}