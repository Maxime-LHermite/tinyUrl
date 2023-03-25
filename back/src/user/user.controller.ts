import { Controller, Get, HttpException, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { JwtUserPayload } from '../auth/jwt.auth';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getUser(@Req() request: { user: JwtUserPayload }): Promise<Omit<User, 'password'>> {
        const user = await this.userService.getUser(request.user.userId);
        if (user) {
            return { id: user.id, username: user.username };
        }
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
}
