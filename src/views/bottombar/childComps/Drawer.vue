<template>
  <div class="drawer" :class="[$store.state.isOpen ? '' : 'hide']">
    <!-- 播放列表 -->
    <div class="list">播放列表</div>
    <el-table
      stripe
      style="width: 100%"
      :data="$store.state.drawerList"
      @row-dblclick="songsClick"
    >
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
  methods: {
    //双击歌曲实现播放
    songsClick(row) {
      //将歌曲id提交到vuex中
      this.$store.commit("songsId", row.id);
    },
  },
  watch: {
    //监听歌曲详情改变，如果监听歌曲id改变因为异步问题无法拿到第一首歌的歌曲详情
    "$store.state.songsDetail"(result) {
      //这里不能进行深度监听否则会报警告提示，按照逻辑应该是要进行深度监听的（目前不清楚原因所在）
      //存储歌曲信息
      this.$store.commit("drawerList", result);
      //处理歌曲时长
      result.dt = handleMusicTime(result.dt);
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
  border: solid 1px rgba(179, 171, 171, 0.336);
  background-color: #fff;
  transition: all 0.5s ease;
  overflow-y: scroll;
}
.drawer::-webkit-scrollbar {
  display: none;
}
.hide {
  right: -302px;
}
.list {
  color: #919191;
  font-size: 13px;
  text-align: center;
  margin: 5px 0;
}
/* 样式穿透，修改element-ui的样式 */
/* .drawer >>> .el-table .cell {
  white-space: nowrap;
} */
</style>