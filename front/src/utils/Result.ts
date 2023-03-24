import Maybe, { Just, MaybeType, Nothing } from './Maybe';

export type ResultType<D, E> = { status: 'Ok'; data: D } | { status: 'Err'; error: E };

export const Ok = <D, E>(data: D): ResultType<D, E> => ({ status: 'Ok', data });
export const Err = <D, E>(error: E): ResultType<D, E> => ({ status: 'Err', error });

export default {
    fromJs: <D>(maybeUndefined: D | undefined): ResultType<D, undefined> => (maybeUndefined ? Ok(maybeUndefined) : Err(undefined)),

    toMaybe: <D, E>(result: ResultType<D, E>): MaybeType<D> => {
        switch (result.status) {
            case 'Ok':
                return Just(result.data);
            case 'Err':
                return Nothing();
        }
    },

    fromMaybe: <D, E>(maybe: MaybeType<D>, error: E): ResultType<D, E> => {
        return Maybe.withDefault(
            Err(error),
            Maybe.map((value) => Ok(value), maybe)
        );
    },

    map: <D1, D2, E>(map: (d: D1) => D2, result: ResultType<D1, E>): ResultType<D2, E> => {
        switch (result.status) {
            case 'Ok':
                return Ok(map(result.data));
            case 'Err':
                return Err(result.error);
        }
    },

    mapError: <D, E1, E2>(map: (d: E1) => E2, result: ResultType<D, E1>): ResultType<D, E2> => {
        switch (result.status) {
            case 'Ok':
                return Ok(result.data);
            case 'Err':
                return Err(map(result.error));
        }
    },

    map2: <D1, D2, D3, E1, E2>(map: (d1: D1, d2: D2) => D3, result1: ResultType<D1, E1>, result2: ResultType<D2, E2>): ResultType<D3, E1 | E2> => {
        switch (result1.status) {
            case 'Ok':
                return ((): ResultType<D3, E2> => {
                    switch (result2.status) {
                        case 'Ok':
                            return Ok(map(result1.data, result2.data));
                        case 'Err':
                            return Err(result2.error);
                    }
                })();
            case 'Err':
                return Err(result1.error);
        }
    },

    andThen: <D1, D2, E>(map: (d: D1) => ResultType<D2, E>, result: ResultType<D1, E>): ResultType<D2, E> => {
        switch (result.status) {
            case 'Ok':
                return map(result.data);
            case 'Err':
                return result;
        }
    },

    isOk: <D, E>(result: ResultType<D, E>): boolean => {
        return result.status === 'Ok';
    },
};
