<template>
  <div class="search-song">
    <div class="top" v-if="detail">
      <p class="text">搜索 {{ $route.params.value }} 的结果</p>
      <p class="funny">你可能感兴趣</p>
      <div class="singer">
        <div
          class="card first"
          v-if="detail.artist"
          @click="singerClick(detail.artist[0].id)"
        >
          <span class="left">
            <img :src="detail.artist[0].picUrl" alt="" />
          </span>
          <div class="right">
            <div class="name">
              {{ detail.artist[0].occupation }}:{{ detail.artist[0].name }}
              <span v-if="detail.artist[0].alias">
                ({{ detail.artist[0].alias[0] }})
              </span>
            </div>
            <div class="fans">
              <span>粉丝:{{ detail.artist[0].fansSize }},</span>
              <span>歌曲:{{ detail.artist[0].musicSize }}</span>
            </div>
          </div>
        </div>
        <div
          class="card second"
          v-if="detail.playlist"
          @click="playListClick(detail.playlist[0].id)"
        >
          <span class="left">
            <img :src="detail.playlist[0].coverImgUrl" alt="" />
          </span>
          <div class="right">
            <div class="name">歌单:{{ detail.playlist[0].name }}</div>
            <div class="fans">
              <span>歌曲:{{ detail.playlist[0].trackCount }},</span>
              <span>播放:{{ detail.playlist[0].playCount }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 导航栏 -->
    <el-tabs v-model="activeName" @tab-click="tabClick">
      <el-tab-pane label="单曲" name="first">
        <row-list :list="searchList.musicList"></row-list>
        <!-- 歌曲列表 -->
        <table-list :result="searchList.musicList"></table-list>
      </el-tab-pane>
      <el-tab-pane label="专辑" name="second">
        <flex-list
          :list="searchList.albumList"
          @itemClick="albumClick"
        ></flex-list>
      </el-tab-pane>
      <el-tab-pane label="歌手" name="third">
        <flex-list
          :list="searchList.artistList"
          @itemClick="singerClick"
        ></flex-list>
      </el-tab-pane>
      <el-tab-pane label="歌单" name="fourth">
        <flex-list
          :list="searchList.playList"
          @itemClick="playListClick"
        ></flex-list>
      </el-tab-pane>
      <el-tab-pane label="MV" name="fifth">
        <mv-list :list="searchList.mvList"></mv-list>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { searchResult, searchDetail } from "@/network/search";
import TableList from "@/components/elementui/TableList.vue";
import RowList from "@/components/elementui/RowList.vue";

import MvList from "@/components/list/MvList";
import FlexList from "@/components/list/FlexList";

export default {
  data() {
    return {
      activeName: "first",
      currentIndex: "0",
      searchInfo: {
        keywords: "",
        type: 1,
      },
      typeInfo: [1, 10, 100, 1000, 1004],
      detail: "",
      searchList: {
        musicList: [],
        albumList: [],
        artistList: [],
        playList: [],
        mvList: [],
      },
    };
  },
  components: {
    TableList,
    RowList,
    MvList,
    FlexList,
  },
  created() {},
  mounted() {},
  methods: {
    //搜索细节
    searchDetail(item) {
      searchDetail(item).then((res) => {
        this.detail = res.result;
      });
    },
    //搜索全部结果
    // type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV,
    searchResult() {
      searchResult(this.searchInfo).then((res) => {
        //case里的数值必须为字符串。因为tabs插件里的index就是字符串类型
        switch (this.currentIndex) {
          case "0":
            this.searchList.musicList = Object.freeze(res.result.songs);
            break;
          case "1":
            this.searchList.albumList = Object.freeze(res.result.albums);
            break;
          case "2":
            this.searchList.artistList = Object.freeze(res.result.artists);
            break;
          case "3":
            this.searchList.playList = Object.freeze(res.result.playlists);
            break;
          case "4":
            this.searchList.mvList = Object.freeze(res.result.mvs);
            break;
        }
      });
    },
    // tab切换
    tabClick(e) {
      //此处e.index为字符串类型
      this.currentIndex = e.index;
      this.searchInfo.type = this.typeInfo[e.index];
      this.searchResult();
    },
    //点击歌手的回调
    singerClick(id) {
      this.$router.push("/artistdetail/" + id).catch((error) => {});
    },
    //点击歌单回调
    playListClick(id) {
      this.$router.push("/listdetail/" + id).catch((error) => {});
    },
    //点击专辑的回调
    albumClick(id) {
      this.$router.push("/albumdetail/" + id).catch((error) => {});
    },
  },
  watch: {
    "$route.params.value": {
      immediate: true,
      handler: function (value) {
        if (!value) return;
        this.searchInfo.keywords = value;
        this.searchDetail(value);
        this.searchResult();
      },
    },
  },
};
</script>

<style scoped='scoped'>
.top {
  margin: 10px 0;
}
.text {
  margin: 10px 0;
}
.funny {
  margin: 10px 0;
}
.text {
  font-weight: 600;
}
.funny {
  color: #666;
  font-size: 12px;
}
.singer {
  display: flex;
}
.card {
  margin-right: 20px;
  width: 250px;
  height: 60px;
  background-color: #f4f4f4;
  border-radius: 5px;
  display: flex;
  cursor: pointer;
}
.left img {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  margin: 7px;
}
.name {
  font-size: 13px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-bottom: 5px;
}
.fans {
  font-size: 12px;
  color: #666;
}
.right {
  width: 190px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>