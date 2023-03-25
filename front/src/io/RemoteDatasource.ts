import axios, { AxiosRequestConfig, Method } from 'axios';
import { Err, Ok, ResultType } from '../utils/Result';
import { number, record, string } from 'typescript-json-decoder';
import { REMOTE_BASE_URL } from '../constants';

export type RemoteErrorResponse = {
    statusCode: number;
    message: string;
};

export type RemoteDatasourceSpec = {
    setToken: (token: string) => void;

    request: (
        method: Method,
        path: string,
        options?: Pick<AxiosRequestConfig, 'data' | 'auth' | 'params'>
    ) => Promise<ResultType<unknown, RemoteErrorResponse>>;
};

export class _RemoteDatasource implements RemoteDatasourceSpec {
    constructor(
        private axiosInstance = axios.create({
            baseURL: REMOTE_BASE_URL,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
    ) {}

    setToken(token: string) {
        this.axiosInstance = axios.create({
            baseURL: REMOTE_BASE_URL,
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
    }

    async request(
        method: Method,
        path: string,
        options: Pick<AxiosRequestConfig, 'data' | 'auth' | 'params'> = {}
    ): Promise<ResultType<unknown, RemoteErrorResponse>> {
        try {
            const response = await this.axiosInstance.request<unknown>({ method, url: path, ...options });
            if (response.status >= 200 && response.status < 300) {
                return Ok(response.data);
            } else {
                return Err(
                    record({
                        statusCode: number,
                        message: string,
                    })(response.data)
                );
            }
        } catch (e) {
            return Err({
                statusCode: 400,
                message: 'Unkown Error',
            });
        }
    }
}

export const RemoteDatasource = new _RemoteDatasource();
