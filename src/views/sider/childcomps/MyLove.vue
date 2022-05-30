<template>
  <div class="mylove">
    <list-detail></list-detail>
  </div>
</template>

<script>
import { getUserPlayList } from "@/network/song";
import ListDetail from "@/components/common/listdetail/ListDetail";
export default {
  name: "mylove",
  data() {
    return {};
  },
  created() {},
  activated() {
    //组件激活需调用歌单id，否则数据被其他歌单占用
    this.getUserPlayList();
  },
  components: { ListDetail },

  methods: {
    //获取用户歌单
    getUserPlayList() {
      let userId = localStorage.getItem("userId");
      getUserPlayList(userId).then((res) => {
        //提交用户歌单id（目前只做了第一个歌单的展示）
        this.$store.commit("listDetailId", res.playlist[0].id);
      });
    },
  },
};
</script>

<style scoped='scoped'>
/* 给插件高度，否则加载动画定位不准确 */
.mylove >>> .el-loading-mask {
  height: 425px;
}
</style>