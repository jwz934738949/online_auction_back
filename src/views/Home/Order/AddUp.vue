<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item><b>交易管理</b></el-breadcrumb-item>
          <el-breadcrumb-item>竞拍统计</el-breadcrumb-item>
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
      // 保存天数
      dateList: [],
      // 保存总价格
      priceList: [],
      // 交易数量
      numList: []
    }
  },
  mounted() {
    this.echartsInit();
  },
  methods: {
    // 获取统计数据
    async getAddUp() {
      const {data: res} = await this.$http.request({
        url: 'back/order/SumPrice',
        method: 'post'
      })
      if (res.code !== 200) {
        return this.$message.error(res.message);
      }
      this.dateList = res.data[0];
      this.priceList = res.data[1];
      this.numList = res.data[2];
    },

    // 初始化图表内容
    async echartsInit() {
      await this.getAddUp();
      let echarts = require('echarts');
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('echarts'));
      // 绘制图表
      myChart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              },
            }
          },
          legend: {
            data: ['总金额', '总数量'],
            x: 'left'
          },
          color: ["#0080ff", "#4cd5ce"],
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              boundaryGap: false,
              data: this.dateList
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '总金额',
              type: 'line',
              stack: '总量',
              itemStyle: {
                normal: {   //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0, color: '#d7f4f8' // 0% 处的颜色
                    }, {
                      offset: 0.5, color: '#eefcfd' // 100% 处的颜色
                    }, {
                      offset: 1, color: '#fff' // 100% 处的颜色
                    }]
                  ),  //背景渐变色
                  lineStyle: {        // 系列级个性化折线样式
                    width: 3,
                    type: 'solid',
                    color: "#4fd6d2"
                  }
                },
                emphasis: {
                  color: '#4fd6d2',
                  lineStyle: {        // 系列级个性化折线样式
                    width: 2,
                    type: 'dotted',
                    color: "#4fd6d2" //折线的颜色
                  }
                }
              },//线条样式
              symbolSize: 5, //折线点的大小
              areaStyle: {normal: {}},
              data: this.priceList
            },
            {
              name: '总数量',
              type: 'line',
              stack: '总量',
              itemStyle: {
                normal: { //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0, color: '#81befd' // 0% 处的颜色
                    }, {
                      offset: 0.4, color: '#e4f2ff' // 100% 处的颜色
                    }, {
                      offset: 1, color: '#fff' // 100% 处的颜色
                    }]
                  ), //背景渐变色
                  lineStyle: {        // 系列级个性化折线样式
                    width: 3,
                    type: 'solid',
                    color: "#0180ff" //折线的颜色
                  }
                },
                emphasis: {
                  color: '#0180ff',
                  lineStyle: {        // 系列级个性化折线样式
                    width: 2,
                    type: 'dotted',
                    color: "0180ff"
                  }
                }
              },//线条样式
              symbolSize: 5, //折线点的大小
              label: {
                normal: {
                  show: true,
                  position: 'top'
                }
              },
              areaStyle: {normal: {}},
              data: this.numList
            }
          ]
        }
      )
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