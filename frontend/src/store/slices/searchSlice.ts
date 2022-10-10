import { createSlice } from "@reduxjs/toolkit";
type SearchSliceType = {
    industry:{name:string,id:number},
    location :{name:string,id:number},
    q:string,
}

const initialState:SearchSliceType ={
    industry:{name:"",id:0},
    location:{name:"",id:0},
    q:""
}

const searchSlice = createSlice({
    name:"search",
    initialState,
    reducers:{
        addIndustry:(state,action)=>{
            state.industry=action.payload
        },
        addQuery:(state,action)=>{
            state.q=action.payload
        },
        addLocation:(state,action)=>{
            state.location=action.payload
        },
    }
})

export const searchActions = searchSlice.actions;
export const searchReducer = searchSlice.reducer;