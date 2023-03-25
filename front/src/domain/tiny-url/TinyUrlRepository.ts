import { Err, Ok, ResultType } from '../../utils/Result';
import { RemoteDatasource, RemoteDatasourceSpec } from '../../io/RemoteDatasource';
import { array, record, string } from 'typescript-json-decoder';
import { CreateTinyUrlModel, TinyUrlModel, UpdateTinyUrlModel } from '../../models/TinyUrlModel';
import { nullOrUndefined } from '../../utils/JsonDecoder';

export type TinyUrlRepositorySpec = {
    create(tinyUrl: CreateTinyUrlModel): Promise<ResultType<undefined>>;
    update(tinyUrl: UpdateTinyUrlModel): Promise<ResultType<undefined>>;
    delete(tinyUrlId: string): Promise<ResultType<undefined>>;
    list(): Promise<ResultType<TinyUrlModel[]>>;
};

export class TinyUrlRepository implements TinyUrlRepositorySpec {
    constructor(private readonly dataSource: RemoteDatasourceSpec = RemoteDatasource) {}

    async create(tinyUrl: CreateTinyUrlModel): Promise<ResultType<undefined>> {
        const result = await this.dataSource.request('put', 'tiny-url', {
            data: tinyUrl,
        });
        switch (result.status) {
            case 'Ok': {
                return Ok(undefined);
            }
            case 'Err':
                return Err(undefined);
        }
    }

    async update(tinyUrl: UpdateTinyUrlModel): Promise<ResultType<undefined>> {
        const result = await this.dataSource.request('patch', 'tiny-url', {
            data: tinyUrl,
        });

        switch (result.status) {
            case 'Ok': {
                return Ok(undefined);
            }
            case 'Err':
                return Err(undefined);
        }
    }

    async delete(tinyUrlId: string): Promise<ResultType<undefined>> {
        const result = await this.dataSource.request('delete', `tiny-url/${tinyUrlId}`);
        switch (result.status) {
            case 'Ok': {
                return Ok(undefined);
            }
            case 'Err':
                return Err(undefined);
        }
    }

    async list(): Promise<ResultType<TinyUrlModel[]>> {
        const result = await this.dataSource.request('get', 'tiny-url');
        try {
            switch (result.status) {
                case 'Ok': {
                    return Ok(
                        array(
                            record({
                                id: string,
                                url: string,
                                urlName: nullOrUndefined(string),
                                tinyUrl: string,
                            })
                        )(result.data)
                    );
                }
                case 'Err':
                    return Err(undefined);
            }
        } catch (e) {
            console.warn(e);
            return Err(undefined);
        }
    }
}
