import {Entity,PrimaryGeneratedColumn,Column,CreateDateColumn, ManyToOne} from 'typeorm'
import { User } from './user.entity'

@Entity()
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