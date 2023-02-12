import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FulfilledActionFromAsyncThunk } from "@reduxjs/toolkit/dist/matchers";
import {
  currentUserEndpoint,
  refreshEndpoint,
  verifyEndpoint,
} from "config/constances";
import User from "src/models/User";
import { AppThunk, RootState } from "..";
export type authSliceState = {
  isLogged: boolean;
  isLoading: boolean;
  hasErrors: boolean;
  registeredSuccessfully: boolean;
  registeredEmail: string;
  verifyFailed: boolean;
  refreshFailed: boolean;
  user: User | null;
};
const initialState: authSliceState = {
  hasErrors: false,
  isLoading: true,
  isLogged: false,
  verifyFailed: false,
  refreshFailed: false,
  registeredSuccessfully: false,
  user: null,
  registeredEmail: "",
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
const loadUser = createAsyncThunk("auth/loadUser", async (d, thunkApi) => {
  const config = generateAConfig("GET", "");
  const response = await fetch(currentUserEndpoint, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();

  if (response.status == 200) return data;
  else thunkApi.dispatch(logout());

  return thunkApi.rejectWithValue(false);
});
const verify = createAsyncThunk("auth/verify", async (data, thunkApi) => {
  const config = generateAConfig("POST", "");
  console.log("/api/verify");
  const response = await fetch("/api/verify", config);
  if (response.status == 200) {
    thunkApi.dispatch(loadUser());
    return true;
  }
  const state: any = thunkApi.getState();

  if (state.auth.refreshFailed) {
    thunkApi.dispatch(logout());
  } else {
    thunkApi.dispatch(refresh());
  }
  return thunkApi.rejectWithValue(false);
});
const refresh = createAsyncThunk("auth/refresh", async (data, thunkApi) => {
  const config = generateAConfig("POST", "");
  const response = await fetch("/api/refresh", config);
  if (response.status == 200) {
    thunkApi.dispatch(verify());
    thunkApi.fulfillWithValue(true);
  } else {
    thunkApi.dispatch(logout());
    thunkApi.rejectWithValue(false);
  }
});
const logout = createAsyncThunk("auth/logout", async (data, thunkApi) => {
  const config = generateAConfig("POST", "");
  const response = await fetch("/api/logout", config);
  if (response.status == 200) return await response.json();
  return thunkApi.rejectWithValue("rejected");
});
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    consumeEmailAfterEnteringTheLoggingPage: (state) => {
      state.registeredSuccessfully = false;
    },
  },
  extraReducers: (builder) => {
    //login

    //builder.addCase(login.rejected, (state) => {}),
    // builder.addCase(login.pending, (state) => {}),
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isLogged = false;
      state.isLoading = false;
      state.user = null;
    });
    //verify
    builder.addCase(verify.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(verify.rejected, (state) => {
        state.verifyFailed = true;
      }),
      builder.addCase(verify.fulfilled, (state) => {
        state.isLogged = true;
        state.verifyFailed = false;
      }),
      //refresh
      builder.addCase(refresh.rejected, (state) => {
        state.refreshFailed = true;
        state.isLoading = false;
      }),
      builder.addCase(refresh.pending, (state) => {}),
      builder.addCase(refresh.fulfilled, (state) => {
        state.refreshFailed = false;
      });
    //load user
    builder.addCase(loadUser.rejected, (state) => {
      state.isLogged = false;
      state.isLoading = false;
    }),
      builder.addCase(loadUser.pending, (state) => {
        state.isLoading = true;
      }),
      builder.addCase(loadUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isLogged = true;
      });
    //load user
  },
});
export const authReducer = authSlice.reducer;
export const authActions = {
  ...authSlice.actions,
  refresh,
  verify,
  logout,
  loadUser,
};
