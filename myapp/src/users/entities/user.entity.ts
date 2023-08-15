import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    firstname:string;
    @Column()
    lastname:string;
    @Column()
    username:string;
    @Column()
    email:string;
    @Column()
    password:string;
    @CreateDateColumn()
    createdAt:Date;


}