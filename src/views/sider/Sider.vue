<template>
  <div class="sider">
    <el-menu active-text-color="#000" router :default-active="activeMenu">
      <!-- 导航栏 -->
      <el-menu-item
        :index="item.path"
        v-for="item in menuList"
        :key="item.path"
        :disabled="isLogin === item.login"
      >
        <span slot="title">{{ item.title }}</span>
      </el-menu-item>

      <!-- 我的音乐-->
      <el-menu-item-group>
        <template slot="title">我的音乐</template>
        <el-menu-item
          :index="item.path"
          v-for="item in myMusic"
          :key="item.path"
          :disabled="isLogin === item.login"
        >
          {{ item.title }}
        </el-menu-item>
      </el-menu-item-group>

      <!-- 创建的歌单 -->
      <el-menu-item-group v-if="isLogin">
        <template slot="title">创建的歌单</template>
        <el-menu-item
          :index="`/listdetail/${item.id}`"
          v-for="item in playlist"
          :key="item.id"
        >
          <i class="iconfont icon-gedan"></i> {{ item.name }}
        </el-menu-item>
      </el-menu-item-group>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeMenu: "/find",
      menuList: [
        { path: "/find", title: "发现音乐" },
        { path: "/video", title: "视频", login: false },
      ],
      myMusic: [
        { path: "/myrecommend", title: "每日推荐", login: false },
        { path: "/recently", title: "最近播放" },
      ],
    };
  },
  computed: {
    playlist() {
      return this.$store.state.userPlayList;
    },
    isLogin() {
      return this.$store.state.isLogin;
    },
  },
  methods: {},
  watch: {
    //项目bug：浏览器刷新样式的回滚
    //监听路由，浏览器刷新时当前导航栏样式回滚
    // "$route.path"(val) {
    //   console.log(val);
    //   this.activeMenu = val;
    // },
  },
};
</script>

<style scoped='scoped'>
.sider {
  width: 20%;
  border-right: solid 1px rgba(223, 218, 218, 0.932);
}
.iconfont {
  /* 图标与文字对齐 */
  vertical-align: 0px;
}
</style>