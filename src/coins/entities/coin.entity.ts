import {Entity,PrimaryGeneratedColumn,Column,CreateDateColumn, OneToMany, ManyToOne, PrimaryColumn} from 'typeorm'
import { Message } from '../../messages/entities/message.entity'
import { User } from '../../users/entities/user.entity'

@Entity({name:'user-coin'})
export class UserCoin{
    @PrimaryGeneratedColumn("uuid")
    id:string

    @Column()  
    coinId:string

    @Column()  
    name:string

    @Column()  
    symbol:string

    @Column()
    avatar:string

    @Column({type:"float"})
    amount:number;



    @CreateDateColumn()
    createdAt:Date

    @ManyToOne(() => User,user => user.coins)  
    user:User
}