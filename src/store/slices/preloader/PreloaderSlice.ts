import {  createSlice, PayloadAction  } from "@reduxjs/toolkit";

interface IInitialState { 
    loading: boolean,
}

const initialState: IInitialState = {
    loading:true,
}

export const preloaderSlice = createSlice({

    name:'preloader',
    initialState,
    reducers:{
        stopLoading:(state:IInitialState, action:PayloadAction<boolean>)=>{

            state.loading = action.payload
        },
        
    }
})

export const {stopLoading} = preloaderSlice.actions