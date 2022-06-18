<template>
  <div>
    <el-dialog title="登录" :visible.sync="dialogVisible" center width="20%">
      <div class="login">
        <!-- 手机号登录 -->
        <div
          class="phone-login common"
          @click="isShow = true"
          :class="{ active: isShow }"
        >
          手机号登录
        </div>
        <div>|</div>
        <!-- 验证码登录 -->
        <div
          class="code-login common"
          @click="isShow = false"
          :class="{ active: !isShow }"
        >
          验证码登录
        </div>
      </div>

      <!-- 输入框 -->
      <div class="box">
        <pass-login v-if="isShow" @isShowDialog="isShowDialog"></pass-login>
        <code-login v-else @isShowDialog="isShowDialog"></code-login>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import PassLogin from "./childcomps/PassLogin.vue";
import CodeLogin from "./childcomps/CodeLogin.vue";
export default {
  name: "",
  data() {
    return {
      dialogVisible: false,
      isShow: true,
    };
  },
  components: { PassLogin, CodeLogin },

  methods: {
    //登录框消失
    isShowDialog() {
      this.dialogVisible = false;
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
