<template>
  <div class="lab-project-index">
    <div class="project-title">某公司某某项目</div>
    <div class="info-content" flex="main:justify cross:center box:mean">
      <div class="info-box">
        <div class="info-title">成员</div>
        <div class="info-detail">
          <span class="info-num">17</span>
          <span class="info-unit">人</span>
        </div>
      </div>
      <div class="info-box">
        <div class="info-title">任务</div>
        <div class="info-detail">
          <span class="info-num">21</span>
          <span class="info-unit">个</span>
        </div>
      </div>
      <div class="info-box">
        <div class="info-title">bug</div>
        <div class="info-detail">
          <span class="info-num">32</span>
          <span class="info-unit">个</span>
        </div>
      </div>
      <div class="info-box" flex="main:center cross:center">
        <el-progress class="info-percent" :width="130" type="circle" :percentage="46" status="text" color="#EFCEE8">
          <div class="progress-title">总完成率</div>
          <div class="progress-num">46%</div>
        </el-progress>
      </div>
      <div class="info-box" flex="dir:top main:justify cross:justify box:mean">
        <div class="progress-box" flex="main:center cross:center">
          <el-progress class="info-percent line" :percentage="64" :text-inside="true" :stroke-width="14" color="#83FCD8">
          </el-progress>
          <div class="progress-title sub text-ellipsis">前端:64%</div>
        </div>
        <div class="progress-box" flex="main:center cross:center">
          <el-progress class="info-percent line" :percentage="55" :text-inside="true" :stroke-width="14" color="#a2c4e5">
          </el-progress>
          <div class="progress-title sub text-ellipsis">后端:55%</div>
        </div>
      </div>
    </div>
    <div class="time-content">
      <v-chart class="chart-box" :options="timeBar" />
    </div>
    <div class="table-content">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed prop="name" label="姓名" width="150">
        </el-table-column>
        <el-table-column label="待办/总任务数" width="200">
          <template slot-scope="scope">
            {{`${scope.row.unfinished_tasks}/${scope.row.all_tasks}`}}
          </template>
        </el-table-column>
        <el-table-column label="待办/总bug数" width="200">
          <template slot-scope="scope">
            {{`${scope.row.unfixed_bugs}/${scope.row.all_bugs}`}}
          </template>
        </el-table-column>
        <el-table-column label="工作进度" width="200">
          <template slot-scope="scope">
            <el-progress class="line-percent" :percentage="scope.row.percent" :text-inside="true" :stroke-width="14">
          </el-progress>
          </template>
        </el-table-column>
        <el-table-column label="加入时间" width="200" prop="joinTime">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="lineClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/dataZoom'
import 'echarts/lib/chart/bar'
export default {
  name: 'lab-project-index',
  created: function() {
    const vm = this
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
      timeBar: {
        title: {
          text: '研发人员项目投入总工时',
          x: 'center',
          textStyle: {
            fontSize: 20,
            color: "#DDF0ED",
          },
        },
        legend: {
          data: ['工时'],
          align: 'left',
          textStyle: {
            color: "#DDF0ED",
          },
          x: '80%',
          y: '2%'
        },
        tooltip: {
          trigger: 'axis',
          formatter: `{a} <br/>{b}: {c}h`
        },
        dataZoom: [{
          type: 'inside'
        }, {
          type: 'slider'
        }],
        xAxis: {
          data: xAxisData,
          silent: false,
          splitLine: {
            show: false
          },
          axisLabel: {
            color: "#DDF0ED",
          },
        },
        yAxis: {
          axisLabel: {
            color: "#DDF0ED",
          },
        },
        series: [{
          name: '工时',
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
      tableData: [{
          name: '员工1',
          totalTime: 90,
          unfinished_tasks: 12,
          all_tasks: 23,
          unfixed_bugs: 8,
          all_bugs: 40,
          percent: 32,
          joinTime: '2018-12-27',
        }, {
          name: '员工2',
          totalTime: 76,
          unfinished_tasks: 15,
          all_tasks: 43,
          unfixed_bugs: 4,
          all_bugs: 11,
          percent: 27,
          joinTime: '2018-12-29',
        }, {
          name: '员工3',
          totalTime: 83,
          unfinished_tasks: 12,
          all_tasks: 32,
          unfixed_bugs: 2,
          all_bugs: 10,
          percent: 45,
          joinTime: '2018-12-25',
        }, {
          name: '员工4',
          totalTime: 153,
          unfinished_tasks: 21,
          all_tasks: 99,
          unfixed_bugs: 17,
          all_bugs: 63,
          percent: 71,
          joinTime: '2018-10-16',
        }]
    }
  },
  methods: {
    lineClick(row){
      console.log('row',row)
    }
  },
  computed: mapState({}),
  watch: {},
  components: {
  }
}
</script>

<style lang="less" scoped>
@import '../../style/color.less';
.lab-project-index {
  padding: 0 60px 60px;
  background-color: @co14;
  min-height: 100vh;

  .project-title{
    text-align: center;
    height: 140px;
    line-height: 140px;
    font-size: 32px;
  }

  .info-content {
    width: 100%;
    height: 180px;
    padding: 20px;
    border-radius: 10px;
    background-color: #FAFFEB;
  }

  .info-box {
    height: 140px;
    width: 140px;
    text-align: center;

    &:not(:last-child) {
      border-right: 1px solid #555;
    }

    .info-title {
      height: 70px;
      line-height: 70px;
      font-size: 22px;
    }

    .info-detail {
      height: 70px;
      line-height: 50px;

      .info-num {
        font-size: 42px;
      }

      .info-unit {
        font-size: 18px;
      }

    }

    .info-percent {
      &.line {
        width: 60%;
        padding-right: 16px;
      }
    }

    .progress-title {
      font-size: 20px;
      font-weight: bold;
      color: #000;

      &.sub{
        height: 70px;
        line-height: 80px;
        font-size: 12px;
      }
    }

    .progress-num {
      margin-top: 10px;
    }

    .progress-box {
      width: 80%;
      height: 70px;
      margin: 0 auto;
    }

  }

  .chart-box {
    text-align: center;
    height: 100%;
    width: 100%;
  }

  .time-content{
    margin-top: 50px;
    height: 240px;
  }

  .table-content{
    margin-top: 40px;
  }

}
</style>