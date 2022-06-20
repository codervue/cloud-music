<template>
  <!-- 布局组件 -->
  <div id="lay-out">
    <!-- 顶部区域 -->
    <nav-bar></nav-bar>
    <!-- 中心区域 -->
    <div class="center">
      <!-- 左侧侧边栏 -->
      <sider></sider>
      <!-- 右侧浏览区 -->
      <transition name="el-zoom-in-top" mode="out-in">
        <!--加mode解决了我找啦好久的bug，因为动画淡出淡入默认是同时执行的，mode给了一个执行先后顺序的效果-->
        <router-view class="view" :key="$route.fullPath" />
        <!-- 动态绑定key值：解决相同路由直接的跳转数据不刷新问题 -->
      </transition>
    </div>
    <!-- 底部控制栏 -->
    <bottom-bar></bottom-bar>
    <!-- 抽屉 -->
    <drawer></drawer>
  </div>
</template>

<script>
import NavBar from "@/views/navbar/NavBar";
import Sider from "@/views/sider/Sider";
import BottomBar from "@/views/bottombar/BottomBar";
import Drawer from "@/components/elementui/Drawer.vue";
export default {
  data() {
    return {};
  },
  components: {
    NavBar,
    Sider,
    BottomBar,
    Drawer,
  },
  methods: {},
};
</script>

<style scoped='scoped'>
#lay-out {
  width: 1020px;
  margin: 15px auto;
  position: relative;
  /* 禁止用户鼠标在页面上选中文字/图片等 */
  user-select: none;
  /* 隐藏歌曲详情卡片*/
  overflow: hidden;
  /* 盒子阴影 */
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
}
.center {
  height: 540px;
  display: flex;
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