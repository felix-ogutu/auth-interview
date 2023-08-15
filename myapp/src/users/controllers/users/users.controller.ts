import {BadRequestException, Body, Controller, Get, Post, ValidationPipe} from '@nestjs/common';
import {UsersService} from "../../services/users/users.service";
import {CreateUserDto} from "../../dtos/create.user.dto";

@Controller('users')
export class UsersController {
    constructor(private usersService:UsersService) {
    }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        const user = await this.usersService.postUser(createUserDto);
        try {
            return {
                Message: `${createUserDto.username} is registered Successfully`,
                Data: user,
            };
        } catch (error) {
            throw new BadRequestException('Something happens');
        }
    }

    @Get()
    async getUsers() {
        try {
            const users = await this.usersService.findAllUsers();
            return {
                message: `Users are retrieved successfully`,
                data: users,
            };
        } catch (error) {
            throw new BadRequestException('Something Happens');
        }
    }

}
