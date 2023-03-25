import { Optional } from '../utils/Basics';

export type TinyUrlModel = {
    id: string;
    url: string;
    urlName?: string;
    tinyUrl: string;
};

export type CreateTinyUrlModel = Omit<TinyUrlModel, 'id' | 'tinyUrl'>;
export type UpdateTinyUrlModel = Omit<Optional<TinyUrlModel, 'url'>, 'tinyUrl'>;
