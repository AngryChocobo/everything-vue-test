<template>
  <div data-cy="todo-app" id="todo-app-antdv">
    <h1>{{ $t("todoAppTitle") }}</h1>
    <TodoItem
      v-for="item in displayList"
      :key="item.label"
      :label="item.label"
      :is-done="item.isDone"
      @delete="deleteTodo(item)"
      @toggle="(newStatus:boolean) => toggleTodo(item, newStatus)"
      class="todo-item"
    >
      {{ item }}
    </TodoItem>
    <TodoInput @add="addTodo" class="todo-input" />
    <TodoFilter :filter="filter" @toggle="setFilter" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import TodoItem from "./TodoItem.vue";
import TodoInput from "./TodoInput.vue";
import TodoFilter from "./TodoFilter.vue";
import { fetchTodoList } from "@/hook/useTodoList";
import { useTodoListStore } from "@/stores/todos";
import { storeToRefs } from "pinia";

const store = useTodoListStore();
const { deleteTodo, toggleTodo, addTodo, setFilter } = store;
const { displayList, filter } = storeToRefs(store);

onMounted(async () => {
  store.setList(await fetchTodoList());
});
</script>

<style lang="less" scoped>
#todo-app-antdv {
  .todo-input,
  .todo-item {
    margin-bottom: 12px;
  }
}
</style>
