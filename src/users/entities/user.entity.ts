import {Entity,PrimaryGeneratedColumn,Column,CreateDateColumn} from 'typeorm'

@Entity()
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
}