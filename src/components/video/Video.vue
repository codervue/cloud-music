<template>
  <div class="video">
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
  name: "",
  data() {
    return {
      activeIndex: "/video/videos",
      menuList: [
        { path: "/video/videos", title: "视频" },
        { path: "/video/mv", title: "MV" },
      ],
    };
  },
  components: { TabMenu },

  methods: {},
  watch: {},
};
</script>

<style scoped='scoped'>
</style>