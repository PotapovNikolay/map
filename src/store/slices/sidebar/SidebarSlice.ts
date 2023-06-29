import { IReference, IDescription, ITitle } from "types/reference";
import {  PayloadAction, createAsyncThunk, createSlice  } from "@reduxjs/toolkit";
import { axios } from "utils/axios";


interface IInitialState{
    reference:IReference,
    show:boolean,
    title:ITitle,
    description:IDescription
}

const initial = {id:-1,name:''}

const initialState: IInitialState = {
    reference:{
        descriptions:[],
        titles:[]
    },
    show:false,
    title:initial,
    description:initial
}

export const getRefences = createAsyncThunk<
    IReference,undefined,
    { rejectValue: string }
>("sidebar/getRefences", async () => {
    
    const {data} = await axios.get("/reference");
    return data;
});


export const sidebarSlice = createSlice({

    name:'sidebar',
    initialState,
    reducers:{
        showSidebar:(state:IInitialState, action:PayloadAction<boolean>)=>{

            state.show = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            getRefences.fulfilled,
            (state, { payload }) => {

                state.reference = payload                
            }
        );
    },
    
})

export const {showSidebar} = sidebarSlice.actions

