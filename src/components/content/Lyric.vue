<template>
  <div class="box">
    <div class="lyric" ref="lyric">
      <div
        class="lyric-item"
        v-for="(item, index) in lyric"
        :key="index"
        :class="{
          highLight:
            (currentTime > lyric[index][0] &&
              currentTime < lyric[index + 1][0]) ||
            (currentTime > lyric[lyric.length - 2][0] &&
              index === lyric.length - 2),
        }"
      >
        {{ item[1] }}{{ lyricScroll(index) }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    lyric: {
      type: Array,
    },
  },
  data() {
    return {
      currentTime: "",
    };
  },
  methods: {
    //歌词滚动
    lyricScroll(index) {
      if (
        this.currentTime > this.lyric[index][0] &&
        this.currentTime < this.lyric[index + 1][0]
      ) {
        //整体歌词到顶部的距离
        this.$refs.lyric.style.top = -(40 * (index - 2)) + "px";
      }
      if (this.currentTime > this.lyric[this.lyric.length - 2][0]) {
        this.$refs.lyric.style.top = -(40 * (this.lyric.length - 4)) + "px";
      }
    },
  },
  watch: {
    //监听当前播放时间
    "$store.state.currentTime"(currentTime) {
      this.currentTime = currentTime;
    },
  },
};
</script>

<style scoped='scoped'>
.box {
  height: 263px;
  margin-top: 15px;
  overflow-y: scroll;
  position: relative;
}
.box::-webkit-scrollbar {
  display: none;
}
.lyric {
  /* 受定位影响，居中无法生效，所以得给宽度才能生效 */
  width: 100%;
  position: absolute;
  top: 0;
  transition: all 1s;
}
.lyric-item {
  height: 40px;
  line-height: 40px;
  color: #666666;
  font-size: 15px;
  overflow: hidden;
  /* 歌词溢出禁止换行  */
  white-space: nowrap;
  /* 溢出部分省略号显示  */
  /* text-overflow: ellipsis; */
  /* transition: all 1s; */
}
.highLight {
  color: #000000;
  font-size: 16px;
  font-weight: 600;
}
</style>