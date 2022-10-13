import {
  Action,
  ActionCreator,
  AnyAction,
  AsyncThunkAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { FulfilledActionFromAsyncThunk } from "@reduxjs/toolkit/dist/matchers";
import User from "src/models/User";
export type authSliceState = {
  isLogged: boolean;
  isLoading: boolean;
  hasErrors: boolean;
  loggedIntSuccessfully: boolean;
  loggingFailed: boolean;
  registeredSuccessfully: boolean;
  registeredEmail: string;
  errors: any;
  user: User | null;
};
const initialState: authSliceState = {
  hasErrors: false,
  isLoading: false,
  isLogged: false,
  loggedIntSuccessfully: false,
  loggingFailed: false,
  registeredSuccessfully: false,
  user: null,
  registeredEmail: "",
  errors: {},
};
const generateAConfig = (method: string, credentials: string) => {
  return {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: credentials,
  };
};
const signup = createAsyncThunk(
  "auth/signup",
  async (
    credentials,
    thunkApi
  ) => {
    const config = generateAConfig("POST", JSON.stringify(credentials));
    const response = await fetch("/api/register", config);
    const data = await response.json();
    if (response.status == 201) return data.email; 
    return thunkApi.rejectWithValue(data);
  }
);
const login = createAsyncThunk(
  "auth/login",
  async (
    credentials: PayloadAction<{ email: string; password: string }>,
    thunkApi
  ) => {
    const config = generateAConfig("POST", JSON.stringify(credentials));
    const response = await fetch("/api/login", config);
    if (response.status == 200) return await response.json();
    return thunkApi.rejectWithValue("rejected");
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      (state.user = null), (state.isLogged = false);
    },
    consumeEmailAfterEnteringTheLoggingPage:(state)=>{
        state.registeredSuccessfully=false;
    },
  },
  extraReducers: (builder) => {
    //login
    builder.addCase(login.rejected, (state) => {
      state.isLoading = false;
      state.loggingFailed = true;
      state.isLogged = false;
      state.user = null;
    }),
      builder.addCase(login.pending, (state) => {
        state.isLoading = true;
      }),
      builder.addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLogged = true;
        state.user = action.user;
        state.registeredSuccessfully = false;
        state.registeredEmail = "";
      });
    //signup
    builder.addCase(signup.rejected, (state, action) => {
      state.errors = action.payload;
      (state.hasErrors = true), (state.isLoading = false);
    }),
      builder.addCase(signup.pending, (state) => {
        state.isLoading = true;
        state.hasErrors = false;
        state.errors = {};
      }),
      builder.addCase(signup.fulfilled, (state, action) => {
        console.log(action);
        state.isLoading = false;
        state.registeredEmail = action.payload;
        state.hasErrors = false;
        state.errors = {};
        state.registeredSuccessfully = true;
      });
  },
});
export const authReducer = authSlice.reducer;
export const authActions = { ...authSlice.actions, login, signup };
