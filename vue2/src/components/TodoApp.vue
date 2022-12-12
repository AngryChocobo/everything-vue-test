<template>
  <div test-id="todo-app">
    <h1>TodoApp</h1>
    <TodoItem
      v-for="item in displayList"
      :key="item.label"
      :label="item.label"
      :is-done="item.isDone"
      @delete="handleDelete(item)"
      @toggle="(newStatus) => handleToggle(item, newStatus)"
    >
      {{ item }}
    </TodoItem>
    <TodoInput @add="handleAdd" />
    <TodoFilter :filter="filter" @change="handleChangeFilter" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Todo } from "./type";
import TodoItem from "./TodoItem.vue";
import TodoInput from "./TodoInput.vue";
import TodoFilter from "./TodoFilter.vue";

const filters = {
  All: (todos: Todo[]) => todos,
  Active: (todos: Todo[]) => todos.filter((v) => !v.isDone),
  Done: (todos: Todo[]) => todos.filter((v) => v.isDone),
};

export default defineComponent({
  data() {
    return {
      list: [] as Todo[],
      filter: "All" as "All" | "Active" | "Done",
    };
  },
  components: {
    TodoItem,
    TodoInput,
    TodoFilter,
  },
  methods: {
    onToggleStatus(e: Event) {
      this.$emit("toggle", (e.target as HTMLInputElement).checked);
    },
    handleDelete(item: Todo) {
      this.list = this.list.filter((v) => v !== item);
    },
    handleToggle(item: Todo, newStatus: Todo["isDone"]) {
      item.isDone = newStatus;
    },
    handleAdd(label: string) {
      this.list.push(this.createNewAdd(label));
    },
    handleChangeFilter(newFilter: string) {
      this.filter = newFilter;
    },
    createNewAdd(label: string) {
      return new Todo({ label });
    },
  },
  computed: {
    displayList() {
      return filters[this.filter](this.list);
    },
  },
});
</script>

<style lang="less" scoped></style>
