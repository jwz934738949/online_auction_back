<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item><b>交易管理</b></el-breadcrumb-item>
          <el-breadcrumb-item>订单管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="order_main">
        <!-- 显示商品具体信息表格 -->
        <el-table :data="tableData.slice((pageNum - 1) * pageSize, pageNum * pageSize)" stripe style="width: 100%">
          <el-table-column type="index" width="60"></el-table-column>
          <el-table-column prop="image" label="商品图片" width="100">
            <template slot-scope="scope">
              <img :src="scope.row.image" width="50" height="50"/>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="商品名称" width="150" show-overflow-tooltip></el-table-column>
          <el-table-column prop="cateType" label="商品分类" width="150">
            <template slot-scope="scope">
              <el-tag type="success" size="small">{{ scope.row.cateType }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="bond" label="保证金" width="150"></el-table-column>
          <el-table-column prop="price" label="竞拍金额" width="150"></el-table-column>
          <el-table-column prop="fromname" label="卖家" width="150"></el-table-column>
          <el-table-column prop="toname" label="买家" width="150"></el-table-column>
          <el-table-column prop="remark" label="备注"  show-overflow-tooltip></el-table-column>
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
      tableData: [],
      total: 0,
      pageSize: 5,
      pageNum: 1,
    }
  },
  created() {
    this.getOrderData();
  },
  methods: {
    // 获取所有订单数据
    async getOrderData() {
      const {data: res} = await this.$http.request({
        url: 'back/order/BackShowOrder',
        method: 'post'
      });
      if (res.code !== 200) {
        return this.$message.error(res.message);
      }
      console.log(res)
      this.total = res.data.length;
      this.tableData = [];
      res.data.forEach(item => {
        let obj = {};
        obj.uuid = item.uuid;
        obj.name = item.name;
        obj.image = item.image;
        obj.cateType = item.firsttype + ' / ' + item.secondtype;
        obj.bond = item.bond;
        obj.price = item.price;
        obj.fromname = item.fromname;
        obj.toname = item.toname;
        obj.remark = item.remark;
        this.tableData.push(obj);
      })
    },

    // 当前页发生变化时调用
    currentChange(pageNum) {
      this.pageNum = pageNum;
    }
  }
}
</script>

<style lang="less" scoped>
.el-card {
  height: 610px;

  .footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 15px;
  }
}
</style>