<template>
  <div class="drawer">
    <el-drawer
      :visible.sync="isShowSongsDetail.isShow"
      :direction="isShowSongsDetail.direction"
      style="position: absolute"
      :modal="false"
      :size="isShowSongsDetail.size"
    >
      <music-detail
        v-if="isShowSongsDetail.type === 'musicdetail'"
      ></music-detail>
      <play-list v-if="isShowSongsDetail.type === 'playlist'"></play-list>
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