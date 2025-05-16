import type { TColumn } from "../types/types";

export const findColumnByTaskId = ({ columns, taskId }: { columns: TColumn[]; taskId: string }) => {
  const column = columns.find((column) => column.tasks.some((task) => task.id === taskId));

  return column;
};
