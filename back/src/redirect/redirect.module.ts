import { Module } from '@nestjs/common';
import { RedirectController } from './redirect.controller';
import { RedirectService } from './redirect.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TinyUrl } from '../tiny-url/tiny-url.entity';

@Module({
    imports: [TypeOrmModule.forFeature([TinyUrl])],
    controllers: [RedirectController],
    providers: [RedirectService],
})
export class RedirectModule {}
