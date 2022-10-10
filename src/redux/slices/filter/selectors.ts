import { RootState } from "../../store";

export const selectfilter = (state: RootState) => state.filter;
export const selectSort = (state: RootState) => state.filter.sort;
