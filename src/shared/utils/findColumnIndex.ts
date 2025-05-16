import type { TColumn } from "../types/types";

export const findColumnIndex = ({ columns, columnId }: { columns: TColumn[]; columnId: string }) => {
  const index = columns.findIndex((column) => column.id == columnId);

  return index;
};
