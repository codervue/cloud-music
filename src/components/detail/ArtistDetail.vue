<template>
  <div>
    <div class="describe" v-if="data.artist">
      <div class="image"><img v-lazy="data.artist.cover" alt="" /></div>
      <div class="right">
        <div class="name">{{ data.artist.name }}</div>
        <div class="count">
          单曲数:
          <span>{{ data.artist.musicSize }}</span>
          专辑数:
          <span>{{ data.artist.albumSize }}</span>
          MV数:
          <span>{{ data.artist.mvSize }}</span>
        </div>
      </div>
    </div>
    <!-- 导航栏 -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="专辑" name="first">
        <flex-list :list="album" @itemClick="albumClick"></flex-list>
      </el-tab-pane>
      <el-tab-pane label="MV" name="second">
        <mv-list :list="mvs"></mv-list>
      </el-tab-pane>
      <el-tab-pane label="歌手详情" name="third">
        <p class="desc">简介</p>
        <span class="word" v-if="data.artist">{{ data.artist.briefDesc }}</span>
      </el-tab-pane>
      <el-tab-pane label="相似歌手" name="fourth">
        <box-list :list="simi" @itemClick="simiClick"></box-list>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {
  getArtist,
  getArtistMv,
  getArtistAlbum,
  getSimiArtist,
} from "@/network/artist";
import MvList from "@/components/list/MvList";
import FlexList from "@/components/list/FlexList";
import BoxList from "@/components/list/BoxList";
export default {
  data() {
    return {
      id: null,
      data: {},
      mvs: [],
      album: [],
      simi: [],
      activeName: "first",
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getArtist();
    this.getArtistAlbum();
  },
  components: { MvList, FlexList, BoxList },
  methods: {
    //请求歌手详情
    getArtist() {
      getArtist(this.id).then((res) => {
        this.data = res.data;
      });
    },
    //请求mv
    getArtistMv() {
      getArtistMv(this.id).then((res) => {
        this.mvs = res.mvs;
      });
    },
    //请求歌手专辑
    getArtistAlbum() {
      getArtistAlbum(this.id).then((res) => {
        this.album = res.hotAlbums;
      });
    },
    //请求相似歌手
    getSimiArtist() {
      getSimiArtist(this.id).then((res) => {
        this.simi = res.artists;
      });
    },
    //导航栏切换请求数据
    handleClick(e) {
      switch (e.index) {
        case "0":
          this.getArtistAlbum();
          break;
        case "1":
          this.getArtistMv();
          break;
        case "3":
          this.getSimiArtist();
          break;
      }
    },
    //点击专辑回调
    albumClick(id) {
      this.$router.push("/albumdetail/" + id);
    },
    //点击相似歌手回调
    simiClick(id) {
      this.$router.push("/artistdetail/" + id);
    },
  },
  watch: {},
};
</script>

<style scoped='scoped'>
.describe {
  display: flex;
}
.image img {
  width: 200px;
  height: 200px;
  border-radius: 5px;
}
.right {
  margin-left: 15px;
}
.name {
  font-size: 20px;
  font-weight: bold;
}
.count {
  margin: 10px 0;
  font-size: 13px;
  color: rgb(46, 38, 38);
}
.desc {
  font-weight: bold;
}
.word {
  font-size: 15px;
  color: #666;
  line-height: 30px;
}
</style>