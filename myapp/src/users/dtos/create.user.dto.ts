import {IsEmail, IsNotEmpty, IsString} from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    firstname:string;
    @IsString()
    @IsNotEmpty()
    lastname:string;
    @IsNotEmpty()
    username:string;
    @IsEmail()
    @IsNotEmpty()
    email:string;
    @IsNotEmpty()
    password:string;
    @IsNotEmpty()
    confirmPassword:string;
}