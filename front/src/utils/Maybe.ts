export type MaybeType<T> = { type: 'Just'; data: T } | { type: 'Nothing' };

export const Just = <T>(data: T): MaybeType<T> => ({ type: 'Just', data });
export const Nothing = <T>(): MaybeType<T> => ({ type: 'Nothing' });

export default {
	fromJs: <T>(maybeUndefined: T | undefined | null): MaybeType<T> => (maybeUndefined ? Just(maybeUndefined) : Nothing()),

	toJs: <T>(maybe: MaybeType<T>): T | undefined => {
		switch (maybe.type) {
			case 'Nothing':
				return undefined;
			case 'Just':
				return maybe.data;
		}
	},

	withDefault: <T>(def: T, maybe: MaybeType<T>): T => {
		switch (maybe.type) {
			case 'Nothing':
				return def;
			case 'Just':
				return maybe.data;
		}
	},

	map: <T, R>(mapper: (value: T) => R, maybe: MaybeType<T>): MaybeType<R> => {
		switch (maybe.type) {
			case 'Nothing':
				return Nothing();
			case 'Just':
				return Just(mapper(maybe.data));
		}
	},

	map2: <T, U, R>(mapper: (v1: T, v2: U) => R, maybe1: MaybeType<T>, maybe2: MaybeType<U>): MaybeType<R> => {
		switch (maybe1.type) {
			case 'Nothing':
				return Nothing();
			case 'Just':
				switch (maybe2.type) {
					case 'Nothing':
						return Nothing();
					case 'Just':
						return Just(mapper(maybe1.data, maybe2.data));
				}
		}
	},

	andThen: <T, R>(mapper: (value: T) => MaybeType<R>, maybe: MaybeType<T>): MaybeType<R> => {
		switch (maybe.type) {
			case 'Nothing':
				return Nothing();
			case 'Just':
				return mapper(maybe.data);
		}
	},

	isJust: <T>(maybe: MaybeType<T>): boolean => {
		switch (maybe.type) {
			case 'Nothing':
				return false;
			case 'Just':
				return true;
		}
	},

	isNothing: <T>(maybe: MaybeType<T>): boolean => {
		switch (maybe.type) {
			case 'Nothing':
				return true;
			case 'Just':
				return false;
		}
	},
};
