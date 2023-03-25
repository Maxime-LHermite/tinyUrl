import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { call, put, SagaGenerator, takeEvery, takeLatest } from 'typed-redux-saga';
import { AuthenticationModel } from '../models/AuthenticationModel';
import { UserModel } from '../models/UserModel';
import { AuthenticationUseCase, AuthenticationUseCaseSpec } from '../domain/authentication/AuthenticationUseCase';

/////////////////////////////////////////////
/////////////////// SLICE ///////////////////
/////////////////////////////////////////////

const initialState: AuthenticationModel = { status: 'NotAuthenticated' };

const name = 'Auth' as const;

const slice = createSlice({
    name,
    initialState: initialState as AuthenticationModel,
    reducers: {
        setNotAuthenticated: (): AuthenticationModel => ({
            status: 'NotAuthenticated',
        }),
        setAuthenticated: (state: AuthenticationModel, action: PayloadAction<UserModel>): AuthenticationModel => ({
            status: 'Authenticated',
            user: action.payload,
        }),
    },
});

/////////////////////////////////////////////
/////////////////// SAGAS ///////////////////
/////////////////////////////////////////////

const logoutAction = createAction<void, `${typeof name}/logout`>(`Auth/logout`);
const loginAction = createAction<LoginActionPayload, `${typeof name}/login`>(`Auth/login`);
const registerAction = createAction<LoginActionPayload, `${typeof name}/register`>(`Auth/register`);
const reauthenticateAction = createAction<void, `${typeof name}/reauthenticate`>(`Auth/reauthenticate`);

const logoutSaga = function* (useCase: AuthenticationUseCaseSpec) {
    yield* call(useCase.logout);
    yield* put(slice.actions.setNotAuthenticated());
};

const loginSaga = function* (useCase: AuthenticationUseCaseSpec, action: ReturnType<typeof loginAction>) {
    const user = yield* call(useCase.login, action.payload.username, action.payload.password);
    switch (user.status) {
        case 'Ok':
            yield* put(slice.actions.setAuthenticated(user.data));
            break;
        case 'Err':
            yield* call(logoutSaga, useCase);
            break;
    }
};

const registerSaga = function* (useCase: AuthenticationUseCaseSpec, action: ReturnType<typeof registerAction>) {
    const user = yield* call(useCase.register, action.payload.username, action.payload.password);
    switch (user.status) {
        case 'Ok':
            yield* put(slice.actions.setAuthenticated(user.data));
            break;
        case 'Err':
            yield* call(logoutSaga, useCase);
            break;
    }
};

const reauthenticateSaga = function* (useCase: AuthenticationUseCaseSpec) {
    const user = yield* call(useCase.reauthenticate);
    switch (user.status) {
        case 'Ok':
            yield* put(slice.actions.setAuthenticated(user.data));
            break;
        case 'Err':
            yield* call(logoutSaga, useCase);
            break;
    }
};

const sagas = (useCase: AuthenticationUseCaseSpec): SagaGenerator<unknown>[] => {
    return [
        takeLatest(logoutAction, logoutSaga, useCase),
        takeLatest(loginAction, loginSaga, useCase),
        takeEvery(registerAction, registerSaga, useCase),
        takeLatest(reauthenticateAction, reauthenticateSaga, useCase),
    ];
};

/////////////////////////////////////////////
///////////////// PAYLOADS //////////////////
/////////////////////////////////////////////

type LoginActionPayload = { username: string; password: string };

/////////////////////////////////////////////
////////////////// EXPORTS //////////////////
/////////////////////////////////////////////

export const AuthenticationSlice = {
    slice,
    sagas,
    actions: {
        logout: logoutAction,
        login: loginAction,
        register: registerAction,
        reauthenticate: reauthenticateAction,
    },
};
