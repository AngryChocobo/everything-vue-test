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

<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps({
  label: {
    type: String,
  },
  isDone: {
    type: Boolean,
  },
});

const emit = defineEmits<{
  (e: "delete"): void;
  (e: "toggle", v: boolean): void;
}>();

function onDelete() {
  emit("delete");
}

const model = computed({
  get(): boolean {
    return props.isDone;
  },
  set(newValue: boolean) {
    emit("toggle", newValue);
  },
});
</script>

<style lang="less" scoped>
.done {
  text-decoration: line-through;
}
</style>
