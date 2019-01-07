<template>
  <div class="lab-project-list">
    <div class="project-list clearfix">
      <div class="project-item" v-for="(item,index) in projectList" :key="index">
        <div class="info-box" flex="dir:top main:justify cross:justify box:mean">
          <div class="project-logo">
            <i class="fa fa-fw" :class="item.icon"></i>
          </div>
          <div class="project-name text-ellipsis" :title="item.name">{{item.name}}</div>
        </div>
        
        <div class="project-info info-left">
          <div class="info-status" :style="'color:'+colorMap[item.status]">{{statusMap[item.status]}}</div>
        </div>
        <div class="project-info info-right">
          <div class="info-line">bug:{{item.bugs}}</div>
          <div class="info-line">任务:{{item.tasks}}</div>
          <div class="info-line">指标3:</div>
        </div>
        <el-progress class="project-percent" :width="80" type="circle" :percentage="item.percent" :color="colorMap[item.status]"></el-progress>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'lab-project-list',
  created: function() {
    const vm = this
  },
  data() {
    return {
      colorMap:{
        creating:"#CCFC62",
        developing:"#9FF048",
        online:"#25C6FC",
        finished:"#DE8100",
      },
      statusMap:{
        creating:"立项",
        developing:"研发",
        online:"上线",
        finished:"结项",
      },
      projectList:[{
        name:"Tencent-QQ",
        icon:"fa-qq",
        percent:3,
        bugs:0,
        tasks:5,
        status:'creating',
      },{
        name:"Android",
        icon:"fa-android",
        percent:32,
        bugs:13,
        tasks:21,
        status:'developing',
      },{
        name:"Tencent-Wechat",
        icon:"fa-weixin",
        percent:27,
        bugs:36,
        tasks:82,
        status:'developing',
      },{
        name:"Apple",
        icon:"fa-apple",
        percent:95,
        bugs:7,
        tasks:21,
        status:'online',
      },{
        name:"Jsfiddle",
        icon:"fa-jsfiddle",
        percent:100,
        bugs:0,
        tasks:0,
        status:'finished',
      }]
    }
  },
  methods: {
  },
  computed: mapState({}),
  watch: {},
  components: {
  }
}
</script>
<style lang="less">
@import '../../style/color.less';
.project-percent {
  .el-progress-circle {
    margin: 0 auto;
  }

  .el-progress__text{
    top: calc(50% + 20px);
    color: @black;
  }

}
</style>

<style lang="less" scoped>
@import '../../style/color.less';
.lab-project-list {
  padding: 60px;
  background-color: @co14;
  min-height: 100vh;
  .project-list {
    margin: 0 auto;
    width: 100%;
    min-height: 300px;
    border-radius: 20px;
    background-color: rgba(0, 0, 0, .1);
  }

  .project-item {
    float: left;
    position: relative;
    margin: 14px;
    padding: 14px;
    width: 180px;
    height: 180px;
    border-radius: 20px;
    text-align: center;
    cursor: pointer;

    .project-info{
      position: absolute;
      top: 6px;

      text-align: left;
      .info-line{
        visibility: hidden;
        font-size: 12px;
        margin: 2px 0;
        transform: scale(0.8);
      }

      .info-status{
        font-size: 16px;
      }

      &.info-left{
        top: 10px;
        left: 8px;
      }
      &.info-right{
        right: 6px;
      }
    }

    .project-percent{
      position: absolute;
      top: 30px;
      left: 0;
      right: 0;
      margin: 0 auto;
    }

    &:hover {
      background-color: rgba(0, 0, 0, .1);
      .info-line{
        visibility: visible;
      }
    }

    .project-logo {
      font-size: 30px;
      height: 90px;
      line-height: 90px;
    }

    .project-name {
      font-size: 18px;
      height: 90px;
      line-height: 50px;
    }

    .creating {
      color: @creating;
    }

    .developing {
      color: @developing;
    }

    .online {
      color: @online;
    }

    .finished {
      color: @finished;
    }

  }

}
</style>