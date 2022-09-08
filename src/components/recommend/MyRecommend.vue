<template>
  <div>
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