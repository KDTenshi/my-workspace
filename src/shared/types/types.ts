export type TTask = {
  id: string;
  name: string;
  date: number;
};

export type TColumn = {
  id: string;
  name: string;
  tasks: TTask[];
};
