import { createSlice } from "@reduxjs/toolkit";
import type { TColumn } from "../types/types";

type TasksState = {
  columns: TColumn[];
};

const initialState: TasksState = {
  columns: [
    { id: "c001", name: "Column 1", tasks: [{ id: "t001", name: "Task 1", date: Date.now() }] },
    { id: "c002", name: "Column 2", tasks: [{ id: "t002", name: "Task 2", date: Date.now() }] },
  ],
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
});
