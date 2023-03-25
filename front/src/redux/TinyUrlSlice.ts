import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { call, put, SagaGenerator, takeEvery, takeLatest } from 'typed-redux-saga';
import { Failure, Loading, NotAsked, StatefulDataType, Success } from '../utils/StatefulData';
import { CreateTinyUrlModel, TinyUrlModel, UpdateTinyUrlModel } from '../models/TinyUrlModel';
import { TinyUrlUseCaseSpec } from '../domain/tiny-url/TinyUrlUseCase';
import { AuthenticationSlice } from './AuthenticationSlice';

/////////////////////////////////////////////
/////////////////// SLICE ///////////////////
/////////////////////////////////////////////

type TinyUrlState = StatefulDataType<TinyUrlModel[]>;

const initialState: TinyUrlState = NotAsked();

const name = 'TinyUrl' as const;

const slice = createSlice({
    name,
    initialState: initialState,
    reducers: {
        reset: (): TinyUrlState => NotAsked(),
        setLoading: (): TinyUrlState => Loading(),
        setSuccess: (state: TinyUrlState, action: PayloadAction<TinyUrlModel[]>): TinyUrlState => Success(action.payload),
        setFailure: (state: TinyUrlState, action: PayloadAction<undefined>): TinyUrlState => Failure(action.payload),
    },
});

/////////////////////////////////////////////
/////////////////// SAGAS ///////////////////
/////////////////////////////////////////////

const fetchAction = createAction<void, `${typeof name}/fetch`>(`TinyUrl/fetch`);
const createUrlAction = createAction<CreateTinyUrlModel, `${typeof name}/create`>(`TinyUrl/create`);
const updateUrlAction = createAction<UpdateTinyUrlModel, `${typeof name}/update`>(`TinyUrl/update`);
const deleteUrlAction = createAction<string, `${typeof name}/delete`>(`TinyUrl/delete`);

const destroySaga = function* () {
    yield* put(slice.actions.reset());
};

const fetchSaga = function* (useCase: TinyUrlUseCaseSpec) {
    yield* put(slice.actions.setLoading());
    const items = yield* call(useCase.list);
    switch (items.status) {
        case 'Ok':
            yield* put(slice.actions.setSuccess(items.data));
            break;
        case 'Err':
            yield* put(slice.actions.setFailure(items.error));
            break;
    }
};

const createSaga = function* (useCase: TinyUrlUseCaseSpec, action: ReturnType<typeof createUrlAction>) {
    const items = yield* call(useCase.create, action.payload);
    switch (items.status) {
        case 'Ok':
            yield* call(fetchSaga, useCase);
            break;
        case 'Err':
            // Should show error message
            break;
    }
};

const updateSaga = function* (useCase: TinyUrlUseCaseSpec, action: ReturnType<typeof updateUrlAction>) {
    const items = yield* call(useCase.update, action.payload);
    switch (items.status) {
        case 'Ok':
            yield* call(fetchSaga, useCase);
            break;
        case 'Err':
            // Should show error message
            break;
    }
};

const deleteSaga = function* (useCase: TinyUrlUseCaseSpec, action: ReturnType<typeof deleteUrlAction>) {
    const items = yield* call(useCase.delete, action.payload);
    switch (items.status) {
        case 'Ok':
            yield* call(fetchSaga, useCase);
            break;
        case 'Err':
            // Should show error message
            break;
    }
};

const sagas = (useCase: TinyUrlUseCaseSpec): SagaGenerator<unknown>[] => {
    return [
        takeLatest(AuthenticationSlice.actions.logout, destroySaga),
        takeLatest(fetchAction, fetchSaga, useCase),
        takeEvery(createUrlAction, createSaga, useCase),
        takeEvery(updateUrlAction, updateSaga, useCase),
        takeEvery(deleteUrlAction, deleteSaga, useCase),
    ];
};

/////////////////////////////////////////////
///////////////// PAYLOADS //////////////////
/////////////////////////////////////////////

/////////////////////////////////////////////
////////////////// EXPORTS //////////////////
/////////////////////////////////////////////

export const TinyUrlSlice = {
    slice,
    sagas,
    actions: {
        fetch: fetchAction,
        create: createUrlAction,
        update: updateUrlAction,
        delete: deleteUrlAction,
    },
};
