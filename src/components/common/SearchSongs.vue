<template>
  <div
    class="search-song"
    v-loading="loading"
    element-loading-text="正在加载中"
    element-loading-spinner="el-icon-loading"
  >
    <div class="top" v-if="detail">
      <p class="text">搜索 {{ $store.state.searchItem }} 的结果</p>
      <p class="funny">你可能感兴趣</p>
      <div class="singer">
        <div
          class="card first"
          v-if="detail.artist"
          @click="singerClick(detail.artist[0].name)"
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
          @click="cardClick(detail.playlist[0].id)"
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
      <!-- elementui -->
      <div class="three">
        <el-row>
          <el-button type="primary" @click="allClick">播放全部</el-button>
          <el-button type="success">收藏</el-button>
          <el-button type="info">分享</el-button>
          <el-button type="warning">下载全部</el-button>
        </el-row>
      </div>
    </div>
    <!-- 歌曲列表 -->
    <div class="bottom">
      <!-- 报错显示：请求任务为异步任务，所以在渲染时没有请求到数据，读取不到tracks值，所以加个判断 -->
      <div class="song" v-if="result">
        <el-table
          :data="result"
          stripe
          lazy
          style="width: 100%"
          @row-dblclick="songsClick"
        >
          <!-- @row-dblclick双击行绑定事件 -->
          <el-table-column prop="name" label="标题" width="400">
          </el-table-column>
          <el-table-column prop="ar[0].name" label="歌手" width="150">
          </el-table-column>
          <el-table-column prop="al.name" label="专辑" width="150">
          </el-table-column>
          <el-table-column prop="dt" label="时长" width=""> </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { searchResult, searchDetail } from "@/network/search";
import { handleMusicTime } from "@/plugins/utils";

export default {
  data() {
    return {
      detail: "",
      result: [],
      loading: false,
    };
  },
  created() {},
  mounted() {
    this.$store.commit("searchFunction", this.allClick);
  },
  methods: {
    //搜索细节
    searchDetail(item) {
      searchDetail(item).then((res) => {
        this.detail = res.result;
      });
    },
    //搜索歌曲list结果
    searchResult(item) {
      searchResult(item).then((res) => {
        this.result = res.result.songs;
        //处理时长方法
        this.result.forEach((item, index) => {
          this.result[index].dt = handleMusicTime(item.dt);
        });
      });
    },
    //双击歌曲实现播放
    songsClick(row) {
      //将歌曲id提交到vuex中
      this.$store.commit("songsId", row.id);
    },
    //播放全部的回调
    allClick() {
      let num = Math.floor(Math.random() * this.result.length); //可均衡获取0到所有歌曲数的随机整数。
      let randomId = this.result[num].id;
      //提交随机歌曲id
      this.$store.commit("songsId", randomId);
    },
    //点击歌手的回调
    singerClick(item) {
      this.$store.commit("searchItem", item);
    },
    //点击歌单回调
    cardClick(id) {
      this.$store.commit("listDetailId", id);
      this.$router.push("/listdetail").catch((error) => {});
    },
  },
  watch: {
    "$store.state.searchItem": {
      immediate: true,
      handler: function (item) {
        this.detail = "";
        this.result = "";
        this.loading = true;
        setTimeout(() => {
          this.searchDetail(item);
          this.searchResult(item);
          this.loading = false;
        }, 500);
      },
    },
  },
};
</script>

<style scoped='scoped'>
.search-song {
  width: 780px;
  margin: 0 10px;
}
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
  /* width: 150px; */
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
  margin-top: 10px;
}
.three {
  margin-top: 15px;
}
</style>