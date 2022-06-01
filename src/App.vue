<template>
  <div id="app">
    <nav-bar></nav-bar>
    <div class="center">
      <sider class="sider"></sider>
      <!-- 视频详情不能缓存，否则无法刷新界面 -->
      <keep-alive exclude="videodetail,mylove">
        <router-view class="view"></router-view>
      </keep-alive>
    </div>
    <!-- 底部控制栏 -->
    <bottom-bar></bottom-bar>
    <!--歌曲详情卡片  -->
    <music-detail></music-detail>
    <!-- 抽屉 -->
    <drawer></drawer>
  </div>
</template>

<script>
import NavBar from "@/views/navbar/NavBar";
import Sider from "@/views/sider/Sider";
import BottomBar from "@/views/bottombar/BottomBar";
import MusicDetail from "@/components/common/musicdetail/MusicDetail.vue";
import Drawer from "@/components/common/drawer/Drawer.vue";

export default {
  name: "App",
  components: {
    NavBar,
    Sider,
    BottomBar,
    MusicDetail,
    Drawer,
  },
  created() {
    //浏览器刷新后回到首页 （浏览器刷新是刷新当前页面，所以加上判断）
    if (this.$router.path !== "/find") {
      this.$router.replace("/find");
    }
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
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
}
.center {
  height: 425px;
  display: flex;
}
.sider {
  width: 20%;
}
.view {
  width: 80%;
  /*竖直滚动 */
  overflow-y: scroll;
  padding: 10px;
}
.view::-webkit-scrollbar {
  display: none;
}
</style>
