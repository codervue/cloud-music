<template>
  <div id="find">
    <TabMenu
      :menuList="menuList"
      :activeIndex="activeIndex"
      :mode="'horizontal'"
    ></TabMenu>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import TabMenu from "@/components/elementui/TabMenu";

export default {
  name: "",
  data() {
    return {
      activeIndex: "/find/personrecommend",
      menuList: [
        { path: "/find/personrecommend", title: "个性推荐" },
        { path: "/find/songmenu", title: "歌单" },
        { path: "/find/rank", title: "排行榜" },
        { path: "/find/singer", title: "歌手" },
        { path: "/find/newsongs", title: "最新音乐" },
      ],
    };
  },
  mounted() {
    this.activeIndex = this.$route.path;
  },
  components: { TabMenu },

  methods: {},
};
</script>

<style scoped='scoped'>
</style>