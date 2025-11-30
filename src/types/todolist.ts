export type CategoriesType = {
  all: number;
  completed: number;
  inWork: number;
};

export type TasksType = {
  id: number;
  title: string;
  isDone: boolean;
  create: string;
};

export interface MetaResponse {
  data: TasksType[];
  info?: CategoriesType;
  meta: {
    totalAmount: number;
  };
}
