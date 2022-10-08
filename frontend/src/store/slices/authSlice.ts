
import { Action, createAsyncThunk, createReducer, createSlice } from "@reduxjs/toolkit";
import User from "src/models/User";
interface authSliceType  {
    isLoading:boolean,
    isLogged:boolean,
    created:boolean,
    createdEmail:string,
    user:null|User,

}
const initialState:authSliceType = {
    isLoading:false,
    isLogged:false,
    user:null,
    created:false,
    createdEmail:"",
} 
const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        logout:(state)=>{
            state.isLoading=false,
            state.user=null
            state.created=false;
            state.createdEmail="";
        },
        login:(state)=>{
            state.isLogged=true;
            state.created=false;
            //state.createdEmail="";
            //state.user  = action.payload;
        },
        register:(state,action)=>{
            state.created=true;
            state.createdEmail=action.payload;

        }

    },
})
export const authReducer = authSlice.reducer;
export const authAction = {...authSlice.actions}