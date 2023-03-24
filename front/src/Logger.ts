import { AppDomain } from './utils/Basics';

const isDebugMode = (): boolean => process.env.NODE_ENV === 'development';

export type LoggerSpecs = {
    log: (domain: AppDomain, ...values: unknown[]) => void;
    warn: (domain: AppDomain, ...values: unknown[]) => void;
    error: (domain: AppDomain, ...values: unknown[]) => void;
    logValue: (domain: AppDomain, ...values: unknown[]) => (value: unknown) => void;
    warnValue: (domain: AppDomain, ...values: unknown[]) => (value: unknown) => void;
    errorValue: (domain: AppDomain, ...values: unknown[]) => (value: unknown) => void;

    logDebug: (domain: AppDomain, ...values: unknown[]) => void;
    warnDebug: (domain: AppDomain, ...values: unknown[]) => void;
    errorDebug: (domain: AppDomain, ...values: unknown[]) => void;
    logValueDebug: (domain: AppDomain, ...values: unknown[]) => (value: unknown) => void;
    warnValueDebug: (domain: AppDomain, ...values: unknown[]) => (value: unknown) => void;
    errorValueDebug: (domain: AppDomain, ...values: unknown[]) => (value: unknown) => void;
};

class ConsoleLogger implements LoggerSpecs {
    log = (domain: AppDomain, ...values: unknown[]): void => console.log(domain, ...values);
    warn = (domain: AppDomain, ...values: unknown[]): void => console.warn(domain, ...values);
    error = (domain: AppDomain, ...values: unknown[]): void => console.error(domain, ...values);
    logValue =
        (domain: AppDomain, ...values: unknown[]): ((value: unknown) => void) =>
        (value: unknown) =>
            console.log(domain, ...values, value);
    warnValue =
        (domain: AppDomain, ...values: unknown[]): ((value: unknown) => void) =>
        (value: unknown) =>
            console.log(domain, ...values, value);
    errorValue =
        (domain: AppDomain, ...values: unknown[]): ((value: unknown) => void) =>
        (value: unknown) =>
            console.log(domain, ...values, value);

    logDebug = (domain: AppDomain, ...values: unknown[]): void => {
        isDebugMode() ? console.log(domain, ...values) : null;
    };
    warnDebug = (domain: AppDomain, ...values: unknown[]): void => {
        isDebugMode() ? console.warn(domain, ...values) : null;
    };
    errorDebug = (domain: AppDomain, ...values: unknown[]): void => {
        isDebugMode() ? console.error(domain, ...values) : null;
    };
    logValueDebug =
        (domain: AppDomain, ...values: unknown[]): ((value: unknown) => void) =>
        (value: unknown) => {
            isDebugMode() ? console.log(domain, ...values, value) : null;
        };
    warnValueDebug =
        (domain: AppDomain, ...values: unknown[]): ((value: unknown) => void) =>
        (value: unknown) => {
            isDebugMode() ? console.warn(domain, ...values, value) : null;
        };
    errorValueDebug =
        (domain: AppDomain, ...values: unknown[]): ((value: unknown) => void) =>
        (value: unknown) => {
            isDebugMode() ? console.error(domain, ...values, value) : null;
        };
}

export const Logger: LoggerSpecs = new ConsoleLogger();
