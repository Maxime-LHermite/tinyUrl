import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Patch,
    Put,
    Req,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TinyUrl } from './tiny-url.entity';
import { TinyUrlService } from './tiny-url.service';
import { JwtUserPayload } from '../auth/jwt.auth';
import { CreateTinyUrlDto, UpdateTinyUrlDto } from './tiny-url.dto';
import { Request } from 'express';

@Controller('tiny-url')
export class TinyUrlController {
    constructor(private readonly tinyUrlService: TinyUrlService) {}

    private getRootUrl(req: Request) {
        return `${req.protocol}://${req.get('Host')}`;
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    getUrls(@Req() req: { user: JwtUserPayload } & Request): Promise<Omit<TinyUrl & { tinyUrl: string }, 'user'>[]> {
        return this.tinyUrlService.listUrls(this.getRootUrl(req), req.user.userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    async generateUrl(@Req() req: { user: JwtUserPayload } & Request, @Param('id') urlId: string): Promise<string> {
        const url = await this.tinyUrlService.generateTinyUrl(this.getRootUrl(req), req.user.userId, urlId);
        if (url) {
            return url;
        }
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put()
    @UsePipes(ValidationPipe)
    async createUrl(@Req() req: { user: JwtUserPayload }, @Body() urlDto: CreateTinyUrlDto): Promise<void> {
        const result = await this.tinyUrlService.createUrl(req.user.userId, urlDto);
        if (!result) {
            throw new HttpException('Unknown Error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch()
    @UsePipes(ValidationPipe)
    async updateUrl(@Req() req: { user: JwtUserPayload }, @Body() urlDto: UpdateTinyUrlDto): Promise<void> {
        const result = await this.tinyUrlService.updateUrl(req.user.userId, urlDto);
        if (!result || !result.affected || result.affected < 1) {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    @UsePipes(ValidationPipe)
    async deleteUrl(@Req() req: { user: JwtUserPayload }, @Param('id') urlId: string): Promise<void> {
        const result = await this.tinyUrlService.deleteUrl(req.user.userId, urlId);
        if (!result || !result.affected || result.affected < 1) {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
    }
}
