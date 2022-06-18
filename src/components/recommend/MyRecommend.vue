<template>
  <div>
    <tab-menu :menuList="menuList" :activeIndex="activeIndex"></tab-menu>
    <transition name="el-zoom-in-center">
      <keep-alive>
        <router-view />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import TabMenu from "@/components/elementui/TabMenu";
export default {
  data() {
    return {
      activeIndex: "/myrecommend/recommendmusic",
      menuList: [
        { path: "/myrecommend/recommendmusic", title: "推荐音乐" },
        { path: "/myrecommend/recommendlist", title: "推荐歌单" },
      ],
    };
  },
  components: {
    TabMenu,
  },
  methods: {},
};
</script>

<style scoped='scoped'>
</style>