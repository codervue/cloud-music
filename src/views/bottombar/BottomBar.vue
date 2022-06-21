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
      <div class="img" @click="$store.commit('isShowSongsDetail')">
        <img v-lazy="songsDetail.al.picUrl" alt="" />
      </div>
      <div class="song">
        <div class="pop-name">
          <span class="p-name common" @click="popClick(songsDetail.name)">
            {{ songsDetail.name }}
          </span>

          <!-- 未喜欢-->
          <span
            v-if="!isLiked(songsDetail.id)"
            class="icon aixin"
            @click="likedMusic(songsDetail.id)"
            title="喜欢"
          >
            <i class="iconfont icon-aixin1"></i>
          </span>
          <!-- 喜欢 -->
          <span v-else class="icon aixin" @click="likedMusic(songsDetail.id)">
            <i class="iconfont icon-aixin2"></i>
          </span>
        </div>

        <div class="pop">
          <span class="common" @click="singerClick(songsDetail.ar[0].id)">
            {{ songsDetail.ar[0].name }}
          </span>
        </div>
      </div>
    </div>

    <div class="left" v-else>
      <span class="img" @click="$store.commit('isShowSongsDetail')">
        <img src="@/assets/img/music.svg" alt="" />
      </span>
    </div>

    <!-- 中间控制栏 -->
    <div class="center">
      <div class="control">
        <span @click="nextClick"
          ><i class="iconfont icon-shangyishou"></i
        ></span>
        <span
          @click="playClick"
          v-if="!$store.state.isPlay"
          class="iconfont icon-bofang"
          ><i></i
        ></span>
        <span @click="stopClick" v-else>
          <i class="iconfont icon-zantingtingzhi"></i
        ></span>
        <span @click="nextClick"><i class="iconfont icon-xiayishou"></i></span>
      </div>

      <!-- 进度条 -->
      <div class="block">
        <span class="demonstration">{{
          $store.state.currentTime | timeFormat
        }}</span>
        <span class="slider"
          ><el-slider
            v-model="timeProgress"
            :show-tooltip="false"
            @change="changeProgress"
            @mousedown.native="isChange = true"
            @mouseup.native="isChange = false"
          ></el-slider
        ></span>
        <span class="demonstration">{{ (totalTime / 1000) | timeFormat }}</span>
      </div>
    </div>
    <!-- 音量 -->
    <div class="right">
      <div class="sound">
        <el-slider
          v-model="soundProgress"
          @input="changeSound"
          vertical
          height="100px"
          :show-tooltip="false"
        ></el-slider>
      </div>
      <div
        v-if="soundProgress == 0"
        @mouseover="appearSound"
        @click="returnClick"
      >
        <img src="@/assets/img/mute.svg" alt="" />
      </div>
      <div v-else @mouseover="appearSound" @click="muteClick">
        <img src="@/assets/img/listen.svg" alt="" />
      </div>
      <div @click="tableClick" title="播放列表">
        <img src="@/assets/img/list.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import { getSongsUrl, getSongsDetail } from "@/network/song";

export default {
  name: "",
  data() {
    return {
      songsUrl: "",
      //总时长
      totalTime: "00.00",
      //当前进程
      timeProgress: 0,
      //进度条是否被拖拽
      isChange: false,
      //音量进程
      soundProgress: 30,
      //当前音量
      currentVolumn: 0,
    };
  },
  computed: {
    songsDetail() {
      return this.$store.state.songsDetail;
    },
  },
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
    // 上下一曲随机播放(播放列表)
    nextClick() {
      let playList = this.$store.state.playList;
      if (!playList.length) return this.$message("当前列表没有预播放歌曲");
      let num = Math.floor(Math.random() * playList.length);
      let randomId = playList[num].id;
      // 提交随机歌曲id;
      this.$store.commit("songsId", randomId);
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
      //百分比化
      let percent = ((time * 1000) / this.totalTime) * 100;
      percent = Math.floor(percent);
      this.timeProgress = percent;
    },
    //拖动进度条事件(由于受播放器不断更新当前时间影响，拖拽事件无法达到预期，所以需要在拉取进度条时禁止播放器更新时间,鼠标松开后恢复调用)
    changeProgress(e) {
      //修改当前播放时间
      this.$refs.audio.currentTime = ((e / 100) * this.totalTime) / 1000;
      //当进度条松开时，拖拽状态为false
      this.isChange = false;
    },
    //鼠标移入显示声音
    appearSound() {
      let div = document.getElementsByClassName("sound")[0];
      div.style.display = "block";
      //3s后消失，(移出消失效果有点不优雅，暂且搁置)
      setTimeout(() => {
        div.style.display = "none";
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
    getSongsUrl(id) {
      getSongsUrl(id).then((res) => {
        if (res.data[0].url != null) {
          this.songsUrl = res.data[0].url;
        } else {
          this.$message({
            message: "该歌曲暂无版权",
            type: "warning",
          });
        }
      });
    },
    getSongsDetail(id) {
      getSongsDetail(id).then((res) => {
        this.$store.commit("songsDetail", res.songs[0]);
        //存储时长(时间戳)
        this.totalTime = res.songs[0].dt;
      });
    },
    //点击抽屉回调
    tableClick() {
      this.$store.commit("isShowSongsDetail", {
        isShow: true,
        type: "playlist",
        direction: "rtl",
        size: "40%",
      });
    },
    //点击歌名回调
    popClick(item) {
      this.$router.push("/searchdetail/" + item).catch((err) => {});
    },
    //点击歌手的回调
    singerClick(id) {
      this.$router.push("/artistdetail/" + id).catch((err) => {});
    },
    //是否点亮爱心
    isLiked(id) {
      return this.$store.state.likedMusicList.find((uid) => uid === id);
    },
    //喜欢音乐回调
    likedMusic(id) {
      this.$store.state.likedFunction(id);
    },
  },
  watch: {
    //监听vuex中歌曲id改变
    "$store.state.songsId"(id) {
      //先暂停当前歌曲播放，一个播放效果动画
      this.$refs.audio.pause();
      //通过id获取歌曲url
      this.getSongsUrl(id);
      //获取歌曲详情
      this.getSongsDetail(id);
      //提交播放状态
      this.$store.commit("isPlay", true);
    },
    //监听歌单详情，提交最近播放
    "$store.state.songsDetail": {
      immediate: true,
      handler: function (result) {
        if (!result) return;
        //存储歌曲信息
        this.$store.commit("recentList", result);
      },
    },
  },
};
</script>

<style scoped="scoped">
#bottom-bar {
  display: flex;
  border-top: solid 1px rgba(223, 218, 218, 0.932);
}
.left {
  display: flex;
  width: 30%;
}
.img img {
  width: 50px;
  height: 50px;
  cursor: pointer;
  margin: 10px;
  border-radius: 5px;
}
.song {
  width: 210px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.pop-name {
  display: flex;
}
.p-name {
  color: black;
  font-size: 15px;
}
.common {
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.pop span {
  font-size: 12px;
  color: #919191;
}
.center {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  text-align: center;
}
.control span {
  display: inline-block;
  width: 50px;
}
.control span i {
  font-size: 20px;
  cursor: pointer;
}
.icon-bofang {
  font-size: 20px;
  cursor: pointer;
}
/* 进度条 */
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
  text-align: center;
  width: 20%;
  line-height: 70px;
  display: flex;
  justify-content: center;
}
.right div img {
  height: 20px;
  margin: 0 15px;
  cursor: pointer;
}
.sound {
  display: none;
  position: absolute;
  bottom: 60px;
  right: 111px;
}
.icon-aixin2 {
  color: #d61e1e;
}
.aixin {
  cursor: pointer;
  margin-left: 5px;
}
</style>
