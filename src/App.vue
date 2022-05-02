<template>
  <div id="app">
    <nav-bar></nav-bar>
    <div class="center">
      <!-- 给外层包裹div防止脱离文档流 -->
      <sider class="sider"></sider>
      <!-- 视频详情不能缓存，否则无法刷新界面 -->
      <keep-alive exclude="videodetail">
        <router-view class="view"></router-view>
      </keep-alive>
    </div>
    <bottom-bar></bottom-bar>
    <!--歌曲详情卡片  -->
    <music-detail class="music-detail"></music-detail>
    <!-- 抽屉 -->
    <drawer></drawer>
  </div>
</template>

<script>
import NavBar from "@/views/navbar/NavBar";
import Sider from "@/views/sider/Sider";
import BottomBar from "@/views/bottombar/BottomBar";
import MusicDetail from "@/views/bottombar/childComps/MusicDetail.vue";
import Drawer from "./views/bottombar/childComps/Drawer.vue";

export default {
  name: "App",
  components: {
    NavBar,
    Sider,
    BottomBar,
    MusicDetail,
    Drawer,
  },
};
</script>

<style scoped="scoped">
#app {
  width: 1000px;
  margin: 50px auto;
  position: relative;
  user-select: none; /* 禁止用户鼠标在页面上选中文字/图片等 */
  /* 隐藏歌曲详情卡片*/
  overflow: hidden;
  /* 盒子阴影 */
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, .5);
}
.center {
  height: 425px;
}
.sider {
  float: left;
}
.view {
  float: right;
  width: 800px;
  height: 425px;
  overflow-y: scroll;
  /*竖直滚动 */
}
.view::-webkit-scrollbar {
  display: none;
}
</style>
