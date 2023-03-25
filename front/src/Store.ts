import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import { WindowSlice } from './redux/WindowSlice';
import { ThemeSlice } from './redux/ThemeSlice';
import { all, SagaGenerator } from 'typed-redux-saga';
import { AuthenticationSlice } from './redux/AuthenticationSlice';
import { AuthenticationUseCase } from './domain/authentication/AuthenticationUseCase';
import { TinyUrlSlice } from './redux/TinyUrlSlice';
import { TinyUrlUseCase } from './domain/tiny-url/TinyUrlUseCase';

const reducers = {
    window: WindowSlice.slice.reducer,
    theme: ThemeSlice.slice.reducer,
    authentication: AuthenticationSlice.slice.reducer,
    tinyUrl: TinyUrlSlice.slice.reducer,
};

const authenticationSagas = AuthenticationSlice.sagas(AuthenticationUseCase);
const tinyUrlSagas = TinyUrlSlice.sagas(TinyUrlUseCase);

const watchers: SagaGenerator<unknown>[] = [...authenticationSagas, ...tinyUrlSagas];

const sagas = function* root(): Generator {
    yield* all(watchers);
};

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: { ...reducers },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(sagas);
