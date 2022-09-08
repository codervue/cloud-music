<template>
  <div class="drawer">
    <el-drawer
      :visible.sync="isShowSongsDetail.isShow"
      :direction="isShowSongsDetail.direction"
      style="position: absolute"
      :modal="false"
      :size="isShowSongsDetail.size"
    >
    <!-- 动态切换组件 -->
      <component :is="currentComponent"></component>
    </el-drawer>
  </div>
</template>

<script>
import MusicDetail from "@/views/musicdetail/MusicDetail.vue";
import PlayList from "@/views/playlist/PlayList.vue";

export default {
  data() {
    return {};
  },
  created() {},
  computed: {
    isShowSongsDetail() {
      return this.$store.state.isShowSongsDetail;
    },
    currentComponent() {
      return this.$store.state.isShowSongsDetail.type === "musicdetail"
        ? "MusicDetail"
        : "PlayList";
    },
  },
  components: {
    MusicDetail,
    PlayList,
  },
  methods: {},
  watch: {},
};
</script>

<style scoped='scoped'>
</style>