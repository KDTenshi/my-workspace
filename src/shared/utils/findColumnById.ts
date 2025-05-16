import type { TColumn } from "../types/types";

export const findColumnById = ({ columns, columnId }: { columns: TColumn[]; columnId: string }) => {
  const column = columns.find((column) => column.id === columnId);

  return column;
};
