<template>
  <div>
    <el-dialog title="登录" :visible.sync="dialogVisible" center width="20%">
      <el-form
        label-width="auto"
        class="demo-ruleForm"
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        status-icon
      >
        <el-form-item label="手机号" prop="user">
          <el-input
            placeholder="请输入手机号"
            v-model.number="ruleForm.user"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="pass">
          <el-input
            placeholder="请输入密码"
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>

      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >登 录</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { phoneLogin } from "@/network/login";
export default {
  name: "",
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
      dialogVisible: false,
    };
  },

  components: {},

  methods: {
    //发送手机登入网络请求
    phoneLogin(data) {
      phoneLogin(data.user, data.pass)
        .then((res) => {
          if (res.code === 200) {
            //登入成功的提示
            this.$message({
              message: "恭喜你,登入成功",
              type: "success",
            });
            //登入框消失
            this.dialogVisible = false;
            //将用户信息提交到vuex中
            this.$store.commit("getProfile", res);
            //将登入状态提交到vuex
            this.$store.commit("isLogin", true);
          } else {
            this.$message.error("密码错误");
          }
        })
        .catch((error) => {
          this.$message({
            message: "账号不存在",
            type: "warning",
          });
        });
    },
    submitForm(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        //验证通过发送登录请求
        if (valid) {
          let data = {
            user: this.ruleForm.user,
            pass: this.ruleForm.pass,
          };
          //调用手机登录网络请求
          this.phoneLogin(data);
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style scoped="scoped">
.dialog-footer {
  text-align: center;
}
</style>
