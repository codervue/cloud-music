<template>
<!-- 视频页面需登录才能获取数据 -->
  <div class="box" v-if="$store.state.isLogin">
    <div class="video">
      <div
        v-for="(item, index) in data"
        :key="index"
        class="word"
        :class="{ active: currentIndex === index }"
        @click="tabClick(index)"
      >
        {{ item }}
      </div>
    </div>
    <keep-alive>
      <router-view class="view"></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      data: ["视频", "MV"],
      currentIndex: 0,
    };
  },
  activated(){
    if(!this.$store.state.isLogin){
      this.$message.error("登入后获取视频详情")
    }
  },
  components: {},

  methods: {
    tabClick(index) {
      this.currentIndex = index;
      switch (index) {
        case 0:
          this.$router.push("/video/videos").catch((error) => {});
          break;
        case 1:
          this.$router.push("/video/mv").catch((error) => {});
          break;
      }
    },
  },
};
</script>

<style scoped='scoped'>
.video {
  display: flex;
  margin: 10px 0;
}
.word {
  margin-right: 20px;
  cursor: pointer;
}
.active {
  font-weight: 600;
  font-size: 20px;
  border-bottom: solid 3px red;
}
</style>