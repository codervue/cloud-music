<template>
  <div>
    <tab-menu :menuList="menuList"></tab-menu>

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