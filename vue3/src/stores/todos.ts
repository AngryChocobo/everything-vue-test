import { defineStore } from "pinia";
import { TodoFilterEnum, Todo } from "shared";
import { useState } from "@/hook/useState";
import { computed } from "vue";

const filters = {
  [TodoFilterEnum.All]: (todos: Todo[]) => todos,
  [TodoFilterEnum.Active]: (todos: Todo[]) => todos.filter((v) => !v.isDone),
  [TodoFilterEnum.Done]: (todos: Todo[]) => todos.filter((v) => v.isDone),
};

export const useTodoListStore = defineStore("todolist", () => {
  const [list, setList] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<TodoFilterEnum>(TodoFilterEnum.All);
  const displayList = computed(() => {
    return filters[filter.value](list.value);
  });

  function addTodo(label: Todo["label"]) {
    list.value.push(new Todo({ label }));
  }

  function deleteTodo(item: Todo) {
    list.value = list.value.filter((v) => v !== item);
  }
  function toggleTodo(item: Todo, newStatus: Todo["isDone"]) {
    item.isDone = newStatus;
  }

  return {
    list,
    setList,
    filter,
    setFilter,
    displayList,
    addTodo,
    deleteTodo,
    toggleTodo,
  };
});
