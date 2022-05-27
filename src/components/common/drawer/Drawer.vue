<template>
  <div class="drawer" :class="[$store.state.isOpen ? '' : 'hide']">
    <!-- 播放列表 -->
    <div class="list">播放列表({{$store.state.drawerList.length}})</div>
    <table-list :result="result" :length1="90" :length2="90" :isShow="false"></table-list>
  </div>
</template>

<script>
import { handleMusicTime } from "@/plugins/utils";
import TableList from "../elementui/TableList.vue";


export default {
  data() {
    return {};
  },
  computed: {
    result() {
      return this.$store.state.drawerList;
    },
  },
  components: {
    TableList,
  },
  methods: {},
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
  border-left: solid 1px rgba(223, 218, 218, 0.932);
  background-color: #fff;
  transition: all 0.5s ease;
  overflow-y: scroll;
}
.drawer::-webkit-scrollbar {
  display: none;
}
.hide {
  right: -301px;
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