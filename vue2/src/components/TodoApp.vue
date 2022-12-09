<template>
  <div test-id="todo-app">
    <h1>TodoApp</h1>
    <TodoItem
      v-for="item in list"
      :key="item.label"
      :label="item.label"
      :is-done="item.isDone"
      @delete="handleDelete(item)"
      @add="handleAdd(item)"
    >
      {{ item }}
    </TodoItem>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Todo } from "./type";
import TodoItem from "./TodoItem.vue";

export default defineComponent({
  data() {
    return {
      list: [] as Todo[],
    };
  },
  components: {
    TodoItem,
  },
  methods: {
    onToggleStatus(e: Event) {
      this.$emit("toggle", (e.target as HTMLInputElement).checked);
    },
    handleDelete(item: Todo) {
      this.list = this.list.filter((v) => v !== item);
    },
    handleAdd(item: Todo) {
      this.list.push(item);
    },
  },
});
</script>

<style lang="less" scoped></style>
