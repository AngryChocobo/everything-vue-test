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
