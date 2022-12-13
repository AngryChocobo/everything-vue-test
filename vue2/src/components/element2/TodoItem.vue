<template>
  <div class="todo-item" test-id="todo-item">
    <el-checkbox type="checkbox" test-id="status-toggle" v-model="model" />
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
  mounted() {
    console.log(111, this);
  },
});
</script>

<style lang="less" scoped>
.done {
  text-decoration: line-through;
}
</style>
