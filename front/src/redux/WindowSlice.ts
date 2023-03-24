import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type WindowModel = {
    width: number;
    height: number;
};

const initialState: WindowModel = {
    width: window.innerWidth,
    height: window.innerHeight,
};

const name = 'window';

type ResizePayload = {
    width: number;
    height: number;
};
const slice = createSlice({
    name,
    initialState,
    reducers: {
        resize: (state: WindowModel, action: PayloadAction<ResizePayload>) => ({ ...state, ...action.payload }),
    },
});

export const WindowSlice = {
    slice,
    actions: {
        resize: slice.actions.resize,
    },
};
