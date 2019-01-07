<template>
  <div class="lab-charts" v-loading="chartsLoading">
    <div class="home-btn" @click="goHome">
      <i class="fa fa-fw fa-home"></i>
    </div>
    <div class="charts-line" flex="main:justify cross:center">
      <div class="chart-line small">
        <div class="chart-wrapper" style="height: 25vh">
          <div class="chart-box">
            <div class="chart-title">项目统计</div>
            <div class="chart-list">
              <div class="list-line" :class="item.status" v-for="(item,index) in projectList" :key="index" flex="main:center cross:center">
                <i class="fa fa-fw animated" :class="iconMap[item.status]"></i>
                <div class="line-title">{{statusMap[item.status]}}</div>
                <div class="line-num">{{item.amount}}</div>
                <div class="line-percent">({{(item.amount/projectAmount*100).toFixed(2)}}%)</div>
              </div>
            </div>
          </div>
        </div>
        <div class="chart-wrapper" style="height: 42vh">
          <v-chart class="chart-box" :options="typePie" />
        </div>
        <div class="chart-wrapper" style="height: 33vh">
          <v-chart class="chart-box" :options="progressPie" />
        </div>
      </div>
      <div class="chart-line large">
        <div class="chart-wrapper" style="height: 65vh">
          <div class="chart-box main-box">
            <div class="main-title">
              <div class="chart-title">项目总数：</div>
              <div class="main-num">{{projectAmount}}</div>
            </div>
          </div>
        </div>
        <div class="chart-wrapper" style="height: 35vh">
          <v-chart class="chart-box" :options="timeBar" />
        </div>
      </div>
      <div class="chart-line small">
        <div class="chart-wrapper" style="height: 40vh">
          <div class="chart-box">
            <div class="chart-title">最新项目</div>
            <!-- <el-carousel class="carousel-list" indicator-position="none">
              <el-carousel-item v-for="item in 4" :key="item">
                <h3>{{ item }}</h3>
              </el-carousel-item>
            </el-carousel> -->
            <swiper class="carousel-list" :options="swiperOption">
              <swiper-slide class="carousel-item">Slide 1</swiper-slide>
              <swiper-slide class="carousel-item">Slide 2</swiper-slide>
              <swiper-slide class="carousel-item">Slide 3</swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
          </div>
        </div>
        <div class="chart-wrapper" style="height: 30vh">
          <v-chart class="chart-box" :options="projectBar" />
        </div>
        <div class="chart-wrapper" style="height: 30vh">
          <v-chart class="chart-box" :options="bugLine" />
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/polar'
export default {
  name: 'lab-birth',
  created: function() {
    const vm = this
    setTimeout(() => {
      vm.chartsLoading = false
    }, 500)
  },
  data() {
    let xAxisData = [];
    let data1 = [];
    let data2 = [];
    for (let i = 8; i < 89; i++) {
      xAxisData.push('员工' + (i+1));
      data1.push(parseFloat(((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5).toFixed(2)));
    }

    return {
      chartsLoading: true,
      projectAmount:97,
      swiperOption: {
        direction: 'vertical',
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      },
      projectList: [{
        status:"creating",
        amount:12
      },{
        status:"developing",
        amount:23
      },{
        status:"online",
        amount:54
      },{
        status:"finished",
        amount:8
      }],
      iconMap:{
        creating:"fa-bullseye",
        developing:"fa-leaf",
        online:"fa-tree",
        finished:"fa-hourglass-end",
      },
      statusMap:{
        creating:"立项阶段",
        developing:"研发阶段",
        online:"上线运营",
        finished:"项目结束",
      },
      typePie: {
        title: {
          text: '项目类型分布',
          textStyle:{
            fontSize: 20,
            color: "#DDF0ED",
          },
          x: 'center',
          y: '2%',
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: 'horizontal',
          x: 'center',
          y: 'bottom',
          data: ['PC端', '微信', '支付宝', '百度'],
          textStyle:{
            color: "#DDF0ED",
          },
        },
        series: [{
          name: '项目类型',
          type: 'pie',
          center: ['50%', '42%'],
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: true,
              position: 'inside',
              formatter: "{d}%"
            },
            emphasis: {
              show: true,
              position: 'center',
              textStyle: {
                fontSize: '14',
                fontWeight: 'bold'
              },
              formatter: "{b}: {c}"
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [{
            value: 29,
            name: 'PC端'
          }, {
            value: 50,
            name: '微信'
          }, {
            value: 7,
            name: '支付宝'
          }, {
            value: 11,
            name: '百度'
          }]
        }]
      },
      progressPie: {
        title: {
          text: '项目进度健康情况',
          textStyle:{
            fontSize: 20,
            color: "#DDF0ED",
          },
          x: 'center',
          y: '2%',
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          show: false,
          orient: 'vertical',
          x: 'center',
          y: 'bottom',
          data: ['如期上线', '项目延期'],
          textStyle:{
            color: "#DDF0ED",
          },
        },
        series: [{
          name: '项目类型',
          type: 'pie',
          center: ['50%', '60%'],
          radius: ['0%', '80%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: true,
              position: 'inside',
              formatter: "{d}%"
            },
            emphasis: {
              show: true,
              position: 'center',
              textStyle: {
                fontSize: '14',
                fontWeight: 'bold'
              },
              formatter: "{b}: {c}"
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [{
            value: 32,
            name: '如期上线'
          }, {
            value: 27,
            name: '项目延期'
          }]
        }]
      },
      timeBar: {
        title: {
          text: '研发人员准时率情况',
          x: 'center',
          textStyle:{
            fontSize: 20,
            color: "#DDF0ED",
          },
        },
        legend: {
          data: ['准时率'],
          align: 'left',
          textStyle:{
            color: "#DDF0ED",
          },
          y:'bottom'
        },
        tooltip: {
          trigger: 'axis',
          formatter: `{a} <br/>{b}: {c}%`
        },
        xAxis: {
          data: xAxisData,
          silent: false,
          splitLine: {
            show: false
          },
          axisLabel:{
            color: "#DDF0ED",
          },
        },
        yAxis: {
          axisLabel:{
            color: "#DDF0ED",
          },
        },
        series: [{
          name: '准时率',
          type: 'bar',
          data: data1,
          animationDelay: function(idx) {
            return idx * 10;
          }
        }],
        animationEasing: 'elasticOut',
        animationDelayUpdate: function(idx) {
          return idx * 5;
        }
      },
      projectBar: {
        title: {
          text: '项目新增/完结堆积图',
          x: 'center',
          textStyle:{
            fontSize: 20,
            color: "#DDF0ED",
          },
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          show: false,
          data: ['新增项目', '完结项目']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          axisLabel:{
            color: "#DDF0ED",
          },
        }],
        yAxis: [{
          type: 'value',
          axisLabel:{
            color: "#DDF0ED",
          },
        }],
        series: [{
          name: '完结项目',
          type: 'bar',
          stack: '项目',
          data: [1, 4, 3, 2, 1, 2, 3]
        }, {
          name: '新增项目',
          type: 'bar',
          stack: '项目',
          data: [2, 0, 3, 5, 3, 4, 1]
        }]
      },
      bugLine: {
        title: {
          text: 'bug新增/修复折线图',
          x: 'center',
          textStyle:{
            fontSize: 20,
            color: "#DDF0ED",
          },
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['新增', '修复']
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          axisLabel:{
            color: "#DDF0ED",
          },
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value}',
            color: "#DDF0ED",
          }
        },
        series: [{
          name: '新增',
          type: 'line',
          data: [4, 11, 6, 3, 12, 13, 10],
          markPoint: {
            data: [{
              type: 'max',
              name: '最大值'
            }, {
              type: 'min',
              name: '最小值'
            }]
          },
          markLine: {
            data: [{
              type: 'average',
              name: '平均值'
            }]
          }
        }, {
          name: '修复',
          type: 'line',
          data: [1, 5, 2, 5, 3, 2, 0],
          markPoint: {
            data: [{
              type: 'max',
              name: '最大值'
            }, {
              type: 'min',
              name: '最小值'
            }]
          },
          markLine: {
            data: [{
              type: 'average',
              name: '平均值'
            }]
          }
        }]
      }
    }
  },
  methods: {
    goHome(){
      this.$router.push({name:'Home'})
    }
  },
  computed: mapState({}),
  watch: {},
  components: {
  }
}
</script>

<style lang="less">
@import '../../style/color.less';
.carousel-list {
  height: 200px;
  overflow: hidden;
  .carousel-item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .carousel-item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

}
</style>

<style lang="less" scoped>
@import '../../style/color.less';
.lab-charts {
  position: fixed;
  margin: 0 !important;
  width: 100%;
  height: 100%;
  // background-color: #1F6FB5;
  background: url(../../assets/map-bg.png);
  color: #DDF0ED;
  z-index: 100000;

  .home-btn {
    position: absolute;
    top: 20px;
    left: 20px;
    font-size: 24px;
    cursor: pointer;
  }

  .chart-line {
    &.small {
      width: 20%;
    }

    &.large {
      width: 60%;
    }

  }

  .chart-wrapper {
    padding: 10px 20px;

    &.small {
      height: 20vh;
    }

    &.mid {
      height: 30vh;
    }

    &.large {
      height: 50vh;
    }

    &.gaint {
      height: 80vh;
    }

  }

  .chart-box {
    text-align: center;
    height: 100%;
    width: 100%;
  }

  .chart-title {
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    margin: 12px 0;
  }

  .chart-list {
    // padding-top: 10px;

    .list-line {
      font-size: 16px;
      margin: 12px 0;

      &.creating {
        color: @creating;
      }

      &.developing {
        color: @developing;
      }

      &.online {
        color: @online;
      }

      &.finished {
        color: @finished;
      }

      .line-title, .line-num, .line-percent {
        margin: 0 2px;
      }

    }

  }

  .main-box {
    position: relative;
    background: url(../../assets/logo.png);
    background-repeat: no-repeat;
    background-position: center;

    .main-title {
      position: absolute;
      top: 5%;
      left: 5%;
      font-size: 26px;
    }

    .main-num {
      font-size: 48px;
    }

  }

}
</style>