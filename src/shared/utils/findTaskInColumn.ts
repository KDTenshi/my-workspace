import type { TColumn } from "../types/types";

export const findTaskInColumn = ({ column, taskId }: { column: TColumn; taskId: string }) => {
  const task = column.tasks.find((task) => task.id === taskId);

  return task;
};
