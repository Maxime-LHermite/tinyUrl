import { Err, Ok, ResultType } from '../../utils/Result';
import { RemoteDatasource, RemoteDatasourceSpec } from '../../io/RemoteDatasource';
import { field, record, string } from 'typescript-json-decoder';
import { UserModel } from '../../models/UserModel';

export type AuthenticationRepositorySpec = {
    login(username: string, password: string): Promise<ResultType<{ token: string } & UserModel>>;
    register(username: string, password: string): Promise<ResultType<string>>;
    getUser(): Promise<ResultType<UserModel>>;
    reauthenticate(token: string): void;
};

export class AuthenticationRepository implements AuthenticationRepositorySpec {
    constructor(private readonly dataSource: RemoteDatasourceSpec = RemoteDatasource) {}

    async login(username: string, password: string): Promise<ResultType<{ token: string } & UserModel>> {
        const result = await this.dataSource.request('post', 'auth/login', {
            data: { username, password },
        });
        try {
            switch (result.status) {
                case 'Ok': {
                    const data = record({
                        token: field('access_token', string),
                        username: string,
                        id: field('userId', string),
                    })(result.data);
                    this.dataSource.setToken(data.token);
                    return Ok(data);
                }
                case 'Err':
                    return Err(undefined);
            }
        } catch (e) {
            console.warn(e);
            return Err(undefined);
        }
    }

    async register(username: string, password: string): Promise<ResultType<string>> {
        const result = await this.dataSource.request('post', 'auth/signup', {
            data: { username, password },
        });
        try {
            switch (result.status) {
                case 'Ok': {
                    return Ok(string(result.data));
                }
                case 'Err':
                    return Err(undefined);
            }
        } catch (e) {
            return Err(undefined);
        }
    }
    async getUser(): Promise<ResultType<UserModel>> {
        const result = await this.dataSource.request('get', 'user');
        try {
            switch (result.status) {
                case 'Ok': {
                    return Ok(
                        record({
                            username: string,
                            id: string,
                        })(result.data)
                    );
                }
                case 'Err':
                    return Err(undefined);
            }
        } catch (e) {
            return Err(undefined);
        }
    }

    reauthenticate(token: string) {
        this.dataSource.setToken(token);
    }
}
