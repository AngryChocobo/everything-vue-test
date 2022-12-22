<template>
  <div class="todo-item" data-cy="todo-item">
    <a-checkbox
      type="checkbox"
      data-cy="status-toggle"
      v-model:checked="model"
    />
    <span
      class="todo-label"
      data-cy="todo-label"
      :class="isDone ? 'done' : 'todo'"
    >
      {{ label }}
    </span>
    <a-button data-cy="delete-btn" @click="onDelete">delete</a-button>
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
    onDelete() {
      this.$emit("delete");
    },
  },
  computed: {
    model: {
      get(): boolean {
        return this.isDone;
      },
      set(newValue: boolean) {
        this.$emit("toggle", newValue);
      },
    },
  },
});
</script>

<style lang="less" scoped>
.done {
  text-decoration: line-through;
}
</style>
