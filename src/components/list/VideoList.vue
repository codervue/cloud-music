<template>
  <div class="box">
    <div class="card" v-for="(item, index) in videos" :key="index">
      <div class="image" @click="itemClick(item.data.vid)">
        <img v-lazy="item.data.coverUrl + '?param=250y140'" alt="" />
        <div class="playcount" v-if="item.data.playTime">
          <i class="iconfont icon-bofang"></i>
          {{ item.data.playTime | countFormat }}
        </div>
        <div class="btn">
          <i class="iconfont icon-bofang"></i>
        </div>
      </div>
      <div class="word">{{ item.data.title || item.data.name }}</div>
      <div class="name" v-if="item.data.creator">
        by{{ item.data.creator.nickname }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    videos: {
      type: Array,
    },
  },
  data() {
    return {};
  },
  methods: {
    //点击实现视频播放跳转
    itemClick(vid) {
      // 保存视频状态用于判断是视频还是mv;
      this.$store.commit("isVideo", true);
      this.$router.push("/videodetail/" + vid).catch((error) => {});
    },
  },
};
</script>

<style scoped='scoped'>
.box {
  display: flex;
  flex-wrap: wrap;
}
.card {
  width: 33.3%;
  padding: 10px;
  box-sizing: border-box;
}
.image {
  position: relative;
}
.image img {
  width: 100%;
  height: 140px;
  border-radius: 5px;
  cursor: pointer;
}
.word {
  width: 100%;
  font-size: 12px;
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 3px 0;
}
.name {
  font-size: 12px;
  color: #9191916c;
}
.playcount {
  font-size: 12px;
  position: absolute;
  top: 5px;
  right: 5px;
  color: #ffffff;
}
.playcount i {
  font-size: 12px;
  color: aliceblue;
}
.btn {
  width: 30px;
  height: 30px;
  background-color: #fff;
  border-radius: 50%;
  position: absolute;
  right: 40%;
  bottom: 40%;
  text-align: center;
  line-height: 30px;
  opacity: 0;
  transition: all 1s;
  cursor: pointer;
}
.image:hover .btn {
  opacity: 1;
}
.btn i {
  font-size: 17px;
  color: red;
}
</style>