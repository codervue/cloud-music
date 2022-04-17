<template>
  <div class="sider">
    <div v-for="(item, index) in value" :key="index" @click="itemClick(index)">
      <span :class="{ active: currentIndex === index }">{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      value: [
        "发现音乐",
        "博客",
        "视频",
        "关注",
        "直播",
        "私人FM",
        "本地与下载",
        "最近播放",
        "我的音乐云盘",
        "我的博客",
        "我的收藏",
        "我喜欢的音乐",
      ],
      path: "",
      currentIndex: 0,
    };
  },

  components: {},

  methods: {
    itemClick(index) {
      //点击字体变粗
      this.currentIndex = index;
      switch (index) {
        case 0:
          this.path = "/find";
          this.$router.replace(this.path).catch((err) => {});
          break;
        case 1:
          this.path = "/boke";
          this.$router.replace(this.path).catch((err) => {});
          break;
        case 2:
          this.path = "/video";
          this.$router.replace(this.path).catch((err) => {});
          break;
        case 3:
          this.path = "/focus";
          this.$router.replace(this.path).catch((err) => {});
          break;
        case 4:
          this.path = "/live";
          this.$router.replace(this.path).catch((err) => {});
          break;
        case 5:
          this.path = "/fm";
          this.$router.replace(this.path).catch((err) => {});
          break;
        case 6:
          this.path = "/local";
          this.$router.replace(this.path).catch((err) => {});
          break;
        case 7:
          this.path = "/now";
          this.$router.replace(this.path).catch((err) => {});
          break;
        case 8:
          this.path = "/cloud";
          this.$router.replace(this.path).catch((err) => {});
          break;
        case 9:
          this.path = "/myboke";
          this.$router.replace(this.path).catch((err) => {});
          break;
        case 10:
          this.path = "/my";
          this.$router.replace(this.path).catch((err) => {});
          break;
        case 11:
          this.path = "/mylove";
          this.$router.replace(this.path).catch((err) => {});
          break;
      }
    },
  },
};
</script>

<style scoped="scoped">
.sider {
  width: 199px;
  border-right: solid 1px rgba(179, 171, 171, 0.336);
  /* 因为宽度问题导致我找了一晚上。。。浮动元素宽度大于父亲宽度所引起下一行显示 */
}
.sider div {
  height: 30px;
  line-height: 30px;
  margin: 5px 10px;
  color: rgb(68, 64, 64);
  cursor: pointer;
}
.sider div:hover {
  background-color: rgba(128, 128, 128, 0.096);
}
.active {
  color: black;
  font-size: 18px;
}
</style>