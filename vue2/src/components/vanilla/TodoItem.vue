<template>
  <div class="todo-item" data-cy="todo-item">
    <input type="checkbox" data-cy="status-toggle" v-model="model" />
    <span
      class="todo-label"
      data-cy="todo-label"
      :class="isDone ? 'done' : 'todo'"
    >
      {{ label }}
    </span>
    <button data-cy="delete-btn" @click="onDelete">delete</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
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
