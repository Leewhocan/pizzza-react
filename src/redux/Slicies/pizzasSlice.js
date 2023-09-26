import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",

  async (params, thunkApi) => {
    const { sortBy, order, category, search, currentPage } = params;
    const res = await axios.get(
      `https://647f47e6c246f166da907d09.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}${search}&sortBy=${sortBy}&order=${order}`
    );
    //
    return res.data;
  }
);

const initialState = {
  items: [],
  status: "loading", // load|succ| erorr
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
        state.status = "loading";
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "success";
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = "error";
        state.items = [];
      });
  },
});

export const { setItems } = pizzasSlice.actions;
export default pizzasSlice.reducer;

export const PizzaData = (state) => state.pizza;