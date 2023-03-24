import { Module } from '@nestjs/common';
import { TinyUrlService } from './tiny-url.service';
import { TinyUrlController } from './tiny-url.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TinyUrl } from './tiny-url.entity';

@Module({
    imports: [TypeOrmModule.forFeature([TinyUrl])],
    providers: [TinyUrlService],
    controllers: [TinyUrlController],
})
export class TinyUrlModule {}
