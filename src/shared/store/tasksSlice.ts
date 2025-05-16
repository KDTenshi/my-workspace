import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TColumn, TTask } from "../types/types";
import { arrayMove } from "@dnd-kit/sortable";
import { findTaskInColumn } from "../utils/findTaskInColumn";
import { findColumnByTaskId } from "../utils/findColumnByTaskId";
import { findColumnById } from "../utils/findColumnById";
import { findColumnIndex } from "../utils/findColumnIndex";
import { findTaskIndex } from "../utils/findTaskIndex";

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

      const activeIndex = findColumnIndex({ columnId: activeId, columns: state.columns });
      const overIndex = findColumnIndex({ columnId: overId, columns: state.columns });

      state.columns = arrayMove(state.columns, activeIndex, overIndex);
    },
    changeTaskColumn: (state, action: PayloadAction<{ activeId: string; overId: string }>) => {
      const { activeId, overId } = action.payload;

      const activeColumn = findColumnByTaskId({ columns: state.columns, taskId: activeId });
      const overColumn = findColumnById({ columns: state.columns, columnId: overId });

      if (!activeColumn || !overColumn) return;

      const task = findTaskInColumn({ column: activeColumn, taskId: activeId });

      if (!task) return;

      activeColumn.tasks = activeColumn.tasks.filter((task) => task.id !== activeId);
      overColumn.tasks.push(task);
    },
    changeTaskPosition: (state, action: PayloadAction<{ activeId: string; overId: string }>) => {
      const { activeId, overId } = action.payload;

      const column = findColumnByTaskId({ columns: state.columns, taskId: activeId });

      if (!column) return;

      const activeIndex = findTaskIndex({ taskId: activeId, tasks: column.tasks });
      const overIndex = findTaskIndex({ taskId: overId, tasks: column.tasks });

      column.tasks = arrayMove(column.tasks, activeIndex, overIndex);
    },
    renameColumn: (state, action: PayloadAction<{ id: string; name: string }>) => {
      const { id, name } = action.payload;

      const column = findColumnById({ columns: state.columns, columnId: id });

      if (!column) return;

      column.name = name;
    },
    renameTask: (state, action: PayloadAction<{ id: string; name: string }>) => {
      const { id, name } = action.payload;

      const column = findColumnByTaskId({ columns: state.columns, taskId: id });

      if (!column) return;

      const task = findTaskInColumn({ column, taskId: id });

      if (!task) return;

      task.name = name;
    },
    addTask: (state, action: PayloadAction<{ columnId: string; name: string }>) => {
      const { columnId, name } = action.payload;

      const column = findColumnById({ columns: state.columns, columnId });

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
    deleteTask: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;

      const column = findColumnByTaskId({ columns: state.columns, taskId: id });

      if (!column) return;

      column.tasks = column.tasks.filter((task) => task.id !== id);
    },
    deletecolumn: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;

      state.columns = state.columns.filter((column) => column.id !== id);
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
  deleteTask,
  deletecolumn,
} = tasksSlice.actions;
