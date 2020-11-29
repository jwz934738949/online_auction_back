<template>
  <div class="login_wrap">
    <!-- 登录表单 -->
    <el-form
      label-width="80px"
      :model="loginForm"
      :rules="loginRules"
      ref="loginFormRef"
    >
      <!-- 登录头像 -->
      <img src="../assets/logo.png" alt="" class="avatar" />
      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          placeholder="请输入密码"
          show-password
          @keyup.enter.native="login()"
        ></el-input>
      </el-form-item>
      <el-form-item class="btn_group">
        <el-button type="primary" round @click="login()">管理员登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 登录表单信息
      loginForm: {
        username: "",
        password: "",
      },
      // 登录表单验证规则
      loginRules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          {
            min: 5,
            max: 15,
            message: "长度在 5 到 15 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "长度在 6 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 登录事件
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) {
          return this.$message.error("用户登录失败！");
        }
        const { data: res } = await this.$http.request({
          url: "back/user/login",
          method: "post",
          data: this.loginForm,
        });
        console.log(res);
        let token = "Bearer" + res.data.auth;
        let avatarUrl = res.data.user.avatarUrl;
        window.sessionStorage.setItem("avatarUrl", avatarUrl);
        window.sessionStorage.setItem("auth", token);
        if (res.code !== 200) {
          return this.$message.error(res.message);
        }
        this.$message.success("用户登录成功!");
        this.$router.push("/home");
      });
    },
  },
};
</script>

<style lang="less" scoped>
.el-form {
  width: 40%;
  height: 40%;
  margin: 150px auto;
  padding: 70px;
  position: relative;
  box-shadow: 0 0 3px #000;
  border-radius: 5px;

  .avatar {
    height: 100px;
    width: 100px;
    background-color: #3b4962;
    padding: 5px;
    position: absolute;
    top: -70px;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: 0 0 5px #000;
    border-radius: 10%;
  }

  // 修改默认样式要添加/deep/
  /deep/.el-input__inner {
    width: 80%;
    text-align: center;
    border: 2px solid #3498db;
    border-radius: 24px;
    background: #272d2f;
    color: #fff;
    transition: 1s;
  }

  /deep/.el-input__inner:focus {
    width: 95%;
    height: 45px;
    border-color: #2ecc71;
  }

  .btn_group {
    width: 88%;
    display: flex;
    justify-content: center;
    align-items: center;

    .el-button {
      flex: 1;
      margin-top: 15px;
      width: 300px;
    }
  }
}
</style>
