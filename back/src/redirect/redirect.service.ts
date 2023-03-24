import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TinyUrl } from '../tiny-url/tiny-url.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RedirectService {
    constructor(@InjectRepository(TinyUrl) private readonly tinyUrlRepository: Repository<TinyUrl>) {}

    getUrlByName(urlName: string) {
        return this.tinyUrlRepository.findOneBy({ urlName });
    }

    getUrlById(urlId: string) {
        return this.tinyUrlRepository.findOneBy({ id: urlId });
    }
}
