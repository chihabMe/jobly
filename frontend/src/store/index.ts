import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { searchReducer } from "./slices/searchSlice";

export const store = configureStore({
    reducer: {
        search: searchReducer,
        auth: authReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType=void>=ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>