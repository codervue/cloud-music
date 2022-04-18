<template>
  <div id="bottom-bar">
    <!-- 播放器 -->
    <audio
      autoplay
      :src="songsUrl"
      ref="audio"
      @pause="changeState(false)"
      @play="changeState(true)"
      @timeupdate="timeUpDate"
      @ended="nextClick"
    ></audio>
    <!-- 左边栏歌曲信息 -->
    <div class="left" v-if="$store.state.songsDetail">
      <span class="img" @click="$store.commit('isShowSongsDetail')"
        ><img :src="songsDetail.al.picUrl" alt="" />
      </span>
      <span class="song">
        <p class="pop-name">{{ songsDetail.name }}</p>
        <p class="pop">
          {{ songsDetail.ar[0].name }}
        </p>
      </span>
      <span class="love"></span>
    </div>

    <div class="left" v-else>
      <span class="img" @click="$store.commit('isShowSongsDetail')">
        <img src="@/assets/img/music.svg" alt="" />
      </span>
    </div>

    <div class="center">
      <!-- 控制栏 -->
      <div class="control">
        <span @click="nextClick"
          ><img src="@/assets/img/pre.svg" alt=""
        /></span>
        <span @click="playClick" v-if="!$store.state.isPlay"
          ><img src="@/assets/img/stop.svg" alt=""
        /></span>
        <span @click="stopClick" v-else
          ><img src="@/assets/img/play.svg" alt=""
        /></span>
        <span @click="nextClick"
          ><img src="@/assets/img/next.svg" alt=""
        /></span>
      </div>
      <!-- 进度条 -->
      <div class="block">
        <span class="demonstration">{{ currentTime }}</span>
        <span class="slider"
          ><el-slider
            v-model="timeProgress"
            :show-tooltip="false"
            @change="changeProgress"
            @mousedown.native="isChange = true"
            @mouseup.native="isChange = false"
          ></el-slider
        ></span>
        <span class="demonstration">{{ totalTime }}</span>
      </div>
    </div>
    <!-- 音量 -->
    <div class="right">
      <el-slider
        ref="slider"
        class="sound"
        v-model="soundProgress"
        @input="changeSound"
        vertical
        height="100px"
      ></el-slider>
      <span
        v-if="soundProgress == 0"
        @mouseover="appearSound"
        @click="returnClick"
        ><img src="@/assets/img/mute.svg" alt=""
      /></span>
      <span v-else @mouseover="appearSound" @click="muteClick"
        ><img src="@/assets/img/listen.svg" alt=""
      /></span>
      <span @click="tableClick" title="播放列表">
        <img src="@/assets/img/list.svg" alt="" />
      </span>
    </div>

    <!-- 抽屉 -->
  </div>
</template>

<script>
import { getSongsUrl, getSongsDetail } from "@/network/song";
import { handleMusicTime, returnSecond, s_to_hs } from "@/plugins/utils";
export default {
  name: "",
  data() {
    return {
      //当前时间
      currentTime: "00.00",
      //总时长
      totalTime: "00.00",
      //总时长（s）
      secondTime: "0",
      //当前进程
      timeProgress: 0, //必须设置个初始值
      //进度条是否被拖拽
      isChange: false,
      //音量进程
      soundProgress: 30,
      //当前音量
      currentVolumn: 0,
    };
  },
  computed: {
    songsUrl() {
      return this.$store.state.songsUrl;
    },
    songsDetail() {
      return this.$store.state.songsDetail;
    },
  },
  components: {},

  methods: {
    //更新播放状态
    changeState(state) {
      this.$store.commit("isPlay", state);
    },
    //点击停止播放
    stopClick() {
      this.$refs.audio.pause();
    },
    //点击播放
    playClick() {
      if (this.$store.state.songsId) {
        this.$refs.audio.play();
      } else {
        this.$message("暂无歌曲源");
      }
    },
    //上下一曲随机播放一首（暂且播放我歌单列表里的音乐）
    nextClick() {
      if (this.$store.state.songsId) {
        let num = Math.floor(
          Math.random() * this.$store.state.listDetail.playlist.tracks.length
        ); //可均衡获取0到所有歌曲数的随机整数。
        let randomId = this.$store.state.listDetail.privileges[num].id;
        //提交随机歌曲id
        this.$store.commit("songsId", randomId);
      }
    },

    //进度条相关
    timeUpDate() {
      //当进度条被拖拽时暂停事件执行
      if (this.isChange) return;
      //拿取当前播放时间（s）
      let time = this.$refs.audio.currentTime;
      //提交当前播放时间
      this.$store.commit("currentTime", time);
      //取整
      time = Math.floor(time);
      //将time传给当前时间展示
      this.currentTime = s_to_hs(time); //将秒转换成分处理
      //进度条长度
      this.timeProgress = Math.floor((time / this.secondTime) * 100);
    },
    //拖动进度条事件(由于受播放器不断更新当前时间影响，拖拽事件无法达到预期，所以需要在拉取进度条时禁止播放器更新时间鼠标松开后恢复调用)
    changeProgress(e) {
      //修改当前播放时间
      this.$refs.audio.currentTime = Math.floor((e / 100) * this.secondTime);
      //当进度条松开时，拖拽状态为false
      this.isChange = false;
    },
    //鼠标移入显示声音
    appearSound() {
      this.$refs.slider.$el.style.display = "block";
      //3s后消失，(移出消失效果有点不优雅，暂且搁置)
      setTimeout(() => {
        this.$refs.slider.$el.style.display = "none";
      }, 3000);
    },
    //音量回调
    changeSound(e) {
      //音量0.0表示静音，1.0表示最大。所以除100
      this.$refs.audio.volume = e / 100;
    },
    //点击静音
    muteClick() {
      //存储当前音量值
      this.currentVolumn = this.soundProgress;
      this.soundProgress = 0;
    },
    //点击恢复音量
    returnClick() {
      this.soundProgress = this.currentVolumn;
    },
    //请求歌曲相关
    getSongsUrl() {
      //提交加载状态，实现歌曲详情卡片重置动画的效果，提高用户体验
      this.$store.commit("songsLoading", true);
      getSongsUrl(this.$store.state.songsId).then((res) => {
        this.$store.commit("songsUrl", res.data[0].url);
        this.$store.commit("songsLoading", false);
      });
    },
    getSongsDetail() {
      getSongsDetail(this.$store.state.songsId).then((res) => {
        this.$store.commit("songsDetail", res.songs[0]);
        //处理时长(时间戳)
        this.totalTime = handleMusicTime(res.songs[0].dt);
        //将歌曲总时长(分)转换为秒数
        this.secondTime = returnSecond(this.totalTime);
      });
    },
    //点击抽屉回调
    tableClick(){
      this.$store.commit("isOpen")
    }
  },
  watch: {
    //监听vuex中歌曲id改变
    "$store.state.songsId"() {
      //先暂停当前歌曲播放，一个播放效果动画
      this.$refs.audio.pause();
      //通过id获取歌曲url
      this.getSongsUrl();
      //获取歌曲详情
      this.getSongsDetail();
      //提交播放状态
      this.$store.commit("isPlay", true);
    },
  },
};
</script>

<style scoped="scoped">
#bottom-bar {
  width: 100%;
  height: 80px;
  border-top: solid 1px rgba(179, 171, 171, 0.336);
  display: flex;
  /* 设置定位使得优先级最高，不会被歌曲详情所覆盖 ，且必须设置背景色*/
  position: sticky;
  /* 不能太高否则会覆盖掉登录界面 */
  z-index: 1000;
  background-color: #fff;
}
.left {
  display: flex;
  width: 300px;
}
.left span img {
  height: 60px;
  cursor: pointer;
  margin: 10px;
  border-radius: 10px;
}
.center {
  width: 500px;
  text-align: center;
}
.control {
  text-align: center;
  margin-top: 20px;
}
.control span img {
  height: 20px;
  margin: 0 15px;
  cursor: pointer;
}

.block {
  display: flex;
  justify-content: space-between;
}
.slider {
  width: 400px;
  vertical-align: middle;
}
.demonstration {
  font-size: 12px;
  vertical-align: middle;
  line-height: 38px;
  color: rgba(132, 132, 150, 0.87);
}
.right {
  line-height: 81px;
  margin-left: 60px;
  z-index: 10000;
}
.right span img {
  height: 20px;
  margin: 0 15px;
  cursor: pointer;
}
.pop-name {
  width: 120px;
  color: rgba(15, 0, 0, 0.802);
  font-size: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.pop {
  width: 120px;
  font-size: 12px;
  color: #919191;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.sound {
  display: none;
  float: right;
  bottom: 80px;
  right: 90px;
}
</style>
