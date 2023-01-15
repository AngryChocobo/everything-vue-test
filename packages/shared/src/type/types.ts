export enum TodoFilterEnum {
  All = "All",
  Active = "Active",
  Done = "Done",
}
export class Todo {
  id: string;
  label: string;
  isDone: boolean;

  constructor(args?: Partial<Todo>) {
    this.id = args?.id || Math.random().toString();
    this.label = args?.label ?? "";
    this.isDone = args?.isDone ?? false;
  }
}
export const FILTERS = [
  {
    id: "filter-All",
    value: TodoFilterEnum.All,
    label: "All",
  },
  {
    id: "filter-Active",
    value: TodoFilterEnum.Active,
    label: "Active",
  },
  {
    id: "filter-Done",
    value: TodoFilterEnum.Done,
    label: "Done",
  },
] as const;
