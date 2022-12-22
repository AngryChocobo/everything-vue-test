<template>
  <div>
    <a-input
      data-cy="todo-input"
      placeholder="press enter add todo"
      v-model:value="value"
      @pressEnter="onEnter"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const value = ref("");
const emit = defineEmits<{
  (e: "add", arg: string): void;
}>();
function onEnter() {
  if (value.value) {
    emit("add", value.value);
    onClear();
  }
}
function onClear() {
  value.value = "";
}
</script>

<style lang="less" scoped></style>
