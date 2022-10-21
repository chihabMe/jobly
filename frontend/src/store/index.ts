import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { searchReducer } from "./slices/searchSlice";

export const store = configureStore({
    reducer: {
        search: searchReducer,
        auth: authReducer,
    },
});
