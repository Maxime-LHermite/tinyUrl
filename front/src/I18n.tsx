import i18n, { InitOptions } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import { Logger } from './Logger';

export const localesNames = {
    en: 'English',
    fr: 'Français (French)',
};

export const supportedLocales = Object.keys(localesNames) as (keyof typeof localesNames)[];

export const i18nOptions: InitOptions = {
    ns: [],
    fallbackLng: 'en',
    supportedLngs: supportedLocales,
    nonExplicitSupportedLngs: true,
    load: 'currentOnly',
    lowerCaseLng: true,
    cleanCode: true,
    debug: process.env.NODE_ENV === 'development',
    detection: {
        order: ['localStorage', 'querystring', 'navigator'],
        caches: ['localStorage'],
        lookupQuerystring: 'lng',
        lookupLocalStorage: 'i18nextLng',
    },
    interpolation: {
        escapeValue: false,
    },
    backend: {
        loadPath: '/locales/{{lng}}.json',
    },
    react: {
        useSuspense: false,
        bindI18n: 'loaded languageChanged',
    },
};

i18n.use(initReactI18next)
    .use(LanguageDetector)
    .use(HttpApi)
    .init(i18nOptions)
    .then(Logger.logValueDebug('I18n', 'Initialized'))
    .catch(Logger.errorValueDebug('I18n', 'Initialization error'));

export const i18nInstance = i18n;
