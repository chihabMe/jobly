import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FulfilledActionFromAsyncThunk } from "@reduxjs/toolkit/dist/matchers";
import User from "src/models/User";
import { AppThunk, RootState } from "..";
export type authSliceState = {
    isLogged: boolean;
    isLoading: boolean;
    hasErrors: boolean;
    loggedIntSuccessfully: boolean;
    loggingFailed: boolean;
    registeredSuccessfully: boolean;
    registeredEmail: string;
    verifyFailed: boolean;
    refreshFailed: boolean;
    errors: any;
    user: User | null;
};
const initialState: authSliceState = {
    hasErrors: false,
    isLoading: true,
    isLogged: false,
    loggedIntSuccessfully: false,
    loggingFailed: false,
    verifyFailed: false,
    refreshFailed: false,
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
    async (credentials:{email:string,username:string,password:string,re_password:string}, thunkApi) => {
        const config = generateAConfig("POST", JSON.stringify(credentials));
        const response = await fetch("/api/register", config);
        const data = await response.json();
        if (response.status == 201) return data.email;
        return thunkApi.rejectWithValue(data);
    }
);
const loadUser = createAsyncThunk("auth/loadUser", async (d,thunkApi)=>{
    const config = generateAConfig("GET", "");
    const response = await fetch("/api/me", {method:"GET",headers:{"Content-Type":"application/json"}});
    const data = await response.json()
    console.log(data)

    if (response.status == 200) return data; 
     else 
        thunkApi.dispatch(logout());
    
    return thunkApi.rejectWithValue(false);
})
const verify = createAsyncThunk("auth/verify", async (data, thunkApi) => {
    const config = generateAConfig("POST", "");
    const response = await fetch("/api/verify", config);
    if (response.status == 200) return true;

    const state:any = thunkApi.getState();

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
        return;
    }
    thunkApi.dispatch(logout());
    thunkApi.rejectWithValue(false);
    return;
});
const login = createAsyncThunk(
    "auth/login",
    async (
        credentials: { email: string; password: string },
        thunkApi
    ) => {
        const config = generateAConfig("POST", JSON.stringify(credentials));
        const response = await fetch("/api/login", config);
        if (response.status == 200){
            thunkApi.dispatch(loadUser())
            return await response.json()};
        return thunkApi.rejectWithValue("rejected");
    }
);
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
                state.registeredSuccessfully = false;
                state.registeredEmail = "";
            });
        //logout

        //builder.addCase(login.rejected, (state) => {}),
        // builder.addCase(login.pending, (state) => {}),
        builder.addCase(logout.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isLogged = false;
            state.user = null;
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
        //verify
        builder.addCase(verify.pending, (state) => {
            state.isLoading = true;
        }),
            builder.addCase(verify.rejected, (state) => {
                state.isLoading = false;
                state.verifyFailed = true;
            }),
            builder.addCase(verify.fulfilled, (state) => {
                state.isLogged = true;
                state.isLoading = false;
                state.verifyFailed = false;
            }),
            //refresh
            builder.addCase(refresh.rejected, (state) => {
                state.refreshFailed = true;
            }),
            builder.addCase(refresh.pending, (state) => { }),
            builder.addCase(refresh.fulfilled, (state) => {
                state.refreshFailed = false;
            });
            //load user
            builder.addCase(loadUser.rejected, (state) => {
                console.log("rejected")
            }),
            builder.addCase(loadUser.pending, (state) => { }),
            builder.addCase(loadUser.fulfilled, (state,action) => {
                state.user = action.payload 
            });
            //load user
    },
});
export const authReducer = authSlice.reducer;
export const authActions = {
    ...authSlice.actions,
    login,
    signup,
    refresh,
    verify,
    logout,
    loadUser
};
