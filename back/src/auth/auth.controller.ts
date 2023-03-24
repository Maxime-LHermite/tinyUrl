import { Controller, Post, UseGuards, Body, ValidationPipe, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from '../user/user.dto';
import { User } from '../user/user.entity';
import { hash } from 'bcrypt';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private userService: UserService) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    @UsePipes(ValidationPipe)
    async login(@Body() user: UserDto) {
        return this.authService.login(user.username);
    }

    @Post('signup')
    @UsePipes(ValidationPipe)
    async createUser(@Body() user: UserDto): Promise<string> {
        const hashedPassword = await hash(user.password, 10);
        const createsUser = await this.userService.createUser({ username: user.username, password: hashedPassword });
        return createsUser.username;
    }
}
