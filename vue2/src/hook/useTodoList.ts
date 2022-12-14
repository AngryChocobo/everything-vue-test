import { ref, Ref } from "vue";
import { useState } from "./useState";
import { TodoFilterEnum, Todo } from "../type/types";
import axios from "axios";

export function useTodoList() {
  const [todoList, setTodoList] = useState([]);
  return {
    todoList,
    setTodoList,
  };
}

export async function fetchTodoList() {
  const res = await axios.get("http://localhost:3000/todos");
  return res.data;
}
