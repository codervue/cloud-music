<template>
  <div class="list-detail" v-if="result.playlist">
    <div class="top">
      <div class="left">
        <img v-lazy="result.playlist.coverImgUrl" alt="" />
      </div>
      <div class="right">
        <div class="first">
          <span class="title-tag">歌单</span>
          <span class="title-content">{{ result.playlist.name }}</span>
        </div>
        <div class="second">
          <img :src="result.playlist.creator.backgroundUrl" alt="" />
          <span
            class="nickname"
            @click="userClick(result.playlist.creator.userId)"
            >{{ result.playlist.creator.nickname }}</span
          >
          <span class="create-time"
            >{{ result.playlist.createTime | dateFormat }}创建</span
          >
        </div>
        <div class="three">
          <row-list :list="result.playlist.tracks"></row-list>
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
      <div class="song">
        <table-list :result="result.playlist.tracks"></table-list>
      </div>
    </div>
  </div>
</template>

<script>
import { getPlayListDetail } from "@/network/song";
import TableList from "@/components/elementui/TableList.vue";
import RowList from "@/components/elementui/RowList.vue";

export default {
  name: "listdetail",
  data() {
    return {
      result: "",
    };
  },
  created() {
    let id = this.$route.params.id;
    this.getListDetail(id);
  },
  components: {
    TableList,
    RowList,
  },
  methods: {
    //获取歌单详情
    getListDetail(id) {
      getPlayListDetail(id).then((res) => {
        //存储结果
        this.result = res;
      });
    },
    userClick(id) {
      this.$router.push("/userdetail/" + id);
    },
  },
  watch: {},
};
</script>

<style scoped='scoped'>
.left img {
  width: 200px;
  height: 200px;
  border-radius: 10px;
}
.right {
  margin-left: 10px;
}
.top {
  display: flex;
}
.title-tag {
  border: solid 1px #ec4141;
  font-size: 12px;
  color: #ec4141;
  padding: 2px;
  border-radius: 2px;
  margin-right: 5px;
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
}
.three {
  margin: 10px 0;
}
.nickname {
  color: #6191c2;
  font-size: 13px;
  margin: 0 10px;
  cursor: pointer;
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
h3 {
  margin-bottom: 0;
}
.create-time {
  font-size: 13px;
  color: #666666;
}
</style>