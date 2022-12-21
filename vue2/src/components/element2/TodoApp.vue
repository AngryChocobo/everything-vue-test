<template>
  <div test-id="todo-app" id="todo-app-element2">
    <h1>Element2 TodoApp</h1>
    <TodoItem
      v-for="item in displayList"
      :key="item.label"
      :label="item.label"
      :is-done="item.isDone"
      @delete="handleDelete(item)"
      @toggle="(newStatus) => handleToggle(item, newStatus)"
      class="todo-item"
    >
      {{ item }}
    </TodoItem>
    <TodoInput @add="handleAdd" class="todo-input" />
    <TodoFilter :filter="filter" @toggle="handleChangeFilter" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
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

export default Vue.extend({
  data() {
    return {
      list: [
        {
          label: "Eat breakfast",
          isDone: true,
        },
        {
          label: "Go to Work",
          isDone: false,
        },
      ] as Todo[],
      filter: TodoFilterEnum.All,
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
    handleChangeFilter(newFilter: TodoFilterEnum) {
      this.filter = newFilter;
    },
    createNewAdd(label: string) {
      return new Todo({ label });
    },
  },
  computed: {
    displayList(): Todo[] {
      return filters[this.filter](this.list);
    },
  },
  async mounted() {
    this.list = await fetchTodoList();
  },
});
</script>

<style lang="less" scoped>
#todo-app-element2 {
  .todo-input,
  .todo-item {
    margin-bottom: 12px;
  }
}
</style>
