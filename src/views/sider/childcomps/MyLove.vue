<template>
  <div class="mylove"></div>
</template>

<script>
import { getUserPlayList } from "@/network/song";
export default {
  name: "mylove",
  data() {
    return {};
  },
  created() {
    // if (this.$store.state.isLogin) {
    //   this.getUserPlayList();
    // }
    if (!this.$store.state.isLogin) {
      setTimeout(() => {
        this.$message.error("请先登入哦");
      }, 3000);
    }
  },
  components: {},

  methods: {
    getUserPlayList() {
      getUserPlayList(this.$store.state.getProfile.profile.userId).then(
        (res) => {
          //提交用户歌单id（目前只做了第一个歌单的展示）
          this.$store.commit("listDetailId", res.playlist[0].id);
          //界面跳转至歌单详情页
          this.$router.push("/listdetail").catch((err) => {});
        }
      );
    },
  },
  watch: {
    "$store.state.isLogin": {
      immediate: true,
      handler: function (isLogin) {
        if (isLogin) {
          this.getUserPlayList();
        }
        //不能在此进行页面跳转，因为登入成功后此组件销毁，无法对登入状态进行监听
        // else{
        //   console.log("---");
        // }
      },
    },
  },
};
</script>

<style scoped='scoped'>
/* .mylove {
  text-align: center;
  color: #666666;
  font-weight: 900;
  line-height: 425px;
  font-size: 25px;
} */
</style>