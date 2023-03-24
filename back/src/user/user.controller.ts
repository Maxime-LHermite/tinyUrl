import { Controller, Get, HttpException, HttpStatus, Param, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { JwtUserPayload } from '../auth/jwt.auth';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseGuards(AuthGuard('jwt'))
    @Get('id/:id')
    async getUser(@Req() request: { user: JwtUserPayload }, @Param('id') id: string): Promise<Omit<User, 'password'>> {
        const user = await this.userService.getUser(id);
        if (user) {
            if (user.id !== request.user.userId) {
                throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
            }
            return { id: user.id, username: user.username };
        }
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('name/:name')
    async getName(@Req() request: { user: JwtUserPayload }, @Param('name') name: string): Promise<Omit<User, 'password'>> {
        const userId = await this.userService.getUserId(name);
        if (userId) {
            if (userId !== request.user.userId) {
                throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
            }
            return { id: userId, username: name };
        }
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
}
