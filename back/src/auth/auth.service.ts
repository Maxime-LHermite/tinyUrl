import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private jwtService: JwtService) {}
    async validateUser(username: string, password: string): Promise<any> {
        const userPassword = await this.userService.getUserPassword(username);
        if (!userPassword) {
            return null;
        }
        const passwordValid = await bcrypt.compare(password, userPassword);
        if (passwordValid) {
            return { username, userPassword };
        }
        return null;
    }
    async login(username: string): Promise<{ access_token: string } | null> {
        const userId = await this.userService.getUserId(username);
        if (userId) {
            return {
                access_token: this.jwtService.sign({ username: username, id: userId }),
            };
        } else {
            return null;
        }
    }
}
