<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/todolist">TodoList</router-link>
    </div>
    <router-view /> -->
    ok
    <TodoItem label="Hello" :isDone="true" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TodoItem from "@/components/TodoItem.vue";

export default Vue.extend({
  components: {
    TodoItem,
  },
});
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
}
</style>
