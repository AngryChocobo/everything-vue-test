<template>
  <span :style="{ paddingLeft: '5px', borderLeft: '10px solid ' + color }">{{
    color
  }}</span>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, watchEffect } from "vue";
export default defineComponent({
  props: ["params"],
  setup(props) {
    const color = computed(() => {
      return props.params.data[props.params.colDef.field];
    });

    watchEffect(() => {
      console.log("watch params", props.params);
    });
    onMounted(() => {
      //     watch: {
      //   params(newValue: any) {
      //     console.log("watch params", newValue);
      //   },
      // },
      // mounted() {
      console.log("onMounted", props.params);
      // },
    });
    return {
      color,
    };
  },
});
</script>
