<template>
  <div class="sider">
    <div
      v-for="(item, index) in value"
      :key="index"
      @click="itemClick(index)"
      :class="{ active: currentIndex === index }"
      class="sider-item"
    >
      <span>{{ item }}</span>
    </div>
    <div class="music-list">
      <span>我创建的歌单</span>
    </div>
    <my-list ref="list" @removeClick="currentIndex = ''"></my-list>
  </div>
</template>

<script>
import MyList from "./childcomps/mylist/MyList.vue";
export default {
  name: "",
  data() {
    return {
      value: ["发现音乐", "播客", "视频"],
      path: "",
      currentIndex: 0,
    };
  },

  components: {
    MyList,
  },

  methods: {
    itemClick(index) {
      //点击字体变粗
      this.currentIndex = index;
      //点击除去创建歌单样式
      this.$refs.list.currentIndex = "";
      switch (index) {
        case 0:
          this.path = "/find";
          this.$router.replace(this.path).catch((err) => {});
          break;
        case 1:
          this.path = "/boke";
          this.$router.replace(this.path).catch((err) => {});
          break;
        case 2:
          this.path = "/video";
          this.$router.replace(this.path).catch((err) => {});
          break;
      }
    },
  },
};
</script>

<style scoped="scoped">
.sider {
  border-right: solid 1px rgba(179, 171, 171, 0.336);
  overflow-y: scroll;
}
.sider::-webkit-scrollbar {
  display: none;
}
.sider-item {
  height: 30px;
  line-height: 30px;
  margin: 10px;
  color: rgb(68, 64, 64);
  cursor: pointer;
}
.sider-item:hover {
  background-color: rgba(128, 128, 128, 0.096);
}
.active {
  /* width: 179px; */
  color: black;
  font-size: 18px;
  font-weight: 600;
  background-color: rgba(128, 128, 128, 0.096);
}
.music-list {
  font-size: 13px;
  color: #919191;
  margin: 10px;
}
</style>