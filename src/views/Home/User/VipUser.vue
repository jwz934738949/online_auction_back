<template>
  <div class="vip_wrap">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item><b>用户管理</b></el-breadcrumb-item>
          <el-breadcrumb-item>会员管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="vip_content">
        <!-- 查询会员 -->
        <el-row type="flex" justify="center" align="center">
          <el-col>
            <el-input
              placeholder="请输入查询用户名"
              v-model="vipUserName"
              @keyup.enter.native="getVipUserByUsername"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="getVipUserByUsername"
              ></el-button>
            </el-input>
          </el-col>
        </el-row>
        <!-- 会员内容表格 -->
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column type="index" width="30"></el-table-column>
          <el-table-column prop="avatarUrl" label="头像" width="100">
            <template slot-scope="scope">
              <img :src="scope.row.avatarUrl" alt="" width="50" height="50" />
            </template>
          </el-table-column>
          <el-table-column prop="username" label="用户名" width="120" sortable>
          </el-table-column>
          <el-table-column prop="sex" label="性别" width="100">
            <template slot-scope="scope">
              <el-tag type="warning" effect="plain" v-if="scope.row.sex === 0"
                >男</el-tag
              >
              <el-tag type="primary" effect="plain" v-else>女</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="nickname" label="昵称" width="120">
          </el-table-column>
          <el-table-column prop="phone" label="手机号码" width="120" sortable>
          </el-table-column>
          <el-table-column prop="email" label="邮箱" width="180" sortable>
          </el-table-column>
          <el-table-column
            prop="address"
            label="收货地址"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="small"
                type="info"
                v-if="scope.row.isDelete === 0"
                @click="showBlackListVipDialog(scope.row.id)"
                >拉黑</el-button
              >
              <el-button
                size="small"
                type="primary"
                v-else
                @click="showReleaseVipDialog(scope.row.id)"
                >释放</el-button
              >
              <!-- 拉黑用户对话框 -->
              <el-dialog
                title="拉黑用户"
                :visible.sync="deleteVipDialogVisible"
                width="30%"
              >
                <span>您确认要拉黑该用户吗?</span>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="deleteVipDialogVisible = false"
                    >取 消</el-button
                  >
                  <el-button type="primary" @click="blackListVip"
                    >确 定</el-button
                  >
                </span>
              </el-dialog>
              <!-- 释放用户对话框 -->
              <el-dialog
                title="释放用户"
                :visible.sync="releaseVipDialogVisible"
                width="30%"
              >
                <span>您确认要释放该用户吗?</span>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="releaseVipDialogVisible = false"
                    >取 消</el-button
                  >
                  <el-button type="primary" @click="releaseVip(scope.row)"
                    >确 定</el-button
                  >
                </span>
              </el-dialog>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页内容 -->
        <div class="footer">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="10"
          >
          </el-pagination>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      // 获取数据的总条数
      total: 0,
      // 保存要查询的会员用户名
      vipUserName: "",
      deleteVipDialogVisible: false,
      releaseVipDialogVisible: false,
      // 保存当前选择的用户id
      vipId: 0,
    };
  },
  created() {
    this.getVipUser();
  },
  methods: {
    // 获取所有的会员信息
    async getVipUser() {
      const { data: res } = await this.$http.request({
        url: "back/vip/showVipUser",
        method: "post",
      });
      if (res.code !== 200) {
        return this.$message.error(res.message);
      }
      this.tableData = [];
      this.total = res.data.length;
      res.data.forEach((item) => {
        let obj = {};
        obj.nickname = item.nickname;
        obj.id = item.id;
        obj.email = item.email;
        obj.avatarUrl = item.avatarUrl;
        obj.phone = item.phone;
        obj.address = item.address;
        obj.sex = item.sex;
        obj.username = item.username;
        obj.isDelete = item.isDelete;
        this.tableData.push(obj);
      });
    },

    // 根据用户名查询会员
    async getVipUserByUsername() {
      const { data: res } = await this.$http.request({
        url: "back/vip/showVipUserByName",
        method: "post",
        data: {
          username: this.vipUserName,
        },
      });
      if (res.code !== 200) {
        return this.$message.error(res.message);
      }
      this.$message.success("查询成功！");
      this.vipUserName = "";
      this.tableData = res.data;
      this.total = res.data.length;
    },

    // 显示拉黑用户对话框
    showBlackListVipDialog(id) {
      this.deleteVipDialogVisible = true;
      this.vipId = id;
    },

    // 拉黑用户
    async blackListVip() {
      const { data: res } = await this.$http.request({
        url: "back/vip/deleteVip",
        method: "post",
        data: {
          id: this.vipId,
        },
      });
      if (res.code !== 200) {
        return this.$message.error(res.message);
      }
      this.$message.success("拉黑成功");
      this.getVipUser();
      this.deleteVipDialogVisible = false;
    },

    // 显示释放用户对话框
    showReleaseVipDialog(id) {
      this.releaseVipDialogVisible = true;
      this.vipId = id;
    },

    // 释放用户
    async releaseVip(vip) {
      const { data: res } = await this.$http.request({
        url: "back/vip/freeVip",
        method: "post",
        data: {
          id: this.vipId,
        },
      });
      if (res.code !== 200) {
        return this.$message.error(res.message);
      }
      this.$message.success("释放用户成功");
      this.getVipUser();
      this.releaseVipDialogVisible = false;
    },
  },
};
</script>

<style lang="less" scoped>
.el-card {
  height: 630px;

  .vip_content {
    .el-row {
      padding: 15px;
    }
  }

  .footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 15px;
  }
}
</style>
