import {BadRequestException, Injectable} from '@nestjs/common';
import {UsersService} from "../../../users/services/users/users.service";
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(private usersService:UsersService, private jwtService: JwtService,) {
    }
    async validateUser(email: string, pass: string) {
        const user = await this.usersService.findUserByEmail(email);
        if (user) {
            const passwordMatch = await bcrypt.compare(pass, user.password);
            if (passwordMatch) {
                const { password, ...result } = user;
                return result;
            } else {
                throw new BadRequestException('Incorrect password');
            }
        } else {
            throw new BadRequestException('Incorrect email');
        }
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        return {
            message: `User is logged in Successfully`,
            access_token: this.jwtService.sign(payload),
        };
    }
}
