<template>
  <div>
    <div class="user-detail" v-if="userInfo.profile">
      <div class="image">
        <img v-lazy="userInfo.profile.backgroundUrl" alt="" />
      </div>
      <div class="right">
        <div class="top">
          <div class="name">{{ userInfo.profile.nickname }}</div>
          <span class="level">LV{{ userInfo.level }}</span>
          <span v-if="userInfo.profile.gender == 1">
            <iconpark-icon icon-id="317727" color="#026bd0"></iconpark-icon>
          </span>
          <span v-if="userInfo.profile.gender == 2">
            <iconpark-icon icon-id="317728" color="red"></iconpark-icon>
          </span>
        </div>
        <div class="bottom">
          <div class="fans">
            <div class="common">
              <div>{{ userInfo.profile.eventCount }}</div>
              <div>动态</div>
            </div>
            <div class="focus common">
              <div>{{ userInfo.profile.follows }}</div>
              <div>关注</div>
            </div>
            <div class="common">
              <div>{{ userInfo.profile.followeds }}</div>
              <div>粉丝</div>
            </div>
          </div>
          <div class="word">所在地区:美国 洛杉矶</div>
          <div class="word">个人介绍:{{ userInfo.profile.signature }}</div>
        </div>
      </div>
    </div>

    <!-- 歌单 -->
    <div class="list">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="创建的歌单" name="first">
          <box-list :list="playList" @itemClick="itemClick"></box-list>
        </el-tab-pane>
        <el-tab-pane label="收藏的歌单" name="second"> </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { getUserInfo, getUserPlayList } from "@/network/user";
import BoxList from "@/components/list/BoxList";
export default {
  data() {
    return {
      id: null,
      userInfo: {},
      activeName: "first",
      playList: [],
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getUserInfo();
    this.getUserPlayList();
  },
  components: {
    BoxList,
  },
  methods: {
    getUserInfo() {
      getUserInfo(this.id).then((res) => {
        this.userInfo = res;
      });
    },
    getUserPlayList() {
      getUserPlayList(this.id).then((res) => {
        this.playList = res.playlist;
      });
    },
    handleClick() {},
    itemClick(id) {
      this.$router.push("/listdetail/" + id);
    },
  },
};
</script>

<style scoped='scoped'>
.user-detail {
  display: flex;
}
.image img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
}
.right {
  margin-left: 15px;
}
.top {
  border-bottom: solid 1px rgba(102, 102, 102, 0.327);
  width: 500px;
}
.name {
  font-size: 20px;
  font-weight: bold;
}
.level {
  border: solid 1px rgba(241, 29, 29, 0.816);
  font-size: 12px;
  padding: 2px;
  color: red;
  margin: 7px 10px;
  display: inline-block;
}
.fans {
  display: flex;
  text-align: center;
  margin: 5px 0;
}
.focus {
  border-left: solid 1px rgba(171, 168, 168, 0.49);
  border-right: solid 1px rgba(171, 168, 168, 0.503);
  padding: 0 15px;
}
.common {
  margin: 10px;
}
.word {
  font-size: 14px;
  color: #716e6e;
  margin: 10px 0;
}
</style>