<template>
  <div class="user_wrap">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item><b>用户管理</b></el-breadcrumb-item>
          <el-breadcrumb-item>会员管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="user_main">
        <el-button
          class="insert_btn"
          type="danger"
          icon="el-icon-plus"
          @click="dialogVisible = true"
          >添加管理员</el-button
        >
        <!-- 添加管理员对话框 -->
        <el-dialog title="添加管理员" :visible.sync="dialogVisible" width="50%">
          <el-form
            :model="userForm"
            :rules="userRules"
            ref="userForm"
            label-width="100px"
          >
            <el-form-item label="用户名" prop="username">
              <el-input v-model="userForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="userForm.password"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="userForm.email"></el-input>
            </el-form-item>
            <el-form-item label="电话号码" prop="phone">
              <el-input
                v-model="userForm.phone"
                onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
                maxlength="11"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-upload
                drag
                action="https://jsonplaceholder.typicode.com/posts/"
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                  将图片拖到此处，或<em>点击上传</em>
                </div>
              </el-upload>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false"
              >确 定</el-button
            >
          </span>
        </el-dialog>
        <el-row :gutter="20">
          <el-col :span="4">
            <el-input placeholder="请输入用户名称"> </el-input>
          </el-col>
          <el-col :span="4">
            <el-input placeholder="请输入邮箱地址"></el-input>
          </el-col>
          <el-col :span="4">
            <el-input placeholder="请输入手机号码"></el-input>
          </el-col>
          <el-col :span="3">
            <el-select v-model="gender" placeholder="请选择性别">
              <el-option label="男" value="male"></el-option>
              <el-option label="女" value="female"></el-option>
            </el-select>
          </el-col>
          <el-col :span="3">
            <el-select v-model="roles" placeholder="请选择管理员">
              <el-option label="超级管理员" value="male"></el-option>
              <el-option label="管理员" value="female"></el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-select v-model="order" placeholder="请选择排序方式">
              <el-option label="升序" value="male"></el-option>
              <el-option label="降序" value="female"></el-option>
            </el-select>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" icon="el-icon-search" plain></el-button>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 保存管理员表单数据
      userForm: {
        username: "",
        password: "",
        email: "",
        phone: "",
        avatarUrl: "",
      },
      userRules: {
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
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          { type: "email", message: "请输入正确的邮箱地址", trigger: "blur" },
        ],
        phone: [{ required: true, message: "请输入手机号码", trigger: "blur" }],
      },
      gender: "",
      roles: "",
      order: "",
      // 控制添加管理员对话框的显示与隐藏
      dialogVisible: false,
    };
  },
};
</script>

<style lang="less" scoped>
.el-card {
  height: 610px;

  .user_main {
    .insert_btn {
      margin: 0 50%;
      margin-bottom: 10px;
    }

    .el-upload {
      margin-left: 55%;
    }
  }
}
</style>
