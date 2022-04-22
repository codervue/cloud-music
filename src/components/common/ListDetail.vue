<template>
  <div class="list-detail" v-if="result">
    <div class="top">
      <div class="left">
        <img :src="result.playlist.coverImgUrl" alt="" />
      </div>
      <div class="right">
        <div class="first">
          <span class="title-tag">歌单</span>
          <span class="title-content">{{ result.playlist.name }}</span>
        </div>
        <div class="second">
          <img :src="result.playlist.creator.backgroundUrl" alt="" />
          <span class="nickname">{{ result.playlist.creator.nickname }}</span>
        </div>
        <div class="three">
          <el-row>
            <el-button type="primary" @click="allClick">播放全部</el-button>
            <el-button type="success">收藏</el-button>
            <el-button type="info">分享</el-button>
            <el-button type="warning">下载全部</el-button>
          </el-row>
        </div>
        <div class="five">
          <span class="tags">标签:</span>
          <span class="tag">{{ result.playlist.tags[0] }}</span>
          <span class="tag">{{ result.playlist.tags[1] }}</span>
          <span class="tag">{{ result.playlist.tags[2] }}</span>
        </div>
        <div class="six">
          <span>歌曲:{{ result.playlist.trackCount }}</span>
          <span class="count">播放量:{{ result.playlist.playCount }}</span>
        </div>
        <div class="seven">
          <span class="desc">简介:</span>
          <span class="description">{{ result.playlist.description }}</span>
        </div>
      </div>
    </div>

    <div class="bottom">
      <h3>歌曲列表:</h3>
      <!-- 报错显示：请求任务为异步任务，所以在渲染时没有请求到数据，读取不到tracks值，所以加个判断 -->
      <div class="song" v-if="$store.state.listDetailId">
        <el-table
          :data="result.playlist.tracks"
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
import { getPlayListDetail } from "@/network/song";
import { handleMusicTime } from "@/plugins/utils";

export default {
  name: "listdetail",
  data() {
    return {
      result: "",
    };
  },
  mounted() {},
  methods: {
    getListDetail(id) {
      getPlayListDetail(id).then((res) => {
        //提交歌单详情
        this.$store.commit("listDetail", res);
        //存储结果
        this.result = res;
        //处理时长方法
        this.result.playlist.tracks.forEach((item, index) => {
          this.result.playlist.tracks[index].dt = handleMusicTime(item.dt);
        });
      });
    },
    //双击歌曲实现播放
    songsClick(row) {
      //将歌曲id提交到vuex中
      this.$store.commit("songsId", row.id);
    },
    //播放全部的回调,（调用下一曲函数）
    allClick() {
      this.$store.state.playAllFunction();
    },
  },
  watch: {
    //监听歌单Id改变请求歌单详情
    "$store.state.listDetailId": {
      immediate: true,
      handler: function (id) {
        this.getListDetail(id);
      },
    },
  },
};
</script>

<style scoped='scoped'>
.list-detail {
  width: 780px;
  margin: 0 10px;
}
.left img {
  height: 200px;
  border-radius: 10px;
}
.right {
  margin-left: 10px;
}
.top {
  display: flex;
  margin-top: 10px;
}
.title-tag {
  border: solid 1px #ec4141;
  font-size: 12px;
  color: #ec4141;
  padding: 1px 2px;
  border-radius: 2px;
  margin-right: 5px;
  vertical-align: middle;
}
.title-content {
  font-size: 20px;
  font-weight: 600;
  color: #373737;
  vertical-align: middle;
}
.second {
  margin: 10px 0;
}
.second img {
  height: 30px;
  border-radius: 50%;
  vertical-align: middle;
  margin-right: 10px;
}
.three {
  margin: 10px 0;
}
.nickname {
  color: #6191c2;
  vertical-align: middle;
}
.five {
  margin: 5px 0;
}
.tags {
  color: rgb(56, 47, 47);
  font-size: 13px;
}
.tag {
  margin: 0 2px;
  color: #6191c2;
  font-size: 12px;
}
.six {
  display: flex;
  color: rgb(56, 47, 47);
  font-size: 13px;
  margin: 10px 0;
}
.count {
  margin-left: 170px;
}
/* span标签无法设置宽度，所以在父标签设置宽度隐藏文字 */
.seven {
  width: 500px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.desc {
  color: rgb(56, 47, 47);
  font-size: 13px;
}
.description {
  font-size: 12px;
  color: #666666;
}
</style>