<template>
  <div>
    <input
      type="radio"
      test-id="filter-item"
      name="filters"
      v-model="model"
      value="All"
      id="filter-All"
    />
    <label for="filter-All">All</label>
    <input
      type="radio"
      test-id="filter-item"
      name="filters"
      v-model="model"
      value="Active"
      id="filter-Active"
    />
    <label for="filter-Active">Active</label>
    <input
      type="radio"
      test-id="filter-item"
      name="filters"
      v-model="model"
      value="Done"
      id="filter-Done"
    />
    <label for="filter-Done">Done</label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    value: {
      type: String,
      default: "All",
    },
  },
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(newValue: string) {
        this.$emit("change", newValue);
      },
    },
  },
});
</script>
