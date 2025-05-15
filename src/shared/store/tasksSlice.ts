import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TColumn, TTask } from "../types/types";
import { arrayMove } from "@dnd-kit/sortable";

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
  reducers: {
    changeColumnPosition: (state, action: PayloadAction<{ activeId: string; overId: string }>) => {
      const { activeId, overId } = action.payload;

      const activeIndex = state.columns.findIndex((column) => column.id === activeId);
      const overIndex = state.columns.findIndex((column) => column.id === overId);

      state.columns = arrayMove(state.columns, activeIndex, overIndex);
    },
    changeTaskColumn: (state, action: PayloadAction<{ activeId: string; overId: string }>) => {
      const { activeId, overId } = action.payload;

      const activeColumn = state.columns.find((column) => column.tasks.some((task) => task.id === activeId));
      const overColumn = state.columns.find((column) => column.id === overId);

      if (!activeColumn || !overColumn) return;

      const task = activeColumn.tasks.find((task) => task.id === activeId);

      if (!task) return;

      activeColumn.tasks = activeColumn.tasks.filter((task) => task.id !== activeId);
      overColumn.tasks.push(task);
    },
    changeTaskPosition: (state, action: PayloadAction<{ activeId: string; overId: string }>) => {
      const { activeId, overId } = action.payload;

      const column = state.columns.find((column) => column.tasks.some((task) => task.id === activeId));

      if (!column) return;

      const activeIndex = column.tasks.findIndex((task) => task.id === activeId);
      const overIndex = column.tasks.findIndex((task) => task.id === overId);

      column.tasks = arrayMove(column.tasks, activeIndex, overIndex);
    },
    renameColumn: (state, action: PayloadAction<{ id: string; name: string }>) => {
      const { id, name } = action.payload;

      const column = state.columns.find((column) => column.id === id);

      if (!column) return;

      column.name = name;
    },
    renameTask: (state, action: PayloadAction<{ id: string; name: string }>) => {
      const { id, name } = action.payload;

      const column = state.columns.find((column) => column.tasks.some((task) => task.id === id));

      if (!column) return;

      const task = column.tasks.find((task) => task.id === id);

      if (!task) return;

      task.name = name;
    },
    addTask: (state, action: PayloadAction<{ columnId: string; name: string }>) => {
      const { columnId, name } = action.payload;

      const column = state.columns.find((column) => column.id === columnId);

      if (!column) return;

      const newTask: TTask = {
        id: `${Date.now()}`,
        name,
        date: Date.now(),
      };

      column.tasks.push(newTask);
    },
    addColumn: (state, action: PayloadAction<{ name: string }>) => {
      const { name } = action.payload;

      const newColumn: TColumn = {
        id: `${Date.now()}`,
        name,
        tasks: [],
      };

      state.columns.push(newColumn);
    },
  },
});

export const {
  changeColumnPosition,
  changeTaskColumn,
  changeTaskPosition,
  renameColumn,
  renameTask,
  addTask,
  addColumn,
} = tasksSlice.actions;
