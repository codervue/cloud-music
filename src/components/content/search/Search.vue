<template>
  <div class="search">
    <el-popover placement="bottom" width="200" trigger="focus" v-model="isShow">
      <el-input
        v-model="input"
        clearable
        prefix-icon="el-icon-search"
        size="mini"
        slot="reference"
        placeholder="请输入歌曲名、歌手、专辑"
        @focus="hotList"
        @input="changeInput"
        @keyup.enter.native="onSubmit"
        ref="input"
      ></el-input>
      <!-- 热搜榜模块 -->
      <div class="hot" v-if="!input">
        <h4>热搜榜</h4>
        <ul class="box" v-for="(item, index) in data" :key="index">
          <li class="box-item" @click="itemClick(item.searchWord)">
            <span class="number" :class="{ active: index < 3 }">{{
              index + 1
            }}</span>
            <span class="searchWord" :class="{ activeItem: index < 3 }">{{
              item.searchWord
            }}</span>
          </li>
        </ul>
      </div>
      <!-- 搜索建议 -->
      <div class="suggest" v-else>
        <div v-if="songs[0]">
          <h4>猜你想搜</h4>
          <div class="box-item" @click="goDetail(songs[0].name)">
            {{ songs[0].name }}
          </div>
        </div>
        <div class="song">
          <h4>单曲</h4>
          <ul class="box" v-for="(item, index) in songs" :key="index">
            <li class="box-item" @click="songsClick(item)">
              {{ item.name + "-" + item.artists[0].name }}
            </li>
          </ul>
        </div>
        <!-- 歌手 -->
        <div class="singer">
          <h4>歌手</h4>
          <ul class="box" v-for="(item, index) in singer" :key="index">
            <li class="box-item" @click="goDetail(item.name)">
              {{ item.name }}
            </li>
          </ul>
        </div>
        <!-- 歌单 -->
        <div class="playList">
          <h4>歌单</h4>
          <ul class="box" v-for="(item, index) in playlists" :key="index">
            <li class="box-item" @click="playListClick(item)">
              {{ item.name }}
            </li>
          </ul>
        </div>
      </div>
    </el-popover>
  </div>
</template>

<script>
import { searchHot, searchSug } from "@/network/search";
export default {
  data() {
    return {
      input: "",
      data: [],
      songs: [],
      singer: [],
      playlists: [],
      isShow: false,
    };
  },
  methods: {
    //热搜榜
    hotList() {
      if (!this.input) {
        searchHot().then((res) => {
          this.data = res.data;
        });
      } else {
        //当input有值时，聚焦的回调
        this.changeInput(this.input);
      }
    },
    //搜索建议
    changeInput(item) {
      //如果input框有值才去调用
      if (this.input) {
        searchSug(item).then((res) => {
          //防止接口拿不到数据时报错
          if (res.result) {
            this.songs = res.result.songs;
            this.singer = res.result.artists;
            this.playlists = res.result.playlists;
          }
        });
      }
    },
    //点击热搜榜回调
    itemClick(item) {
      this.isShow = false;
      this.input = item;
      this.goDetail(item);
    },
    //跳转至详情页
    goDetail(item) {
      this.isShow = false;
      this.input = item;
      //提交搜索值
      this.$store.commit("searchItem", item);
      //路由跳转
      this.$router.push("/searchresult").catch((err) => {});
    },
    //键盘enter跳转
    onSubmit(e) {
      if (e.keyCode == 13 && this.input != "") {
        //点击enter使input框失去焦点
        this.$refs.input.blur();
        this.isShow = false;
        this.goDetail(this.input);
      }
    },
    //点击单曲的回调
    songsClick(item) {
      this.isShow = false;
      this.input = item.name + "-" + item.artists[0].name;
      this.$store.commit("songsId", item.id);
    },
    //点击歌单的回调
    playListClick(item) {
      this.isShow = false;
      this.$store.commit("listDetailId", item.id);
      this.$router.push("/listdetail").catch((err) => {});
    },
  },
  mounted() {},
};
</script>

<style scoped='scoped'>
.search >>> .el-input__inner {
  border-radius: 25px;
  border: none;
}
.box {
  padding: 0;
  list-style: none;
}
.box-item {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.box-item:hover {
  background-color: rgba(128, 128, 128, 0.096);
  cursor: pointer;
}
.number {
  display: inline-block;
  width: 25px;
}
.active {
  color: red;
  font-weight: 600;
}
.activeItem {
  font-weight: 600;
  color: black;
}
</style>