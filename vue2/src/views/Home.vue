<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <TodoItem />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TodoItem from "@/components/TodoItem.vue";

export default Vue.extend({
  name: "Home",
  components: {
    TodoItem,
  },
});
</script>
