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

      <!-- 密码 -->
      <el-form-item label="" prop="pass">
        <el-input
          placeholder="请输入密码"
          type="password"
          v-model="ruleForm.pass"
          autocomplete="off"
          :show-password="true"
        >
          <template slot="append">
            <i class="iconfont icon-mima"></i>
          </template>
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
import { passLogin } from "@/network/login";

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      //如果没输入值，出现提示信息
      if (!value) {
        callback(new Error("请输入密码"));
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
        pass: "",
      },
      rules: {
        user: [
          { validator: validateUser, trigger: "blur" },
          { type: "number", message: "手机号必须为数字" },
        ],
        pass: [{ validator: validatePass, trigger: "blur" }],
      },
    };
  },
  methods: {
    //发送手机登入网络请求
    passLogin(data) {
      passLogin(data.user, data.pass)
        .then((res) => {
          if (res.code !== 200)
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
            message: "密码错误，请重新输入",
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
            pass: this.ruleForm.pass,
          };
          //调用手机登录网络请求
          this.passLogin(data);
        } else {
          return false;
        }
      });
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
</style>