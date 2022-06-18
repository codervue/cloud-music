<template>
  <div>
    <el-form
      label-width="auto"
      class="demo-ruleForm"
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      status-icon
    >
      <!-- 账号 -->
      <el-form-item label="" prop="user">
        <el-input
          placeholder="请输入手机号"
          v-model.number="ruleForm.user"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <!-- 验证码 -->
      <el-form-item label="" prop="code">
        <el-input
          placeholder="请输入验证码"
          v-model="ruleForm.code"
          autocomplete="off"
        >
          <template slot="append"
            ><div @click="getCodes('ruleForm')" class="get-code">
              获取验证码
            </div></template
          >
        </el-input>
      </el-form-item>
    </el-form>

    <!-- 登录 -->
    <div class="dialog-footer">
      <el-button type="primary" @click="submitForm('ruleForm')"
        >登 录</el-button
      >
    </div>
  </div>
</template>

<script>
import { codeLogin, getCode } from "@/network/login";

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      //如果没输入值，出现提示信息
      if (!value) {
        callback(new Error("请输入验证码"));
      } else {
        //否则执行回调
        callback();
      }
    };
    var validateUser = (rule, value, callback) => {
      //如果不输入值，提示手机号为空
      if (!value) {
        callback(new Error("手机号不能为空"));
      } else {
        //正则判断手机号为正确的手机号
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        //如果输入的手机号无误执行回调函数
        if (reg.test(value)) {
          callback();
        } else {
          //否则出现提示信息
          callback(new Error("请输入正确手机号"));
        }
      }
    };
    return {
      ruleForm: {
        user: "",
        code: "",
      },
      rules: {
        user: [
          { validator: validateUser, trigger: "blur" },
          { type: "number", message: "手机号必须为数字" },
        ],
        code: [{ validator: validatePass, trigger: "blur" }],
      },
    };
  },
  methods: {
    //发送验证码登入网络请求
    codeLogin(data) {
      codeLogin(data.user, data.code)
        .then((res) => {
          if (res.code !== 200) return;
          //登入成功的提示
          this.$message({
            message: "恭喜你,登入成功",
            type: "success",
          });
          //登入框消失
          this.$emit("isShowDialog");
          //存储用户id到本地
          window.localStorage.setItem("userId", res.profile.userId);
          //获取用户登录信息
          this.$store.dispatch("getUserInfo");
        })
        .catch((error) => {
          console.log(error);
          this.$message({
            message: "验证码错误,请重新输入",
            type: "warning",
          });
        });
    },
    //登录点击回调
    submitForm(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        //验证通过发送登录请求
        if (valid) {
          let data = {
            user: this.ruleForm.user,
            code: this.ruleForm.code,
          };
          //调用验证码登录网络请求
          this.codeLogin(data);
        } else {
          return false;
        }
      });
    },
    //验证码发送回调
    getCodes(ruleForm) {
      this.$refs[ruleForm].validateField("user", (valid) => {
        //效验通过才进行的操作
        if (!valid) {
          this.backTime();
          //发送验证码
          let user = this.ruleForm.user;
          getCode(user).then((res) => {
            console.log(res);
          });
        } else {
          return false;
        }
      });
    },
    //倒计时函数
    backTime() {
      let code = document.getElementsByClassName("get-code")[0];
      let count = 60;
      let timer = setInterval(() => {
        count--;
        code.innerHTML = count + "s";
        if (count == 0) {
          clearInterval(timer);
          code.innerHTML = "重新获取验证码";
        }
      }, 1000);
    },
  },
};
</script>

<style scoped='scoped'>
.dialog-footer {
  margin-top: 20px;
}
.el-button {
  width: 100%;
}
.get-code {
  cursor: pointer;
}
.get-code:active {
  color: black;
}
</style>