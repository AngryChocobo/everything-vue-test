<template>
  <div>
    <a-input
      test-id="todo-input"
      placeholder="press enter add todo"
      v-model:value="value"
      @pressEnter="onEnter"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      value: "",
    };
  },
  methods: {
    onEnter() {
      if (this.value) {
        this.$emit("add", this.value);
        this.onClear();
      }
    },
    onClear() {
      this.value = "";
    },
  },
});
</script>

<style lang="less" scoped></style>
