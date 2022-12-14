<template>
  <div id="app">
    <div id="nav">
      <router-link to="/"> vanilla TodoApp </router-link> |
      <router-link to="/element2">element2 TodoApp</router-link>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({});
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
}
</style>
