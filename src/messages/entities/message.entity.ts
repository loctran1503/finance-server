import {Entity,PrimaryGeneratedColumn,Column,CreateDateColumn, ManyToOne} from 'typeorm'
import { User } from '../../users/entities/user.entity'

@Entity({name:'messages'})
export class Message{
    @PrimaryGeneratedColumn("uuid")
    messageId:string


    @ManyToOne(() => User,user => user.messages)  
    user:User

    @Column()
    content:string

    @CreateDateColumn({type:'timestamp with time zone'})
    timestamp:Date
}