<template>
  <div>
    <el-pagination
      layout="prev, pager, next"
      :total="1000"
      @current-change="currentChange"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  inject: ["currentChange"],
  methods: {},
};
</script>

<style scoped='scoped'>
</style>