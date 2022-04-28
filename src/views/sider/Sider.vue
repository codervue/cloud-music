<template>
  <div class="sider">
    <div
      v-for="(item, index) in value"
      :key="index"
      @click="itemClick(index)"
      :class="{ active: currentIndex === index }"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      value: ["发现音乐", "播客", "视频", "私人FM", "我喜欢的音乐"],
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
          this.path = "/fm";
          this.$router.replace(this.path).catch((err) => {});
          break;
        case 4:
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
  height: 425px;
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
  width: 179px;
  color: black;
  font-size: 18px;
  font-weight: 600;
  background-color: rgba(128, 128, 128, 0.096);
}
</style>