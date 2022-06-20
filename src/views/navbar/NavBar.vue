<template>
  <div>
    <div id="nav-bar">
      <div class="left">
        <span><i class="iconfont icon-wangyiyunyinle"></i></span>
        <span class="change" @click="refreshClick">网 抑 云 音 乐</span>
      </div>

      <div class="center">
        <span class="back" @click="backClick"
          ><img src="@/assets/img/back.svg" alt=""
        /></span>
        <!-- 搜索框 -->
        <search></search>
      </div>

      <div class="login">
        <div class="click" v-if="!$store.state.isLogin">
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
    <!-- <login ref="login"></login> -->
  </div>
</template>

<script>
import Login from "@/components/login/Login.vue";
import Search from "@/components/search/Search.vue";

export default {
  name: "",
  data() {
    return {
      isShowClothes: false,
    };
  },
  created() {},
  computed: {
    profile() {
      return this.$store.state.userInfo;
    },
  },
  components: { Login, Search },

  methods: {
    //登入点击
    loginClick() {
      this.$refs.login.dialogVisible = true;
    },
    //退出登入点击
    logOut() {
      this.$store.dispatch("logOut");
      //路由跳转
      this.$router.replace("/find");
      //提示信息
      this.$message({
        message: "退出成功",
        type: "success",
      });
    },
    //返回点击
    backClick() {
      this.$router.go(-1);
    },
    //logo点击回调
    refreshClick() {
      this.$router.replace("/find");
    },
    //点击颜色框的显隐
    changColorClick() {
      this.isShowClothes = !this.isShowClothes;
    },

    //变色回调
    redClick() {
      var bgc = document.getElementById("nav-bar");
      bgc.style.backgroundColor = "#e13e3e";
    },
    blueClick() {
      var bgc = document.getElementById("nav-bar");
      bgc.style.backgroundColor = "#3e8fe1d7";
    },
    grayClick() {
      var bgc = document.getElementById("nav-bar");
      bgc.style.backgroundColor = "grey";
    },
  },
};
</script>

<style scoped="scoped">
#nav-bar {
  height: 60px;
  background-color: #e13e3e;
  display: flex;
  line-height: 60px;
}
.left {
  width: 25%;
}
.left img {
  width: 25px;
  height: 25px;
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
  display: flex;
}
.input {
  margin: 0 5px;
}

.right {
  width: 25%;
}
.right img {
  width: 20px;
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
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.login {
  width: 25%;
  text-align: center;
}
.user span {
  font-size: 7px;
  color: #fff;
}
.user img {
  height: 20px;
  vertical-align: middle;
}
.click span {
  font-size: 15px;
  color: #fff;
  cursor: pointer;
}
.click span:hover {
  color: rgb(221, 150, 159);
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
.iconfont {
  font-size: 25px;
  margin-left: 20px;
}
</style>
