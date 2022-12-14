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
import { defineComponent, PropType } from "vue";
import { TodoFilterEnum } from "../../type/types";

export default defineComponent({
  props: {
    value: {
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
        return this.value;
      },
      set(newValue: TodoFilterEnum) {
        this.$emit("change", newValue);
      },
    },
  },
});
</script>
