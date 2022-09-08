<template>
  <div
    class="music-detail"
    v-loading="loading"
    element-loading-text="载入中..."
    element-loading-spinner="el-icon-loading"
  >
    <!-- 不能是根据songsId去决定是否展示，因为先请求songsId后再去请求songsDetail的，所以在请求songsId后会因为先渲染出来再去请求songsDetail而拿不到picUrl报错 -->
    <div class="center" v-if="$store.state.songsDetail">
      <div class="top">
        <div class="left">
          <div class="needle" :class="{ needleRotate: $store.state.isPlay }">
            <img src="@/assets/img/musicdetail/needle.png" alt="" />
          </div>
          <!-- 动态添加isCircle类名，达到切换歌曲重置唱片动画的效果，提升体验 -->
          <div
            class="record"
            :class="[
              $store.state.isPlay ? '' : 'pause',
              $store.state.songsLoading ? '' : 'isCircle',
            ]"
          >
            <img src="@/assets/img/musicdetail/disc.png" alt="" />
            <span class="avtar">
              <img v-lazy="songsDetail.al.picUrl" alt="" />
            </span>
          </div>
        </div>
        <div class="right">
          <div class="title">
            <div class="name">{{ songsDetail.name }}</div>
            <div class="album">
              {{ songsDetail.al.name }} - {{ songsDetail.ar[0].name }}
            </div>
          </div>
          <!-- 歌词 -->
          <lyric :lyric="lyric"></lyric>
        </div>
      </div>
      <!-- 评论 -->
      <div class="bottom">
        <comment
          :comment="comment"
          :typeId="$store.state.songsId"
          :commentType="0"
        ></comment>
        <pagination />
      </div>
    </div>
    <!-- 当无音乐时展示 -->
    <el-empty v-else description="暂无播放音乐"></el-empty>
    <!-- 相似音乐 -->
    <div class="simi" v-if="$store.state.songsDetail">
      <h5>喜欢这首歌的人也听</h5>
      <div class="simi-songs">
        <div
          class="simi-song"
          v-for="(item, index) in songs"
          :key="index"
          @click="itemClick(item.id)"
        >
          <div><img v-lazy="item.album.picUrl" alt="" /></div>
          <div class="word">{{ item.name }} - {{ item.artists[0].name }}</div>
        </div>
      </div>
    </div>

    <!-- 回到顶部 -->
    <!-- <go-top></go-top> -->
  </div>
</template>

<script>
import Lyric from "@/components/content/Lyric.vue";
import Comment from "@/components/content/Comment";
// import GoTop from "../goTop/GoTop.vue";

import { getComment } from "@/network/comment";
import { getLyric, simiSongs } from "@/network/song";
import Pagination from "@/components/elementui/Pagination.vue";
export default {
  name: "musicdetail",
  data() {
    return {
      musicId: "",
      lyric: [],
      comment: {},
      songs: [],
      loading: false,
      page: 1,
    };
  },
  provide() {
    return { currentChange: this.currentChange };
  },
  computed: {
    songsDetail() {
      return this.$store.state.songsDetail;
    },
  },
  components: {
    Lyric,
    Comment,
    Pagination,
    // GoTop,
  },
  methods: {
    //请求歌词
    getLyric() {
      getLyric(this.musicId).then((res) => {
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
          result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value]);
        });
        //结果存储
        this.lyric = result;
      });
    },
    //评论数据
    getComment() {
      getComment(this.musicId, (this.page - 1) * 20).then((res) => {
        this.comment = res;
      });
    },
    currentChange(val) {
      this.page = val;
      this.getComment();
    },
    //相似歌曲
    simiSongs() {
      simiSongs(this.musicId).then((res) => {
        this.songs = res.songs;
      });
    },
    //点击播放相似歌曲的回调
    itemClick(id) {
      this.$store.commit("songsId", id);
    },
    //清空内容
    clearContent() {
      this.lyric = [];
      this.comment = {};
      this.songs = [];
    },
    //请求数据
    getData() {
      this.getLyric();
      this.getComment();
      this.simiSongs();
    },
  },
  watch: {
    "$store.state.songsId": {
      immediate: true,
      handler: function (id) {
        this.musicId = id;
        let show = this.$store.state.isShowSongsDetail.isShow;
        //当音乐卡片未打开时，不请求内容,提升性能
        if (id && show) {
          //清空内容
          this.clearContent();
          this.loading = true;
          setTimeout(() => {
            this.getData();
            this.loading = false;
          }, 500);
        }
      },
    },
    "$store.state.isShowSongsDetail.isShow": {
      immediate: true,
      handler: function (show) {
        let id = this.$store.state.songsId;
        //立即监听，在id不为空时，才去请求内容，所以先做判断
        if (id && show) {
          this.getData();
        }
      },
    },
  },
};
</script>

<style scoped='scoped'>
.music-detail {
  background-color: white;
  /* background-image: linear-gradient(to bottom, #e3e2e3, white); */
  overflow-y: scroll;
  position: relative;
}
.needle {
  margin-top: 30px;
}
.needle img {
  height: 70px;
  margin-left: 85px;
}
.center {
  width: 500px;
  margin: 0 auto;
}
.top {
  width: 100%;
  display: flex;
}
.record img {
  width: 170px;
  height: 170px;
}
.right {
  width: 330px;
  text-align: center;
}
.name {
  color: #161616;
  font-size: 25px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.album {
  color: #919191;
  font-size: 13px;
  margin: 5px 0;
}
.record {
  position: relative;
}
.avtar {
  position: absolute;
  left: 25px;
  top: 25px;
  right: 25px;
  bottom: 25px;
}
.avtar img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}
.isCircle {
  /* linear,平均速度旋转，infinite：不限次数旋转 */
  animation: desc 20s linear infinite;
  animation-delay: 0.8s;
}
@keyframes desc {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.pause {
  animation-play-state: paused;
}
/* 针的动画属性 */
.needle {
  transition: all 1s;
  /* 指定从顶点中间位置开始旋转 */
  transform-origin: 50% 0;
  position: sticky;
  z-index: 1000;
}
.needleRotate {
  transform: rotate(30deg);
}

.bottom {
  margin-top: 70px;
}
.simi {
  position: absolute;
  right: 40px;
  width: 200px;
  top: 70px;
}
.simi-song {
  display: flex;
  cursor: pointer;
}
.simi-song:hover {
  background-color: rgba(179, 171, 171, 0.336);
}
.simi-song img {
  width: 27px;
  height: 27px;
  border-radius: 10px;
  vertical-align: middle;
  padding: 5px;
}
.word {
  line-height: 37px;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>