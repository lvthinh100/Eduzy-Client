import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterType } from "../../model/Filter";

const initialState = {
  filters: [] as FilterType[],
  fetching: true,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<FilterType[]>) {
      console.log(action.payload);
      state.filters = action.payload;
      state.fetching = false;
    },
  },
});

export const filterActions = filterSlice.actions;
export default filterSlice;
