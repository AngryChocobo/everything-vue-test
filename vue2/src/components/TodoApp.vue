<template>
  <div test-id="todo-app">
    <h1>TodoApp</h1>
    <TodoItem
      v-for="item in list"
      :key="item.label"
      :label="item.label"
      :is-done="item.isDone"
      @delete="handleDelete(item)"
      @toggle="(newStatus) => handleToggle(item, newStatus)"
    >
      {{ item }}
    </TodoItem>

    <TodoInput @add="handleAdd" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Todo } from "./type";
import TodoItem from "./TodoItem.vue";
import TodoInput from "./TodoInput.vue";

export default defineComponent({
  data() {
    return {
      list: [] as Todo[],
    };
  },
  components: {
    TodoItem,
    TodoInput,
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
    createNewAdd(label: string) {
      return new Todo({ label });
    },
  },
});
</script>

<style lang="less" scoped></style>
