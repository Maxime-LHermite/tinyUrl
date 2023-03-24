import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { RedirectService } from './redirect.service';

@Controller()
export class RedirectController {
    constructor(private readonly redirectionService: RedirectService) {}

    @Get('r/:urlName')
    async redirectUrlName(@Res() res: Response, @Param('urlName') urlName: string) {
        const url = await this.redirectionService.getUrlByName(urlName);
        if (url) {
            res.redirect(url.url);
        }
        return `No mapped url found for path: ${urlName}`;
    }

    @Get('u/:urlId')
    async redirectUrlId(@Res() res: Response, @Param('urlId') urlId: string) {
        const url = await this.redirectionService.getUrlById(urlId);
        if (url) {
            res.redirect(url.url);
        }
        return `No mapped url found for path: ${urlId}`;
    }
}
