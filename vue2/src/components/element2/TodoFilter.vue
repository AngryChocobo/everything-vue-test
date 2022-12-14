<template>
  <div>
    <el-radio-group v-model="model">
      <el-radio
        v-for="filter in filters"
        :key="filter.id"
        :label="filter.label"
        test-id="filter-item"
        >{{ filter.label }}</el-radio
      >
    </el-radio-group>
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
