<template>
  <div>
    <el-input unit-test="input" v-model="inputStr" />
    <ul class="work-list" unit-test="work-list">
      <li v-for="work in workList" :key="work.id">
        <span class="content">{{ work.content }}</span>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
export default {
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
};
</script>
<style lang="less">
//
</style>
