import { Just, MaybeType, Nothing } from './Maybe';

export type StatefulDataType<D, E = unknown> =
    | {
          type: 'Success';
          data: D;
      }
    | {
          type: 'Loading';
      }
    | {
          type: 'NotAsked';
      }
    | {
          type: 'Failure';
          error: E;
      };

export const Success: <D, E = unknown>(data: D) => StatefulDataType<D, E> = (data) => ({ type: 'Success', data });

export const Loading: <D, E = unknown>() => StatefulDataType<D, E> = () => ({ type: 'Loading' });

export const NotAsked: <D, E = unknown>() => StatefulDataType<D, E> = () => ({ type: 'NotAsked' });

export const Failure: <D, E>(error: E) => StatefulDataType<D, E> = (error) => ({ type: 'Failure', error });

export default {
    toMaybe: <D, E>(data: StatefulDataType<D, E>): MaybeType<D> => {
        switch (data.type) {
            case 'Success':
                return Just(data.data);
            case 'Loading':
            case 'NotAsked':
            case 'Failure':
                return Nothing();
        }
    },
};
