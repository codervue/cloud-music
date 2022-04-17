<template>
  <div></div>
</template>

<script>
import {getUserPlayList} from "@/network/song"
export default {
  name: "mylove",
  data() {
    return {};
  },
  created() {
    if (this.$store.state.isLogin) {
      this.getUserPlayList();
    }
  },
  components: {},

  methods: {
    getUserPlayList() {
      getUserPlayList(this.$store.state.getProfile.profile.userId).then(
        (res) => {
          //提交用户歌单（目前只做了第一个歌单的展示）
          this.$store.commit("listDetailId", res.playlist[0].id);
          this.$router.push("/listdetail").catch((err) => {});
        }
      );
    },
  },
};
</script>

<style scoped='scoped'>
</style>