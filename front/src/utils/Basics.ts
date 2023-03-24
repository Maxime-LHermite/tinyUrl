export type AppDomain = 'App' | 'I18n' | 'Auth' | 'I/O';

export type AppError<Name extends string> = {
    domain: AppDomain;
    name: Name;
    message: string;
};

export const identity = <T>(a: T): T => a;

export type Optional<T, U extends keyof T> = {
    [P in U]?: T[P];
} & {
    [P in keyof Omit<T, U>]: T[P];
};
