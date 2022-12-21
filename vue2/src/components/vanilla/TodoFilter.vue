<template>
  <div>
    <span v-for="filter in filters" :key="filter.id">
      <input
        type="radio"
        test-id="filter-item"
        name="filters"
        v-model="model"
        :value="filter.value"
        :id="filter.id"
      />
      <label :for="filter.id">{{ filter.label }}</label>
    </span>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { TodoFilterEnum } from "shared";

export default Vue.extend({
  props: {
    filter: {
      type: String as PropType<TodoFilterEnum>,
      default: TodoFilterEnum.All,
    },
  },
  data() {
    return {
      TodoFilterEnum,
      filters: [
        {
          id: "filter-All",
          value: TodoFilterEnum.All,
          label: "All",
        },
        {
          id: "filter-Active",
          value: TodoFilterEnum.Active,
          label: "Active",
        },
        {
          id: "filter-Done",
          value: TodoFilterEnum.Done,
          label: "Done",
        },
      ],
    };
  },
  computed: {
    model: {
      get(): TodoFilterEnum {
        return this.filter;
      },
      set(newValue: TodoFilterEnum) {
        this.$emit("toggle", newValue);
      },
    },
  },
});
</script>
