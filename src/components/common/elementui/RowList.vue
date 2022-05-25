<template>
  <div>
    <el-row>
      <el-button type="primary" @click="allClick">播放全部</el-button>
      <el-button type="success">收藏</el-button>
      <el-button type="info">分享</el-button>
      <el-button type="warning">下载全部</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
      allClick(){
          this.$emit("allClick")
      }
  },
};
</script>

<style scoped='scoped'>
</style>