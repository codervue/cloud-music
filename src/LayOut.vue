<template>
  <!-- 布局组件 -->
  <div id="lay-out">
    <el-container>
      <el-header>
        <!-- 导航栏 -->
        <nav-bar></nav-bar>
      </el-header>
      <el-container>
        <el-aside width="20%">
          <!-- 侧边栏 -->
          <sider />
        </el-aside>
        <el-main>
          <el-collapse-transition>
            <!-- 浏览区 -->
            <router-view :key="$route.fullPath" />
          </el-collapse-transition>
        </el-main>
      </el-container>
      <el-footer height="70px">
        <!-- 底部控制栏 -->
        <bottom-bar></bottom-bar>
      </el-footer>
    </el-container>
    <!-- 抽屉 -->
    <drawer />
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
  /* 盒子阴影 */
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
}
</style>