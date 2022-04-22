<template>
  <div class="box">
    <div class="lyric" ref="lyric">
      <div
        class="lyric-item"
        v-for="(item, index) in lyric"
        :key="index"
        :class="{
          highLight:
            currentTime > lyric[index][0] && currentTime < lyric[index + 1][0],
        }"
      >
        {{ item[1] }}{{ lyricScroll(index) }}
      </div>
    </div>
  </div>
</template>

<script>
import { getLyric } from "@/network/song";
export default {
  data() {
    return {
      lyric: "",
      currentTime: "",
    };
  },
  methods: {
    //请求歌词
    getLyric(id) {
      getLyric(id).then((res) => {
        //处理歌词
        //去除\n
        let arr = res.lrc.lyric.split("\n");
        let time = "";
        let value = "";
        let result = [];
        //拆分数组
        arr.forEach((item) => {
          time = item.split("]")[0];
          value = item.split("]")[1];
          //time是一个字符串
          var t = time.slice(1).split(":");
          //去除空行并将结果压入数组,
          if (value != "") {
            result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value]);
          }
        });
        //结果存储
        this.lyric = result;
      });
    },
    //歌词滚动
    lyricScroll(index) {
      if (
        this.currentTime > this.lyric[index][0] &&
        this.currentTime < this.lyric[index + 1][0]
      ) {
        //整体歌词向上移动30px
        this.$refs.lyric.style.top = -(30 * (index - 2)) + "px";
      }
    },
  },
  watch: {
    "$store.state.songsId": {
      //立马执行，使第一次传歌曲时能获取到歌词
      immediate: true,
      //歌词的请求
      handler: function (id) {
        this.getLyric(id);
      },
    },
    //监听当前播放时间
    "$store.state.currentTime"(currentTime) {
      this.currentTime = currentTime;
    },
  },
};
</script>

<style scoped='scoped'>
.box {
  height: 180px;
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
}
.lyric-item {
  height: 30px;
  line-height: 30px;
  color: #666666;
  font-size: 12px;
  overflow: hidden;
  /* 歌词溢出禁止换行 */
  white-space: nowrap;
  /* 溢出部分省略号显示 */
  text-overflow: ellipsis;
  transition: all 0.5s;
}
.highLight {
  height: 55px;
  line-height: 55px;
  color: #000000;
  font-size: 15px;
  font-weight: 600;
  transition: all 0.5s;
}
</style>