import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import filter from "./Slicies/filterSlice";
import cart from "./Slicies/cartSlice";
import pizza from "./Slicies/pizzasSlice";

export const store = configureStore({
  reducer: {
    filter, // у мня будет имя filter с значеним из импорта
    cart,
    pizza,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch