import {Entity,PrimaryGeneratedColumn,Column,CreateDateColumn, OneToMany, ManyToOne, PrimaryColumn} from 'typeorm'
import { Message } from '../../messages/entities/message.entity'
import { User } from '../../users/entities/user.entity'

@Entity({name:'user-event'})
export class UserEvent{
    @PrimaryGeneratedColumn("uuid")
    eventId:string

    @Column({type:"float"})
    porfolio:number;

    @Column()  
    description:string

    



    @CreateDateColumn()
    createdAt:Date

    @ManyToOne(() => User,user => user.events)  
    user:User
}