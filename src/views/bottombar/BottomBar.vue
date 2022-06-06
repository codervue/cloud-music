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
        <img :src="songsDetail.al.picUrl" alt="" />
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
          >
            <i class="iconfont icon-aixin1"></i>
          </span>
          <!-- 喜欢 -->
          <span v-else class="icon aixin" @click="likedMusic(songsDetail.id)">
            <i class="iconfont icon-aixin2"></i>
          </span>
        </div>

        <div class="pop">
          <span class="common" @click="popClick(songsDetail.ar[0].name)">
            {{ songsDetail.ar[0].name }}
          </span>
        </div>
      </div>
      <!-- <span class="love"></span> -->
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

  mounted() {
    this.$store.commit("playAllFunction", this.nextClick);
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
    //上下一曲随机播放一首（暂且播放歌单列表里的音乐）
    nextClick() {
      if (this.$store.state.listDetail) {
        let num = Math.floor(
          Math.random() * this.$store.state.listDetail.playlist.tracks.length
        ); //可均衡获取0到所有歌曲数的随机整数。
        let randomId = this.$store.state.listDetail.privileges[num].id;
        //提交随机歌曲id
        this.$store.commit("songsId", randomId);
      } else if (this.$store.state.searchItem) {
        this.$store.state.searchFunction();
      } else {
        //如果未传歌单id，播放搜索结果中的歌曲，否则 弹窗暂无播放源
        this.$message("暂无播放源");
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
    //拖动进度条事件(由于受播放器不断更新当前时间影响，拖拽事件无法达到预期，所以需要在拉取进度条时禁止播放器更新时间,鼠标松开后恢复调用)
    changeProgress(e) {
      //修改当前播放时间
      this.$refs.audio.currentTime = Math.floor((e / 100) * this.secondTime);
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
    getSongsUrl() {
      getSongsUrl(this.$store.state.songsId).then((res) => {
        if (res.data[0].url != null) {
          this.$store.commit("songsUrl", res.data[0].url);
          this.$store.commit("songsLoading", false);
        } else {
          this.$message({
            message: "该歌曲暂无版权",
            type: "warning",
          });
        }
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
    tableClick() {
      this.$store.commit("isOpen");
    },
    //点击歌名、歌手回调
    popClick(item) {
      this.$store.commit("searchItem", item);
      this.$router.push("/searchresult").catch((err) => {});
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
  display: flex;
  border-top: solid 1px rgba(223, 218, 218, 0.932);
  /* 设置定位使得优先级最高，不会被歌曲详情所覆盖 ，且必须设置背景色*/
  position: sticky;
  /* 不能太高否则会覆盖掉登录界面 */
  z-index: 1000;
  background-color: #fff;
}
.left {
  display: flex;
  width: 290px;
}
.img img {
  width: 60px;
  height: 60px;
  cursor: pointer;
  margin: 10px;
  border-radius: 10px;
}
.song {
  width: 210px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.center {
  width: 500px;
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
  /* flex-direction: column; */
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
  width: 210px;
  line-height: 81px;
  z-index: 10000;
  display: flex;
  justify-content: center;
}
.right div img {
  height: 20px;
  margin: 0 15px;
  cursor: pointer;
}
.pop-name {
  display: flex;
}
.p-name {
  color: black;
  font-size: 15px;
}
.common{
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.pop span {
  font-size: 12px;
  color: #919191;
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
}
</style>
