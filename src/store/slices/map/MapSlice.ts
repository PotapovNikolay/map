import { IDescription, ITitle } from "types/reference";
import { PayloadAction, createAsyncThunk, createSlice  } from "@reduxjs/toolkit";
import { axios } from "utils/axios";
import { IPoint } from "@/src/types/map";

const initial = {id:-1,name:''}

interface IAddPointParams {
  coords: Array<number>;
  description: IDescription;
  title: ITitle;
  adress:string
}

interface IInitialState{
    points:Array<IPoint>,
    point:IPoint,
    error:string | null
}

const initialState: IInitialState = {
    points:[],
    point:{
        coords:[],
        adress:'',
        title:initial,
        description:initial,
    },
    error:null
}

export const addPoint = createAsyncThunk<
    IPoint,
    IAddPointParams,
    { rejectValue: string }>
    ("map/addPoint", async (point, { rejectWithValue }) => {
    
        let response 

        if (point.coords.length && point.description.name.length && point.title.name.length ) {
            const {data} = await axios.post("/points",point);

            response = data
        } else{
            return rejectWithValue('Invalid point data');
        }

        return response
});

export const getPoints = createAsyncThunk<
    Array<IPoint>,
    undefined,
    { rejectValue: string }>
    ("map/getPoints", async () => {
    
    const {data} = await axios.get("/points");

    return data
});

export const mapSlice = createSlice({

    name:'map',
    initialState,
    reducers:{

        changePoint<T>(state:IInitialState, action:PayloadAction<{key:string, value:T}>){
            state.point = {
                ... state.point,
                [action.payload.key] : action.payload.value
            }
        },

        removeError:(state:IInitialState)=>{
            state.error = null
        },

    },
    extraReducers: (builder) => {
    builder
    .addCase(addPoint.fulfilled, (state, {payload}) => {
        state.points.push(payload)
    })    
    .addCase(addPoint.rejected, (state ) => {
       
        state.error = 'Вы заполнили не все поля'
    })   
    .addCase(getPoints.fulfilled, (state, {payload}) => {
        state.points = payload
    })
    
        
}
    
})


export const { changePoint, removeError } = mapSlice.actions