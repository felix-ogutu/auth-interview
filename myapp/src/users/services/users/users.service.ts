import {BadRequestException, ConflictException, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "../../entities/user.entity";
import {Repository} from "typeorm";
import {CreateUserDto} from "../../dtos/create.user.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor( @InjectRepository(UserEntity)
                 private usersEntityRepository: Repository<UserEntity>) {
    }

    //Method to register user
    //Create User Method
    async postUser(userDetails: CreateUserDto) {
        const{password,confirmPassword,...otherDetails}=userDetails;


        //Check if the user with the same email exist
        const user=await this.findUserByEmail(userDetails.email)
        if (user) {
            throw new ConflictException('User with the same email already exists');
        }

        //Hashed the password
        const hashedPassword = await bcrypt.hash(password, 10);

        //Check if the password and confirm password matches
        if (password !== confirmPassword) {
            throw new BadRequestException(
                'Password and confirm password do not match',
            );
        }

        const newUser = this.usersEntityRepository.create({
            ...otherDetails,
            password: hashedPassword,
            createdAt: new Date(),
        });
        //Save the new user to the database;

        return await this.usersEntityRepository.save(newUser);

    }


    async findUserByEmail(email: string) {
        return await this.usersEntityRepository.findOne({where:{email}});
        
    }

    //Find all the users
    async findAllUsers(){
        return await this.usersEntityRepository.find()
    }
}
