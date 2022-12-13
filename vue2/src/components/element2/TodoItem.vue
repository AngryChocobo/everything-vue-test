<template>
  <div class="todo-item" test-id="todo-item">
    <input
      type="checkbox"
      test-id="status-toggle"
      :checked="isDone"
      @change="onToggleStatus"
    />
    <span
      class="todo-label"
      test-id="todo-label"
      :class="isDone ? 'done' : 'todo'"
    >
      {{ label }}
    </span>
    <el-button test-id="delete-btn" @click="onDelete">delete</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    label: {
      type: String,
    },
    isDone: {
      type: Boolean,
    },
  },
  methods: {
    onToggleStatus(e: Event) {
      this.$emit("toggle", (e.target as HTMLInputElement).checked);
    },
    onDelete() {
      this.$emit("delete");
    },
  },
});
</script>

<style lang="less" scoped>
.done {
  text-decoration: line-through;
}
</style>
