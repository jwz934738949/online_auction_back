<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item><b>交易管理</b></el-breadcrumb-item>
          <el-breadcrumb-item>分类统计</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="add_up_main">
        <!--      放置echarts图表-->
        <div id="echarts"></div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 保存分类统计数据
      cateData: []
    }
  },
  mounted() {
    this.echartsInit();
  },
  methods: {
    // 获取所有分类物品数量
    async getCateNum() {
      const {data: res} = await this.$http.request({
        url: 'back/goods_type/sumGoodsType',
        method: 'post'
      })
      if (res.code !== 200) {
        return this.$message.error(res.message)
      }
      this.cateData = [];
      res.data.forEach(item => {
        let obj = {};
        obj.name = item.firstType + "  " + item.nums;
        obj.value = item.nums;
        if (item.secondList.length !== 0) {
          obj.children = [];
          item.secondList.forEach(item2 => {
            let obj2 = {};
            obj2.name = item2.secondType + "  " + item2.nums;
            obj2.value = item2.nums;
            obj.children.push(obj2);
          })
        }
        this.cateData.push(obj);
      })
    },

    // 初始化图表内容
    async echartsInit() {
      await this.getCateNum();
      let echarts = require('echarts');
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('echarts'));
      // 绘制图表
      myChart.setOption({
        title: {
          text: '物品分类数量统计'
        },
        series: {
          type: 'sunburst',
          data: this.cateData
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.el-card {
  height: 610px;

  .add_up_main {

    #echarts {
      width: 1024px;
      height: 500px;
    }
  }
}
</style>