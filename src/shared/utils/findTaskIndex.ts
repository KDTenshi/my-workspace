import type { TTask } from "../types/types";

export const findTaskIndex = ({ tasks, taskId }: { tasks: TTask[]; taskId: string }) => {
  const index = tasks.findIndex((task) => task.id === taskId);

  return index;
};
