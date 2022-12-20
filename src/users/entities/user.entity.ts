import {Entity,PrimaryGeneratedColumn,Column,CreateDateColumn, OneToMany} from 'typeorm'
import { Message } from './message.entity'

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

    @CreateDateColumn()
    createdAt:Date

    @OneToMany(() => Message,message => message.user,{nullable:true})  
    messages:Message
}