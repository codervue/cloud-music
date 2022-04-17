<template>
  <div>
    <div id="nav-bar">
      <div class="left">
        <span><img src="@/assets/img/music.svg" alt="" /></span>
        <span class="change">网 抑 云 音 乐</span>
      </div>
      <div class="center">
        <span class="back" @click="backClick"><img src="@/assets/img/back.svg" alt="" /></span>
        <span class="input"
          ><input type="text" placeholder="搜索音乐、歌手、歌词、用户"
        /></span>
        <span class="search"><img src="@/assets/img/search.svg" alt="" /></span>
      </div>

      <div class="login">
        <div class="click" v-if="!isLogin" @click="loginClick">
          <span>登录</span>
        </div>
        <div class="user" v-else>
          <img :src="profile.avatarUrl" alt="" />
          <el-dropdown @command="logOut">
            <span class="el-dropdown-link">{{profile.nickname}}</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>退出登入</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>

      <div class="right">
        <span><img src="@/assets/img/close.svg" alt="" /></span>
        <span><img src="@/assets/img/set.svg" alt="" /></span>
        <span><img src="@/assets/img/message.svg" alt="" /></span>
        <span><img src="@/assets/img/zuixiaohua.svg" alt="" /></span>
        <span><img src="@/assets/img/zuidahua.svg" alt="" /></span>
        <span><img src="@/assets/img/guanbi.svg" alt="" /></span>
      </div>
    </div>

    <login ref="login"></login>
  </div>
</template>

<script>
import Login from "./login/Login.vue";

export default {
  name: "",
  data() {
    return {};
  },
  created() {},
  computed: {
    profile() {
      return this.$store.state.getProfile.profile;
    },
    isLogin() {
      return this.$store.state.isLogin;
    },
  },
  components: { Login },

  methods: {
    //登入点击
    loginClick() {
      this.$refs.login.dialogVisible = true;
    },
    //退出登入点击
    logOut() {
      this.$store.commit("isLogin", false);
    },
    //返回点击
    backClick(){
      this.$router.go(-1)
    }
  },
};
</script>

<style scoped="scoped">
#nav-bar {
  width: 100%;
  height: 50px;
  background-color: crimson;
  display: flex;
}
.left {
  width: 25%;
  line-height: 50px;
}
.left img {
  height: 25px;
  vertical-align: middle;
  padding-left: 15px;
  padding-bottom: 5px;
  /* 一行显示 */
}
.left span {
  color: #fff;
  vertical-align: middle;
}
.back img {
  height: 25px;
  vertical-align: middle;
  margin-right: 10px;
}
.input input {
  height: 20px;
  outline: none;
  border: 1px solid rgba(255, 255, 255, 0.158);
  background-color: crimson;
  border-radius: 25px;
  caret-color: #fff;
  /* //光标颜色 */
}
.search img {
  height: 25px;
  vertical-align: middle;
}
.center {
  width: 25%;
  line-height: 50px;
}
.input {
  margin: 0 5px;
}
input::-webkit-input-placeholder {
  color: rgba(229, 182, 182, 0.808);
  font-size: 7px;
  /* placeholder字体颜色 */
}
.right {
  width: 25%;
  line-height: 50px;
  vertical-align: middle;
}
.right img {
  height: 20px;
  vertical-align: middle;
  padding: 0 10px;
}
span {
  cursor: pointer;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
  line-height: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.login {
  width: 25%;
  text-align: center;
  line-height: 50px;
}
.user span {
  font-size: 7px;
  color: #fff;
  vertical-align: middle;
}
.user img {
  height: 20px;
  vertical-align: middle;
}
.click span {
  font-size: 15px;
  color: #fff;
  cursor: pointer;
  vertical-align: middle;
}
.click span:hover {
  color: rgb(221, 150, 159);
}
.change:hover {
  color: rgb(126, 57, 8);
}
</style>
