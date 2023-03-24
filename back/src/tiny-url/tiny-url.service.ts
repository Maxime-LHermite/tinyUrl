import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TinyUrl } from './tiny-url.entity';
import { CreateTinyUrlDto, UpdateTinyUrlDto } from './tiny-url.dto';

@Injectable()
export class TinyUrlService {
    constructor(@InjectRepository(TinyUrl) private readonly tinyUrlRepository: Repository<TinyUrl>) {}

    listUrls(userId: string) {
        return this.tinyUrlRepository.find({
            where: {
                user: {
                    id: userId,
                },
            },
        });
    }

    async generateTinyUrl(rootUrl: string, userId: string, urlId: string): Promise<string | null> {
        const url = await this.tinyUrlRepository.findOneBy({ id: urlId, user: { id: userId } });
        if (url) {
            if (url.urlName) {
                return `${rootUrl}/r/${url.urlName}`;
            } else {
                return `${rootUrl}/u/${url.id}`;
            }
        }
        return null;
    }

    createUrl(userId: string, urlDto: CreateTinyUrlDto) {
        return this.tinyUrlRepository.insert({
            user: { id: userId },
            url: urlDto.url,
            urlName: urlDto.urlName,
        });
    }

    updateUrl(userId: string, urlDto: UpdateTinyUrlDto) {
        return this.tinyUrlRepository.update(
            { id: urlDto.id, user: { id: userId } },
            {
                url: urlDto.url,
                urlName: urlDto.urlName,
            }
        );
    }

    deleteUrl(userId: string, urlId: string) {
        return this.tinyUrlRepository.delete({ id: urlId, user: { id: userId } });
    }
}
