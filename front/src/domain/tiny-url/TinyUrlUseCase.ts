import { ResultType } from '../../utils/Result';
import { TinyUrlRepository, TinyUrlRepositorySpec } from './TinyUrlRepository';
import { CreateTinyUrlModel, TinyUrlModel, UpdateTinyUrlModel } from '../../models/TinyUrlModel';

export type TinyUrlUseCaseSpec = {
    create(tinyUrl: CreateTinyUrlModel): Promise<ResultType<undefined>>;
    update(tinyUrl: UpdateTinyUrlModel): Promise<ResultType<undefined>>;
    delete(tinyUrlId: string): Promise<ResultType<undefined>>;
    list(): Promise<ResultType<TinyUrlModel[]>>;
};

export class _TinyUrlUseCase implements TinyUrlUseCaseSpec {
    constructor(private readonly tinyUrlRepository: TinyUrlRepositorySpec = new TinyUrlRepository()) {}

    create = (tinyUrl: CreateTinyUrlModel): Promise<ResultType<undefined>> => {
        return this.tinyUrlRepository.create(tinyUrl);
    };

    update = (tinyUrl: UpdateTinyUrlModel): Promise<ResultType<undefined>> => {
        return this.tinyUrlRepository.update(tinyUrl);
    };

    delete = (tinyUrlId: string): Promise<ResultType<undefined>> => {
        return this.tinyUrlRepository.delete(tinyUrlId);
    };

    list = (): Promise<ResultType<TinyUrlModel[]>> => {
        return this.tinyUrlRepository.list();
    };
}

export const TinyUrlUseCase = new _TinyUrlUseCase();
