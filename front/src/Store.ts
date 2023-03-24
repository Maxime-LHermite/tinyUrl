import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import { WindowSlice } from './redux/WindowSlice';
import { ThemeSlice } from './redux/ThemeSlice';
import { all, SagaGenerator } from 'typed-redux-saga';
import { ExampleSlice } from './redux/ExampleSlice';

const reducers = {
    window: WindowSlice.slice.reducer,
    theme: ThemeSlice.slice.reducer,
    test: ExampleSlice.slice.reducer,
};

const testSagas = ExampleSlice.sagas();

const watchers: SagaGenerator<unknown>[] = [...testSagas];

const sagas = function* root(): Generator {
    yield* all(watchers);
};

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: { ...reducers },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(sagas);
