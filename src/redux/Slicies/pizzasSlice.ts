import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

type Pizza = {
  id:string;
  title:string;
  price:number;
  imageUrl:string;
  sizes:number[];
  types:number[];
  rating:number
}




export const fetchPizzas = createAsyncThunk<Pizza[],Record<string,string>>(
  "pizza/fetchPizzasStatus",

  async (params) => {
    const { sortBy, order, category, search, currentPage } = params;
    const {data} = await axios.get<Pizza[]>(
      `https://647f47e6c246f166da907d09.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&${search}&sortBy=${sortBy}&order=${order}`
    );
    //
    return data;
  }
);

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error"
} 

interface PizzaSliceState {
  items:Pizza[];
  status: Status;

}

const initialState:PizzaSliceState = {
  items: [],
  status: Status.LOADING
};
const pizzasSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = Status.LOADING;
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = Status.SUCCESS;
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = Status.ERROR;
        state.items = [];
      });
  },
});

export const { setItems } = pizzasSlice.actions;
export default pizzasSlice.reducer;

export const PizzaData = (state:RootState ) => state.pizza;
