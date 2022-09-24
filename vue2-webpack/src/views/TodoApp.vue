<template>
  <div>
    <el-input unit-test="input" v-model="inputStr" @keydown="onKeyDown" />
    <ul class="work-list" unit-test="work-list">
      <li v-for="work in workList" :key="work.id">
        <span class="content">{{ work.content }}</span>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      inputStr: "Hello",
      workList: [
        {
          id: 1,
          content: "Eat brunch",
        },
        {
          id: 2,
          content: "Go to 996",
        },
      ],
    };
  },
  props: {
    // value: {
    //   type: String,
    //   required: true,
    // },
  },
  methods: {
    onKeyDown(e: KeyboardEvent) {
      if (e.code === "Enter") {
        this.workList.push({
          id: this.workList.length + 1,
          content: this.inputStr,
        });
      }
    },
  },
});
</script>
<style lang="less">
//
</style>
