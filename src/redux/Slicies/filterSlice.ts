import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";


export enum SortPropertyEnum {
    Rating_DESC = 'rating',
    Rating_ASC = '-rating',
    Title_DESC = 'title',
    Title_ASC = '-title',
    Price_DESC = 'price',
    Price_ASC = '-price',
}


export type SortTYPE = {
  name:string;
  sortProperty:SortPropertyEnum;
}

 interface FilterSliceState {
  searchValue:string;
  categoryId: number;
  pageCount: number;
  sort: SortTYPE;
 }


const initialState:FilterSliceState = {
  searchValue: "",
  categoryId: 0,
  pageCount: 1,
  sort: { name: "популярности", sortProperty: SortPropertyEnum.Price_DESC  },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId(state, action:PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action:PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSort(state, action:PayloadAction<SortTYPE>) {
      state.sort = action.payload;
    },
    setPageCount(state, action:PayloadAction<number>) {
      state.pageCount = action.payload;
    },
  },
});
export const selectFilter = (state: RootState) => state.filter;
export const selectSort = (state: RootState) => state.filter.sort;

export const { setCategoryId, setSort, setPageCount, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
