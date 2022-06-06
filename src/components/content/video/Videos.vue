<template>
  <div class="videos">
    <div class="top">
      <!-- 这种写法控制台会报错，虽然效果一样，具体原因有待发掘 -->
      <!-- <div class="title">{{ arr[currentIndex].name }}></div> -->
      <div class="title">{{ currentItem }}></div>
      <div class="category">
        <span
          v-for="(item, index) in arr"
          :key="index"
          :class="{ active: currentIndex === index }"
          @click="tabClick(index)"
          >{{ item.name }}</span
        >
      </div>
    </div>

    <!-- 视频 -->
    <div class="box">
      <div class="card" v-for="(item, index) in videos" :key="index">
        <img
          :src="item.data.coverUrl + '?param=250y140'"
          alt=""
          @click="itemClick(item.data.vid)"
        />
        <div class="word">{{ item.data.title }}</div>
        <div class="name">by{{ item.data.creator.nickname }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { videoList, videoGroup } from "@/network/video";
export default {
  data() {
    return {
      arr: [],
      currentIndex: 0,
      currentItem: "现场",
      videos: [],
    };
  },
  created() {
    videoList().then((res) => {
      //截取前七个分类视频
      this.arr = res.data.slice(0, 7);
      //除去万有引力分类，（该分类无视频推荐）
      let data = this.arr.splice(4, 1);
      //初始化时，调用第一个分类的数据
      this.videoGroup(this.arr[0].id);
    });
  },
  mounted() {},
  methods: {
    //tabbar切换点击
    tabClick(index) {
      this.currentIndex = index;
      this.currentItem = this.arr[this.currentIndex].name;
      this.$store.commit("videoListId", this.arr[this.currentIndex].id);
    },
    //video分类数据的请求
    videoGroup(id) {
      videoGroup(id).then((res) => {
        this.videos = res.datas;
      });
    },
    //点击实现播放跳转
    itemClick(id) {
      this.$store.commit("videoId", id);
      //保存视频状态用于判断是视频还是mv
      this.$store.commit("isVideo", true);
      this.$router.push("/videodetail").catch((error) => {});
    },
  },
  watch: {
    "$store.state.videoListId": {
      handler: function (id) {
        this.videos = "";
        setTimeout(() => {
          this.videoGroup(id);
        }, 500);
      },
    },
  },
};
</script>

<style scoped='scoped'>
.top {
  display: flex;
  justify-content: space-between;
}
.title {
  line-height: 30px;
  height: 30px;
  font-size: 13px;
  text-align: center;
  width: 80px;
  border: solid 1px rgba(179, 171, 171, 0.336);
  border-radius: 15px;
}
.category span {
  margin: 0 10px;
  font-size: 12px;
  color: #919191;
}
.active {
  /* 权重不够，颜色不生效 */
  color: red !important;
  background-color: rgb(238, 175, 187);
}
.box {
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.card img {
  height: 140px;
  border-radius: 5px;
  cursor: pointer;
}
.word {
  width: 250px;
  font-size: 12px;
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 10px;
}
.name {
  font-size: 12px;
  color: #9191916c;
  margin-bottom: 20px;
}
</style>