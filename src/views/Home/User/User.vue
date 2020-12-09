<template>
  <div class="user_wrap">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item><b>用户管理</b></el-breadcrumb-item>
          <el-breadcrumb-item>管理员管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="user_main">
        <!-- 查询管理员信息 -->
        <el-row :gutter="24">
          <el-col :span="4" :pull="1">
            <el-button
              class="insert_btn"
              type="danger"
              icon="el-icon-plus"
              @click="dialogVisible = true"
              >添加管理员</el-button
            >
            <!-- 添加管理员对话框 -->
            <el-dialog
              title="添加管理员"
              :visible.sync="dialogVisible"
              width="50%"
              top="20px"
            >
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
                  <el-input
                    v-model="userForm.password"
                    show-password
                  ></el-input>
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
                    action="http://auction.redarm.cn/api/back/user/avatar"
                    :limit="1"
                    accept=".jpg,.png"
                    :on-success="handleSuccess"
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
                <el-button type="primary" @click="addUser()">确 定</el-button>
              </span>
            </el-dialog>
          </el-col>
          <el-col :span="4">
            <el-input
              placeholder="请输入用户名称"
              v-model="selectUserObj.username"
            >
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-input
              placeholder="请输入邮箱地址"
              v-model="selectUserObj.email"
            ></el-input>
          </el-col>
          <el-col :span="4">
            <el-input
              placeholder="请输入手机号码"
              v-model="selectUserObj.phone"
            ></el-input>
          </el-col>
          <el-col :span="4">
            <el-select
              v-model="selectUserObj.desc"
              placeholder="请选择排序方式"
            >
              <el-option label="升序" value=""></el-option>
              <el-option label="降序" value="desc"></el-option>
            </el-select>
          </el-col>
          <el-col :span="2">
            <el-button
              type="primary"
              icon="el-icon-search"
              plain
              @click="selectUser"
            ></el-button>
          </el-col>
        </el-row>
        <!-- 管理员信息 -->
        <el-table :data="userList" stripe style="width: 100%">
          <el-table-column type="index" width="100"> </el-table-column>
          <el-table-column
            prop="username"
            label="用户名称"
            width="180"
            sortable
          >
          </el-table-column>
          <el-table-column prop="email" label="邮箱" width="230">
          </el-table-column>
          <el-table-column prop="phone" label="电话" width="230">
          </el-table-column>
          <el-table-column prop="roles" label="权限" width="150">
            <template slot-scope="scope">
              <el-tag
                v-if="scope.row.roles === '超级管理员'"
                effect="dark"
                type="danger"
                >{{ scope.row.roles }}</el-tag
              >
              <el-tag v-else effect="dark">{{ scope.row.roles }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-edit"
                round
                size="small"
                @click="showUpdateDialog(scope.row)"
                >修改</el-button
              >
              <!-- 添修改管理员对话框 -->
              <el-dialog
                title="修改管理员"
                :visible.sync="updateDialogVisible"
                width="50%"
                top="20px"
              >
                <el-form
                  :model="userForm"
                  :rules="userRules"
                  ref="userForm"
                  label-width="100px"
                >
                  <el-form-item label="用户名" prop="username">
                    <el-input v-model="userForm.username" disabled></el-input>
                  </el-form-item>
                  <el-form-item label="密码" prop="password">
                    <el-input
                      v-model="userForm.password"
                      show-password
                    ></el-input>
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
                  <el-form-item label="修改头像">
                    <el-upload
                      class="avatar-uploader"
                      action="http://auction.redarm.cn/api/back/user/avatar"
                      :show-file-list="false"
                      :on-success="handleSuccess"
                      :limit="1"
                    >
                      <img
                        v-if="userForm.avatarUrl"
                        :src="userForm.avatarUrl"
                        class="avatar"
                      />
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="updateDialogVisible = false"
                    >取 消</el-button
                  >
                  <el-button type="primary" @click="updateUser()"
                    >确 定</el-button
                  >
                </span>
              </el-dialog>
              <el-button
                type="danger"
                icon="el-icon-delete"
                round
                size="small"
                @click="deleteUser(scope.row.username)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 显示分页组件 -->
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="pageList.pagesize"
          :current-page="pageList.pagestart"
          @current-change="changePageNum"
        >
        </el-pagination>
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
      // 控制修改管理员对话框的显示与隐藏
      updateDialogVisible: false,
      // 管理员数据列表
      userList: [],
      // 保存分页数据
      pageList: {
        // 保存一页的数据条数
        pageSize: 10,
        // 保存页码
        pageStart: 1,
      },
      // 总条数
      total: 0,
      // 查询表单
      selectUserObj: {
        username: "",
        email: "",
        phone: "",
        desc: "",
      },
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    // 获取管理员信息列表
    async getUserInfo() {
      const { data: res } = await this.$http.request({
        url: "back/user/userInfo",
        method: "post",
        data: this.pageList,
      });
      if (res.code !== 200) {
        return this.$message.error(res.message);
      }
      this.total = res.data[0];
      this.userList = [];
      res.data[1].forEach((item) => {
        let userObj = {};
        userObj.avatarUrl = item.avatarUrl;
        userObj.id = item.id;
        userObj.username = item.username;
        userObj.email = item.email;
        userObj.phone = item.phone;
        userObj.roles = item.roles === "ADMIN" ? "超级管理员" : "普通管理员";
        this.userList.push(userObj);
      });
    },

    // 点击修改当前页码
    changePageNum(pagestart) {
      this.pageList.pageStart = pagestart;
      this.getUserInfo();
    },

    // 处理图片上传成功事件
    handleSuccess(file) {
      let { avatarUrl } = file.data;
      this.userForm.avatarUrl = avatarUrl;
    },

    // 添加管理员信息
    async addUser() {
      const { data: res } = await this.$http.request({
        url: "/back/user/addUser",
        method: "post",
        data: this.userForm,
      });
      if (res.code !== 200) {
        return this.$message.error(res.message);
      }
      this.$message.success("添加管理员成功!");
      this.dialogVisible = false;
      this.getUserInfo();
      this.userForm = [];
    },

    // 查询管理员
    async selectUser() {
      const { data: res } = await this.$http.request({
        url: "back/user/getUser",
        method: "post",
        data: this.selectUserObj,
      });
      if (res.code !== 200) {
        return this.$message.error(res.message);
      }
      this.selectUserObj = [];
      this.userList = [];
      res.data.forEach((item) => {
        let userObj = {};
        userObj.id = item.id;
        userObj.username = item.username;
        userObj.email = item.email;
        userObj.phone = item.phone;
        userObj.roles = item.roles === "ADMIN" ? "超级管理员" : "普通管理员";
        this.userList.push(userObj);
      });
    },

    // 显示修改管理员信息对话框
    showUpdateDialog(userData) {
      this.userForm = [];
      console.log(userData);
      this.updateDialogVisible = true;
      this.userForm = userData;
    },

    // 更新管理员信息
    async updateUser() {
      const { data: res } = await this.$http.request({
        url: "back/user/updateUserInfo",
        method: "post",
        data: this.userForm,
      });
      if (res.code !== 200) {
        return this.$message.error(res.message);
      }
      this.$message.success("修改管理员信息成功");
      this.updateDialogVisible = false;
    },

    // 删除管理员信息
    deleteUser(username) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data: res } = await this.$http.request({
            url: "back/user/deleteUser",
            method: "post",
            data: {
              username,
            },
          });
          this.$message.success("删除成功");
          this.getUserInfo();
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
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

    .el-table {
      margin-top: 20px;

      .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .avatar-uploader .el-upload:hover {
        border-color: #409eff;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
      }
      .avatar {
        width: 178px;
        height: 178px;
        display: block;
      }
    }

    .el-pagination {
      margin-top: 30px;
      position: absolute;
      right: 20px;
    }
  }
}
</style>
