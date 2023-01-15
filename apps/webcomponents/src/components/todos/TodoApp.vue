<template>
  <div data-cy="todo-app" id="todo-app-antdv">
    <h1>antdv todos app</h1>
    <TodoItem
      v-for="item in displayList"
      :key="item.label"
      :label="item.label"
      :is-done="item.isDone"
      @delete="handleDelete(item)"
      @toggle="(newStatus:boolean) => handleToggle(item, newStatus)"
      class="todo-item"
    >
      {{ item }}
    </TodoItem>
    <TodoInput @add="handleAdd" class="todo-input" />
    <TodoFilter :filter="filter" @toggle="handleChangeFilter" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import TodoItem from "./TodoItem.vue";
import TodoInput from "./TodoInput.vue";
import TodoFilter from "./TodoFilter.vue";
import { TodoFilterEnum, Todo } from "shared";
import { fetchTodoList } from "@/hook/useTodoList";

const filters = {
  [TodoFilterEnum.All]: (todos: Todo[]) => todos,
  [TodoFilterEnum.Active]: (todos: Todo[]) => todos.filter((v) => !v.isDone),
  [TodoFilterEnum.Done]: (todos: Todo[]) => todos.filter((v) => v.isDone),
};

const list = ref<Todo[]>([]);
const filter = ref(TodoFilterEnum.All);

const displayList = computed(() => {
  return filters[filter.value](list.value);
});
onMounted(async () => {
  list.value = await fetchTodoList();
});

function handleDelete(item: Todo) {
  list.value = list.value.filter((v) => v !== item);
}
function handleToggle(item: Todo, newStatus: Todo["isDone"]) {
  item.isDone = newStatus;
}
function handleAdd(label: string) {
  list.value.push(createNewAdd(label));
}
function handleChangeFilter(newFilter: TodoFilterEnum) {
  filter.value = newFilter;
}
function createNewAdd(label: string) {
  return new Todo({ label });
}
</script>

<style lang="less" scoped>
#todo-app-element2 {
  .todo-input,
  .todo-item {
    margin-bottom: 12px;
  }
}
</style>
