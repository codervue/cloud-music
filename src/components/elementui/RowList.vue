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
  props: {
    list: {
      type: Array,
    },
  },
  data() {
    return {};
  },
  methods: {
    allClick() {
      this.$confirm("播放全部将会替换当前播放列表, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let list = this.list;
          this.$store.commit("songsId", list[0].id);
          this.$store.commit("playList", list);
          this.$message({
            type: "success",
            message: "替换成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消替换",
          });
        });
    },
  },
};
</script>

<style scoped='scoped'>
</style>