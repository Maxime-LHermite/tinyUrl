import { DecoderFunction } from 'typescript-json-decoder';
import { AppError } from './Basics';
import { Err, Ok, ResultType } from './Result';

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
