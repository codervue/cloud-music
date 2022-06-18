<template>
  <div class="videos">
    <!-- 导航栏 -->
    <tabs
      :category="category"
      :currentItem="currentItem"
      @tabClick="tabClick"
    />
    <!-- 视频 -->
    <video-list :videos="videos"></video-list>
  </div>
</template>

<script>
import { videoList, videoGroup } from "@/network/video";
import VideoList from "@/components/list/VideoList";
import Tabs from "@/components/elementui/Tabs";
export default {
  data() {
    return {
      category: [],
      currentItem: "现场",
      videos: [],
    };
  },
  created() {
    videoList().then((res) => {
      this.category = res.data;
      //初始化时，调用第一个分类的数据
      this.videoGroup(this.category[0].id);
    });
  },
  components: { VideoList, Tabs },
  methods: {
    //video分类数据的请求
    videoGroup(id) {
      videoGroup(id).then((res) => {
        this.videos = res.datas;
      });
    },
    //点击分类切换回调
    tabClick(id) {
      //清空上一个分类数据
      this.videos = [];
      this.videoGroup(id);
    },
  },
  watch: {},
};
</script>

<style scoped='scoped'>
</style>