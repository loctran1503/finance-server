import { UserEvent } from 'src/coins/entities/event.entity'
import {Entity,PrimaryGeneratedColumn,Column,CreateDateColumn, OneToMany} from 'typeorm'
import { UserCoin } from '../../coins/entities/coin.entity'
import { Message } from '../../messages/entities/message.entity'

@Entity({name:'users'})
export class User{
    @PrimaryGeneratedColumn("uuid")
    userId:string

    @Column({unique:true,select:false})
    firebaseId:string

    @Column()  
    name:string

    @Column()
    avatar:string

    @Column({type:"float",default:100000})
    usd:number;

    @Column({type:"float",default:0})
    usdt:number;

    @CreateDateColumn()
    createdAt:Date

    @OneToMany(() => Message,message => message.user,{nullable:true})  
    messages:Message

    @OneToMany(() => UserCoin,coin => coin.user,{nullable:true})  
    coins:UserCoin

    @OneToMany(() => UserEvent,event => event.user,{nullable:true})  
    events:UserEvent
}