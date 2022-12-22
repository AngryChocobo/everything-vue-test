<template>
  <div>
    <a-radio-group v-model:value="model">
      <a-radio
        v-for="filter in filters"
        :key="filter.id"
        :value="filter.label"
        data-cy="filter-item"
        :data-cy-data="filter.label"
        >{{ filter.label }}</a-radio
      >
    </a-radio-group>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import type { PropType } from "vue";
import { TodoFilterEnum } from "shared";

const props = defineProps({
  filter: {
    type: String as PropType<TodoFilterEnum>,
    default: TodoFilterEnum.All,
  },
});

const emit = defineEmits<{
  (e: "toggle", value: TodoFilterEnum): void;
}>();

// TODO refactor: move this to shared
const filters = [
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
];
const model = computed({
  get(): TodoFilterEnum {
    return props.filter;
  },
  set(newValue: TodoFilterEnum) {
    emit("toggle", newValue);
  },
});
</script>
