<template>
  <div>
    <a-radio-group v-model:value="model">
      <a-radio
        v-for="filter in filters"
        :key="filter.id"
        :value="filter.label"
        test-id="filter-item"
        :test-data="filter.label"
        >{{ filter.label }}</a-radio
      >
    </a-radio-group>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import { TodoFilterEnum } from "shared";

export default defineComponent({
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
