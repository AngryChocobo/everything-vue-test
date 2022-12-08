<template>
  <div>
    <input type="checkbox" test-id="status-toggle" :checked="isDone" />
    <span
      class="todo-label"
      test-id="todo-label"
      :class="isDone ? 'done' : 'todo'"
    >
      {{ label }}
    </span>
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
    fuck() {
      this.label;
    },
  },
  mounted() {
    console.log(this);
  },
});
</script>

<style lang="less" scoped>
.status-toggle {
  .done {
    text-decoration: line-through;
  }
}
</style>
