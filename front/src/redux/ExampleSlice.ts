import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { call, put, SagaGenerator, take } from 'typed-redux-saga';

/////////////////////////////////////////////
/////////////////// SLICE ///////////////////
/////////////////////////////////////////////

type ExampleState = {
    value: string;
};

const initialState: ExampleState = {
    value: 'Hello world!',
};

const name = 'Example' as const;

const slice = createSlice({
    name,
    initialState,
    reducers: {
        updateValue: (state, action: PayloadAction<UpdateValuePayload>) => ({
            ...state,
            value: action.payload,
        }),
    },
});

/////////////////////////////////////////////
/////////////////// SAGAS ///////////////////
/////////////////////////////////////////////

const actionUsedBySaga = createAction<SagaActionPayload, `${typeof name}/actionUsedBySaga`>(`Example/actionUsedBySaga`);

const emptySaga = function* () {
    const action = yield* take(actionUsedBySaga);
    console.log(action);
    yield* put(slice.actions.updateValue(action.payload.value));
};

const sagas = (): SagaGenerator<unknown>[] => {
    return [call(emptySaga)];
};

/////////////////////////////////////////////
///////////////// PAYLOADS //////////////////
/////////////////////////////////////////////

type UpdateValuePayload = string;

type SagaActionPayload = {
    value: string;
};

/////////////////////////////////////////////
////////////////// EXPORTS //////////////////
/////////////////////////////////////////////

export const ExampleSlice = {
    slice,
    sagas,
    actions: {
        updateValue: slice.actions.updateValue,
        actionUsedBySaga,
    },
};
