<template>
  <div>
    <el-dialog title="登录" :visible.sync="dialogVisible" center width="20%">
      <div class="login">
        <div
          class="phone-login common"
          @click="phoneLoginClick"
          :class="{ active: isShow }"
        >
          手机号登录
        </div>
        <div>|</div>
        <div
          class="code-login common"
          @click="codeLoginClick"
          :class="{ active: !isShow }"
        >
          验证码登录
        </div>
      </div>

      <!-- 输入框 -->
      <div class="box">
        <child-login
          :is-show="isShow"
          @isShowDialog="isShowDialog"
          @getUserInfo="getUserInfo"
        ></child-login>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ChildLogin from "./childcomps/ChildLogin.vue";
export default {
  name: "",
  data() {
    return {
      dialogVisible: false,
      isShow: true,
    };
  },
  components: { ChildLogin },

  methods: {
    phoneLoginClick() {
      this.isShow = true;
    },
    codeLoginClick() {
      this.isShow = false;
    },
    //登框消失
    isShowDialog() {
      this.dialogVisible = false;
    },
    //发送用户id
    getUserInfo(userId) {
      this.$emit("getUserInfo", userId);
    },
  },
};
</script>

<style scoped="scoped">
.login {
  display: flex;
  justify-content: space-evenly;
}
.common:hover {
  color: rgb(0, 128, 255);
  cursor: pointer;
}
.box {
  margin: 30px 0;
}
.active {
  /* font-size: 15px; */
  font-weight: 600;
}
</style>
