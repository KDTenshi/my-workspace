import { combineReducers } from "@reduxjs/toolkit";
import { tasksSlice } from "../../shared/store/tasksSlice";

export const appReducer = combineReducers({
  [tasksSlice.reducerPath]: tasksSlice.reducer,
});
