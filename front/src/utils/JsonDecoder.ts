import { DecoderFunction, nullable, optional, union } from 'typescript-json-decoder';
import { AppError } from './Basics';
import { Err, Ok, ResultType } from './Result';
import { Decoder, decodeType } from 'typescript-json-decoder/dist/types';

export type JsonDecoderError = AppError<'JsonDecoderError'>;

const jsonDecoderError = (message: string): JsonDecoderError => ({
    domain: 'I/O',
    message,
    name: 'JsonDecoderError',
});

export function jsonDecode<D>(decoder: DecoderFunction<D>, value: unknown): ResultType<D, JsonDecoderError> {
    try {
        return Ok(decoder(value));
    } catch (e) {
        if (e instanceof Error) {
            return Err(jsonDecoderError(e.message));
        } else {
            return Err(jsonDecoderError('Unknwon error while decoding'));
        }
    }
}

export const nullOrUndefined =
    <T extends Decoder<unknown>>(decoder: T): DecoderFunction<decodeType<T> | undefined> =>
    (data: unknown) => {
        const value = union(nullable(decoder), optional(decoder))(data);
        if (value === null || value === undefined) {
            return undefined;
        }
        return value;
    };
