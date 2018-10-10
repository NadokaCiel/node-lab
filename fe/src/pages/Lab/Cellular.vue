<template>
  <div class="lab-cellular">
    <div class="game-panel" flex="main:center cross:center" v-loading="gameLoading">
      <transition-group name="cell" tag="div" class="game-board">
        <el-tooltip v-for="item in graph" :key="item.id" placement="top">
          <div slot="content">{{item.key}}</div>
          <div class="item-box" :class="{'dot-alive':item.survival == 1}" :style="{'width':(100 / width) + '%','padding-bottom':(100 / width) + '%','height':0,}">
          </div>
        </el-tooltip>
      </transition-group>
    </div>
    <div class="toolbox">
      <c-button type="primary" :clickFunc="[next]">Next Step</c-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'lab-cellular',
  created: function() {
    const vm = this
    vm.bus.$on('keyup',key=>{
      vm.move(key)
    })
    vm.init()
  },
  data() {
    const seeds = {
      '(24,24)':1,
      '(25,24)':1,
      '(24,25)':1,
      '(25,25)':1,
      '(26,26)':1,
      '(27,26)':1,
      '(26,27)':1,
      '(27,27)':1,
    }
    return {
      gameLoading: true,
      width:50,
      height:50,
      graph: [],
      seedMap: seeds,
      dotMap: {},
    }
  },
  methods: {
    init(){
      const vm = this
      vm.generate()
      vm.gameLoading = false
    },
    generate() {
      const vm = this
      const data = []
      vm.graph = []
      vm.dotMap = {}
      for (let i = 0; i < vm.height; i++) {
        for (let j = 0; j < vm.width; j++) {
          const item = {
            id: vm.width * i + j + 1,
            key:`(${j},${i})`,
            survival: this.seedMap[`(${j},${i})`] || 0,
            x:j,
            y:i,
          }
          data.push(item)
          vm.dotMap[item.key] = item
        }
      }
      vm.graph = data
    },
    next() {
      const vm = this
      const data = []
      const n_dotMap = {}
      for (let i = 0; i < vm.height; i++) {
        for (let j = 0; j < vm.width; j++) {
          const item = {
            id: vm.width * i + j + 1,
            key: `(${j},${i})`,
            survival: this.trial(j, i),
            x: j,
            y: i,
          }
          data.push(item)
          n_dotMap[item.key] = item
        }
      }
      vm.graph = data
      vm.dotMap = n_dotMap
    },
    trial(x, y) {
      const vm = this
      const survival = vm.getSurvival(x, y)
      const mooreCount = vm.getSurvival(x - 1, y - 1) + vm.getSurvival(x, y - 1) + vm.getSurvival(x + 1, y - 1) + vm.getSurvival(x - 1, y) + vm.getSurvival(x + 1, y) + vm.getSurvival(x - 1, y + 1) + vm.getSurvival(x, y + 1) + vm.getSurvival(x + 1, y + 1)
      if (mooreCount == 3) {
        return 1
      } else if (mooreCount == 2) {
        return survival
      } else {
        return 0
      }
    },
    getSurvival(x, y) {
      const vm = this
      if (!vm.dotMap[`(${x},${y})`] || !vm.dotMap[`(${x},${y})`].survival) {
        return 0
      } else {
        return 1
      }
    }
  },
  computed: mapState(["bus"]),
  watch: {},
  components: {
  }
}
</script>


<style lang="less" scoped>
@import '../../style/color.less';
.lab-cellular {
  width: 100%;
  height: 100%;

  .game-panel{
    margin: 40px auto;
    width: 800px;
    height: 600px;
    border: 1px solid @darker;
    overflow: auto;
    .item-box{
      position: relative;
      float: left;
      user-select: none;
      border: 1px solid @darker;
    }
    .dot-alive{
      background-color: @darker;
    }
  }

  .toolbox{
    text-align: center;
  }

  .cell-move {
    transition: transform .6s;
  }
}
</style>