<template>
  <div>
    <input type="checkbox" test-id="status-toggle" :checked="isDone" />
    <span class="todo-label" test-id="todo-label">
      {{ label }}
    </span>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    label: {
      type: String,
    },
    isDone: {
      type: Boolean,
    },
  },
};
</script>

<style lang="less" scoped>
//
</style>
