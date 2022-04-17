<template>
  <div class="drawer" :class="[$store.state.isOpen ? '' : 'hide']">
    <!-- 播放列表 -->
    <div class="list">播放列表</div>
    <el-table stripe style="width: 100%" :data="$store.state.drawerList">
      <el-table-column prop="name" label="标题" width="100px">
      </el-table-column>
      <el-table-column prop="ar[0].name" label="歌手" width="100px">
      </el-table-column>
      <el-table-column prop="dt" label="时长"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { handleMusicTime } from "@/plugins/utils";

export default {
  data() {
    return {};
  },
  methods: {},
  watch: {
    //监听歌曲详情改变，如果监听歌曲id改变因为异步问题无法拿到第一首歌的歌曲详情
    "$store.state.songsDetail": {
      //immediate:true,//不能加上该属性，否则出现警告提示，而且列表第一个值为空值，虽然不影响运行（具体原因有待发掘）
      handler: function () {
        //存储歌曲信息
        this.$store.commit("drawerList", this.$store.state.songsDetail);
        //处理歌曲时长
        this.$store.state.songsDetail.dt = handleMusicTime(
          this.$store.state.songsDetail.dt
        );
      },
    },
  },
};
</script>

<style scoped='scoped'>
.drawer {
  position: absolute;
  top: 50px;
  bottom: 80px;
  right: 0;
  height: 425px;
  z-index: 100;
  width: 300px;
  background-color:#fff;
  transition: all 0.5s ease;
  overflow-y: scroll;
}
.drawer::-webkit-scrollbar {
  display: none;
}
.hide {
  right: -300px;
}
.list {
  color: #919191;
  font-size: 13px;
  text-align: center;
  margin: 5px 0;
}
</style>