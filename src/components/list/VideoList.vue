<template>
  <div class="box">
    <div class="card" v-for="(item, index) in videos" :key="index">
      <div class="image" @click="itemClick(item.data.vid)">
        <img v-lazy="item.data.coverUrl + '?param=250y140'" alt="" />
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
</style>