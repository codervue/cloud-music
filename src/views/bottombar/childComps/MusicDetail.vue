<template>
  <div
    class="music-detail"
    :class="[$store.state.isShowSongsDetail ? '' : 'hide']"
  >
    <!-- 不能是根据songsId去决定是否展示，因为先请求songsId后再去请求songsDetail的，所以在请求songsId后会因为先渲染出来再去请求songsDetail而拿不到picUrl报错 -->
    <div class="center" v-if="$store.state.songsDetail">
      <div class="top">
        <div class="left">
          <div class="needle" :class="{ needleRotate: $store.state.isPlay }">
            <img src="@/assets/img/musicdetail/needle.png" alt="" />
          </div>
          <!-- 动态添加isCircle类名，达到切换歌曲重置唱片动画的效果，提升体验 -->
          <div
            class="record"
            :class="[
              $store.state.isPlay ? '' : 'pause',
              $store.state.songsLoading ? '' : 'isCircle',
            ]"
          >
            <img src="@/assets/img/musicdetail/disc.png" alt="" />
            <span class="avtar">
              <img :src="songsDetail.al.picUrl" alt="" />
            </span>
          </div>
        </div>
        <div class="right">
          <div class="title">
            <div class="name">{{ songsDetail.name }}</div>
            <div class="album">
              {{ songsDetail.al.name }} - {{ songsDetail.ar[0].name }}
            </div>
          </div>
          <lyric></lyric>
        </div>
      </div>

      <div class="bottom">
        <h3>热门评论:</h3>
        <div class="comment"></div>
      </div>
    </div>
    <!-- 当无音乐时展示 -->
    <div class="null" v-else>暂无播放音乐</div>
  </div>
</template>

<script>
import Lyric from "./Lyric.vue";
export default {
  data() {
    return {};
  },
  computed: {
    songsDetail() {
      return this.$store.state.songsDetail;
    },
  },
  components: {
    Lyric,
  },
  methods: {},
};
</script>

<style scoped='scoped'>
.music-detail {
  position: absolute;
  width: 100%;
  bottom: 80px;
  height: 426px;
  left: 0;
  z-index: 100;
  /* 实现过渡效果：执行宽度变化函数，0.5s执行所需时间，只执行一次，执行完后停留在目的地 */
  /* animation: my 0.5s 1 forwards; */
  /* 指定bottom属性的变化实现过渡效果（妙哉） */
  transition: bottom 0.5s ease;
  background-color: white;
  background-image: linear-gradient(to bottom, #e3e2e3, white);
  overflow-y: scroll;
}
/* 去除滚动条样式 */
.music-detail::-webkit-scrollbar {
  display: none;
}
.hide {
  bottom: -346px;
}
.needle img {
  height: 70px;
  margin-left: 85px;
}
.center {
  width: 500px;
  margin: 40px auto;
}
.top {
  width: 100%;
  display: flex;
}
.record img {
  width: 170px;
  height: 170px;
}
.right {
  width: 330px;
  text-align: center;
}
.name {
  color: #161616;
  font-size: 25px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.album {
  color: #919191;
  font-size: 13px;
  margin: 5px 0;
}
.record {
  position: relative;
}
.avtar {
  position: absolute;
  left: 25px;
  top: 25px;
  right: 25px;
  bottom: 25px;
}
.avtar img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}
.isCircle {
  /* linear,平均速度旋转，infinite：不限次数旋转 */
  animation: desc 20s linear infinite;
  animation-delay: 0.8s;
}
@keyframes desc {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.pause {
  animation-play-state: paused;
}
/* 针的动画属性 */
.needle {
  transition: all 1s;
  /* 指定从顶点中间位置开始旋转 */
  transform-origin: 50% 0;
  position: sticky;
  z-index: 1000;
}
.needleRotate {
  transform: rotate(30deg);
}
.null {
  text-align: center;
  line-height: 400px;
  color: #919191;
  font-size: 20px;
}
h3 {
  margin: 10px 0;
}
</style>