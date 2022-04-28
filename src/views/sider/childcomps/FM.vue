<template>
  <div class="fm" v-if="result">
    <div class="left">
      <div class="cover"><img :src="result.al.picUrl" alt="" /></div>
      <div class="image" :class="{ active: $store.state.isPlay }">
        <img
          src="@/assets/img/stop.svg"
          alt=""
          v-if="!$store.state.isPlay"
          @click="playClick"
        />
        <img src="@/assets/img/play.svg" alt="" v-else @click="stopClick" />
      </div>
    </div>
    <div class="right">
      <div class="top">
        <div class="name">
          {{ result.name }}
          <span class="tone">标准音质</span>
        </div>
        <span class="album">专辑:{{ result.al.name }}</span>
        <span class="singer">歌手:{{ result.ar[0].name }}</span>
      </div>
      <lyric></lyric>
    </div>
  </div>
</template>

<script>
import { fm } from "@/network/fm";
import Lyric from "@/views/bottombar/childComps/Lyric";
export default {
  name: "fm",
  data() {
    return {
      result: "",
      data: "",
      isPlay: false,
    };
  },
  created() {},
  components: { Lyric },
  activated() {
    if (!this.$store.state.isLogin) {
      this.$message({
        message: "登入后获取私人FM",
        type: "warning",
      });
    }
  },
  methods: {
    stopClick() {
      this.$store.state.stopFunction();
      this.isPlay = false;
    },
    playClick() {
      if (this.$store.state.isLogin) {
        this.$store.commit("songsId", this.data[0].id);
      }
      //延时调用，防止报错
      setTimeout(() => {
        this.$store.state.playFunction();
      }, 100);
      this.isPlay = true;
    },
    //fm请求数据
    fm() {
      fm().then((res) => {
        this.data = res.data;
        //不要在网络请求后面拿取数据，根本拿取不到，控制台会报错，所以在请求里面操作
        this.$store.commit("songsId", this.data[0].id);
      });
    },
  },
  watch: {
    //监听登入状态，登入能立即获取数据
    "$store.state.isLogin": {
      immediate: true,
      handler: function (login) {
        if (login) {
          this.fm();
          //不要在网络请求后面拿取数据，根本拿取不到，控制台会报错，所以在请求里面操作
          // this.$store.commit("songsId", this.data[0].id);
        }
      },
    },
    "$store.state.songsDetail": {
      immediate: true,
      handler: function (result) {
        this.result = result;
      },
    },
  },
};
</script>

<style scoped='scoped'>
.fm {
  width: 700px;
  margin: 0 50px;
  display: flex;
}
.left {
  width: 300px;
  height: 300px;
  position: relative;
  margin-top: 50px;
}
.cover img {
  width: 300px;
  height: 300px;
  border-radius: 3px;
}
.image {
  width: 50px;
  height: 50px;
  position: absolute;
  right: 40%;
  bottom: 40%;
  border: solid 1px #fff;
  border-radius: 100%;
  background-color: #fff;
  transition: all 1s;
}
.image img {
  height: 30px;
  margin: 10px 11px;
}
.active {
  right: 5%;
  bottom: 5%;
}
.right {
  width: 400px;
  margin: 20px 40px;
}
.name {
  font-size: 20px;
}
.album {
  font-size: 12px;
  color: #919191;
  width: 170px;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
}
.singer {
  font-size: 12px;
  color: #919191;
  vertical-align: middle;
  margin-left: 10px;
}
.tone {
  font-size: 12px;
  border: solid 1px rgba(255, 0, 0, 0.66);
  color: rgba(255, 0, 0, 0.66);
}
</style>