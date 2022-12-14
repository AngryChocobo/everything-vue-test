<template>
  <div>
    <input
      type="text"
      test-id="todo-input"
      placeholder="press enter add todo"
      v-model="value"
      @keyup.enter="onEnter"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
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
