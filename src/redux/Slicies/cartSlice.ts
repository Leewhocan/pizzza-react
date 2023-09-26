import { createSlice } from "@reduxjs/toolkit";


type CartItem{
  id:number;
  title:string;
  price:number;
  imageUrl:string
  type: number,
  size: number,
}



interface CartSliceState{
  totalProce:number;
  items
}



const initialState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addPizza(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    removePizza(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },

    minusPizza(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    clearPizzas(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state) => state.cart;

export const { addPizza, removePizza, clearPizzas, minusPizza } =
  cartSlice.actions;
export default cartSlice.reducer;
