<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item><b>物品管理</b></el-breadcrumb-item>
          <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="goods_main">
        <!-- 查询商品状态 -->
        <el-row>
          <el-col :span="10">
            <el-select
              v-model="typeId"
              clearable
              placeholder="请选择"
              @change="searchGoodsById"
            >
              <el-option label="待审核" :value="0"></el-option>
              <el-option label="审核通过" :value="1"></el-option>
              <el-option label="审核不通过" :value="2"></el-option>
            </el-select>
          </el-col>
        </el-row>
        <!-- 显示商品具体信息表格 -->
        <el-table
          :data="
            tableData.slice(
              (currentPage - 1) * pageSize,
              currentPage * pageSize
            )
          "
          stripe
          style="width: 100%"
        >
          <el-table-column width="100">#</el-table-column>
          <el-table-column prop="image" label="商品图片" width="100">
            <template slot-scope="scope">
              <img :src="scope.row.image" width="50" height="50" />
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="商品名称"
            width="200"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="checkType" label="状态" width="100">
            <template slot-scope="scope">
              <el-tag
                type="primary"
                size="small"
                v-if="scope.row.checkType === 0"
                >待审核</el-tag
              >
              <el-tag
                type="success"
                size="small"
                v-else-if="scope.row.checkType === 1"
                >审核通过</el-tag
              >
              <el-tag type="danger" size="small" v-else>审核不通过</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="cate" label="类别" width="150">
            <template slot-scope="scope">
              <el-tag type="success" effect="dark" size="small">{{
                scope.row.cate
              }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="nickname"
            label="上传者"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="remark"
            label="备注"
            width="200"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="操作" width="150">
            <template>
              <el-button size="small" circle icon="el-icon-s-tools"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="footer">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="pageSize"
          @current-change="currentChange"
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
      // 保存要查询的商品状态id
      typeId: "",
      // 保存商品表格数据
      tableData: [],
      total: 0,
      currentPage: 1,
      pageSize: 4,
    };
  },
  created() {
    this.getGoods(0);
  },
  methods: {
    // 获取待审核商品数据
    async getGoods(id) {
      const { data: res } = await this.$http.request({
        url: "back/goods_check/showGoodsBack",
        method: "post",
        data: {
          id,
        },
      });
      if (res.code !== 200) {
        return this.$message.error(res.message);
      }
      this.tableData = [];
      this.total = res.data.length;
      res.data.forEach((item) => {
        let obj = {};
        obj.id = item.id;
        obj.checkType = item.checkType;
        obj.image = item.image;
        obj.name = item.name;
        obj.cate = `${item.firstName} / ${item.secondName}`;
        obj.nickname = item.nickname;
        obj.remark = item.remark;
        this.tableData.push(obj);
      });
    },

    // 根据选择器查找不同状态下的商品信息
    async searchGoodsById() {
      let id = this.typeId;
      this.getGoods(id);
      this.typeId = "";
    },

    // 当前页码发生改变
    currentChange(currentPage) {
      this.currentPage = currentPage;
    },
  },
};
</script>

<style lang="less" scoped>
.el-card {
  height: 610px;

  .goods_main {
    .el-select {
      width: 400px;
    }
  }

  .footer {
    margin: 15px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
