import { Err, Ok, ResultType } from '../../utils/Result';
import { UserModel } from '../../models/UserModel';
import { AuthenticationRepository, AuthenticationRepositorySpec } from './AuthenticationRepository';
import { JWT_TOKEN_STORAGE } from '../../constants';

export type AuthenticationUseCaseSpec = {
    login(username: string, password: string): Promise<ResultType<UserModel>>;
    register(username: string, password: string): Promise<ResultType<UserModel>>;
    logout(): void;
    reauthenticate(): Promise<ResultType<UserModel>>;
};
class _AuthenticationUseCase implements AuthenticationUseCaseSpec {
    constructor(private readonly authRepository: AuthenticationRepositorySpec = new AuthenticationRepository()) {}

    login = async (username: string, password: string): Promise<ResultType<UserModel>> => {
        const result = await this.authRepository.login(username, password);
        switch (result.status) {
            case 'Ok': {
                const { token, ...user } = result.data;
                localStorage.setItem(JWT_TOKEN_STORAGE, token);
                return Ok(user);
            }
            case 'Err':
                return Err(undefined);
        }
    };

    register = async (username: string, password: string): Promise<ResultType<UserModel>> => {
        const result = await this.authRepository.register(username, password);
        switch (result.status) {
            case 'Ok': {
                return await this.login(username, password);
            }
            case 'Err':
                return Err(undefined);
        }
    };

    logout = (): void => {
        localStorage.removeItem(JWT_TOKEN_STORAGE);
        this.authRepository.reauthenticate('');
    };

    reauthenticate = async (): Promise<ResultType<UserModel>> => {
        const token = localStorage.getItem(JWT_TOKEN_STORAGE);
        if (token) {
            this.authRepository.reauthenticate(token);
            const result = await this.authRepository.getUser();
            switch (result.status) {
                case 'Ok': {
                    return Ok(result.data);
                }
                case 'Err':
                    return Err(undefined);
            }
        }
        return Err(undefined);
    };
}

export const AuthenticationUseCase = new _AuthenticationUseCase();
