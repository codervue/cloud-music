<template>
  <div>
    <div id="nav-bar">
      <div class="left">
        <span><img src="@/assets/img/music.svg" alt="" /></span>
        <span class="change">网 抑 云 音 乐</span>
      </div>

      <div class="center">
        <span class="back" @click="backClick"
          ><img src="@/assets/img/back.svg" alt=""
        /></span>
        <!-- 搜索框 -->
        <search></search>
      </div>

      <div class="login">
        <div class="click" v-if="!isLogin">
          <span @click="loginClick">登录</span>
        </div>
        <div class="user" v-else>
          <img :src="profile.avatarUrl" alt="" />
          <el-dropdown @command="logOut">
            <span class="el-dropdown-link">{{ profile.nickname }}</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>退出登入</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>

      <div class="right">
        <span @click="changColorClick" title="更换主题颜色"
          ><img src="@/assets/img/close.svg" alt=""
        /></span>
        <span><img src="@/assets/img/set.svg" alt="" /></span>
        <span><img src="@/assets/img/message.svg" alt="" /></span>
        <span><img src="@/assets/img/zuixiaohua.svg" alt="" /></span>
        <span><img src="@/assets/img/zuidahua.svg" alt="" /></span>
        <span><img src="@/assets/img/guanbi.svg" alt="" /></span>
      </div>

      <!-- 换肤框 -->
      <div class="clothes" v-if="isShowClothes">
        <div class="red" title="红色" @click="redClick"></div>
        <div class="blue" title="蓝色" @click="blueClick"></div>
        <div class="gray" title="灰色" @click="grayClick"></div>
      </div>
    </div>
    <!-- 登入框 -->
    <login ref="login" @getUserInfo="getUserInfo"></login>
  </div>
</template>

<script>
import Login from "@/components/content/login/Login.vue";
import Search from "@/components/content/search/Search.vue";
import { getUserInfo } from "@/network/login";

export default {
  name: "",
  data() {
    return {
      profile: "",
      isShowClothes: false,
    };
  },
  created() {
    //从本地读取用户信息
    let userId = localStorage.getItem("userId");
    this.getUserInfo(userId);
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    },
  },
  components: { Login, Search },

  methods: {
    getUserInfo(userId) {
      if (!userId) return;
      getUserInfo(userId).then((res) => {
        this.profile = res.profile;
        //将登入状态提交到vuex
        this.$store.commit("isLogin", true);
        //获取用户喜欢音乐列表
        this.$store.dispatch("likedMusic")
      });
    },
    //登入点击
    loginClick() {
      this.$refs.login.dialogVisible = true;
    },
    //退出登入点击
    logOut() {
      //删除本地用户id
      window.localStorage.removeItem("userId");
      //清空歌单
      this.$store.commit("listDetail", "");
      //路由跳转
      this.$router.replace("/find");
      //提交退出状态
      this.$store.commit("isLogin", false);
      this.$message({
        message: "退出成功",
        type: "success",
      });
    },
    //返回点击
    backClick() {
      this.$router.go(-1);
    },
    //点击颜色框的显隐
    changColorClick() {
      this.isShowClothes = !this.isShowClothes;
    },

    //变色回调
    redClick(){
      var bgc = document.getElementById("nav-bar")
      bgc.style.backgroundColor = "#e13e3e"
    },
    blueClick(){
      var bgc = document.getElementById("nav-bar")
      bgc.style.backgroundColor = "#3e8fe1d7"
    },
    grayClick(){
      var bgc = document.getElementById("nav-bar")
      bgc.style.backgroundColor = "grey"
    },

    
  },
};
</script>

<style scoped="scoped">
#nav-bar {
  height: 50px;
  background-color: #e13e3e;
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
}
.back img {
  height: 25px;
  vertical-align: middle;
  margin-right: 10px;
}
.center {
  width: 25%;
  line-height: 50px;
  display: flex;
}
.input {
  margin: 0 5px;
}

.right {
  width: 25%;
  line-height: 50px;
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
.clothes {
  position: absolute;
  top: 55px;
  right: 180px;
  width: 100px;
  height: 30px;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0px 0px 5px rgb(0, 0, 0, 0.5);
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 100000;
}
.red {
  width: 25px;
  height: 25px;
  background-color: #e13e3e;
  border-radius: 3px;
}
.blue {
  width: 25px;
  height: 25px;
  background-color: #3e8fe1d7;
  border-radius: 3px;
}
.gray {
  width: 25px;
  height: 25px;
  background-color: grey;
  border-radius: 3px;
}
</style>
