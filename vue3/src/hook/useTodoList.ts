import { useState } from "./useState";
import type { Todo } from "shared";

import axios from "axios";

export function useTodoListStore() {
  const [todoList, setTodoList] = useState([]);
  return {
    todoList,
    setTodoList,
  };
}

export async function fetchTodoList(): Promise<Todo[]> {
  const res = await axios.get("http://localhost:3000/todos");
  return res.data;
}
