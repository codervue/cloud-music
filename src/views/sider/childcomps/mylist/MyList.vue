<template>
  <div class="my-list" v-if="$store.state.isLogin">
    <div
      class="list-item"
      v-for="(item, index) in playlist"
      :key="index"
      @click="itemClick(index, item.id)"
      :class="{ active: currentIndex === index }"
    >
      <div><i class="iconfont icon-gedan"></i></div>
      <div class="list-name">{{ item.name }}</div>
    </div>
  </div>
</template>

<script>
import { getUserPlayList } from "@/network/song";
export default {
  name: "mylist",
  data() {
    return {
      playlist: [],
      currentIndex: "",
    };
  },
  created() {
    this.getUserPlayList();
  },
  activated() {},
  components: {},

  methods: {
    //获取用户歌单
    getUserPlayList() {
      let userId = localStorage.getItem("userId");
      getUserPlayList(userId).then((res) => {
        this.playlist = res.playlist;
      });
    },
    //歌单点击
    itemClick(index, id) {
      //点击字体变粗
      this.currentIndex = index;
      //除去侧边栏其他栏样式
      this.$emit("removeClick");
      //路由跳转到歌单详情
      this.$router.replace("/listdetail").catch((error) => {});
      //提交歌单Id
      this.$store.commit("listDetailId", id);
    },
  },
  watch: {
    //监听登陆状态，登录成功获取用户歌单
    "$store.state.isLogin": {
      immediate: true,
      handler: function (login) {
        if (login) {
          this.getUserPlayList();
        }
      },
    },
  },
};
</script>

<style scoped='scoped'>
.list-item {
  height: 30px;
  font-size: 14px;
  line-height: 30px;
  margin: 10px;
  color: rgb(68, 64, 64);
  cursor: pointer;
  display: flex;
}
.list-item:hover {
  background-color: rgba(128, 128, 128, 0.096);
}
.active {
  /* width: 179px; */
  background-color: rgba(128, 128, 128, 0.096);
}
.list-name {
  margin-left: 5px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>