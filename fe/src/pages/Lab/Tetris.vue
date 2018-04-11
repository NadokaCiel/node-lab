<template>
  <div class="lab-tetris">
    <div class="game-panel" flex="main:center cross:center">
      <div class="game-board" flex-box="3">
        <transition-group v-loading="gameLoading" name="cell" tag="div" class="game-board" :style="{'width':(width * gridLen) + 'px','height':(height * gridLen) + 'px'}">
          <div v-for="item in graph" class="item-box" :class="'dot-'+item.type" :style="{'visibility':item.show ? 'visible' : 'hidden','width':gridLen + 'px','height':gridLen + 'px'}" :key="item.id">
          </div>
        </transition-group>
      </div>
      <div class="game-info" flex-box="1" flex="main:center cross:center">
        <div class="game-score" @click="createBar">
          <div class="score-title">SCORE</div>
          <div class="score-num">{{ score | numPad }}</div>
        </div>
        <div class="game-hint" @click="changeStatus">
          <div class="hint-info" :class="'turn-'+hint.status">
            {{hint.key}}
          </div>
        </div>
      </div>
    </div>
    <div class="toolbox">
      <c-button type="primary" :clickFunc="[regame]">Game On</c-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'lab-tetris',
  created: function() {
    const vm = this
    vm.bus.$on('keyup',key=>{
      vm.move(key)
    })
    // vm.regame()
  },
  data() {
    const bars = [{
      key: "|",
      type: 1,
      dots: ["(5,1)", "(5,0)", "(5,2)", "(5,3)"],
      status:1,
    }, {
      key: "田",
      type: 2,
      dots: ["(5,0)", "(5,1)", "(6,0)", "(6,1)"],
      status:1,
    }, {
      key: "T",
      type: 3,
      dots: ["(6,0)", "(5,0)", "(7,0)", "(6,1)"],
      status:1,
    }, {
      key: "L",
      type: 4,
      dots: ["(5,1)", "(5,0)", "(6,0)", "(5,2)"],
      status:1,
    }]
    return {
      gameLoading:false,
      gameRunning:false,
      height: 12,
      width: 12,
      gridLen: 50,
      score:0,
      hints:bars,
      moveDots: [],
      graph: [],
      dotMap: {},
      hint:{},
    }
  },
  methods: {
    regame(){
      const vm = this
      vm.gameLoading = true
      vm.score = 0
      setTimeout(()=>{
        vm.gameLoading = false
        vm.gameRunning = true
        vm.generate()
      }, 800)
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
            show: true,
            type: 0,
            x:j,
            y:i,
            falling:false,
          }
          data.push(item)
          vm.dotMap[item.key] = item
        }
      }
      vm.graph = data
      vm.createBar()
      setTimeout(() => {
        vm.nextStep()
      }, 1000)
    },
    nextStep() {
      const vm = this
      if (!vm.gameRunning) {
        return
      }
      vm.move('down')
      setTimeout(() => {
        if (!vm.allowDown(vm.moveDots)) {
          vm.checkLine()
          vm.score += 100
          vm.createBar()
        }
        vm.nextStep()
      }, 1000)
    },
    checkLine() {
      const vm = this
      for (let i = vm.height-1; i >= 0; i--) {
        const line = []
        for (let j = 0; j < vm.width; j++) {
          const key = `(${j},${i})`
          if(vm.dotMap[key].type != 0){
            line.push(vm.dotMap[key])
          }
        }
        if(line.length == vm.width){
          line.forEach(dot=>{
            dot.type = 0
          })
          vm.score += 500
          vm.clearMoveDots()
          vm.downAll(i)
          vm.checkLine()
        }
      }
    },
    createBar(){
      const vm = this
      const nowBar = vm.changeHint()
      for (let i = 0; i < nowBar.dots.length; i++) {
        if (vm.dotMap[nowBar.dots[i]].type != 0) {
          vm.gameRunning = false
          vm.$aware("Game Over,Try Again?", "Game Over!", {
            type: 'warning',
            confirmButtonText: 'Another!',
            callback: (action) => {
              if (action == 'cancel') return
              this.regame()
            }
          })
          return
        }
      }
      vm.clearMoveDots()
      nowBar.dots.forEach(k=>{
        vm.dotMap[k].type = nowBar.type
        vm.dotMap[k].falling = true
        vm.moveDots.push(vm.dotMap[k])
      })

    },
    turnBar(){
      // x = a - (y - b)
      // y = b - (x - a)
    },
    clearMoveDots(){
      const vm = this
      vm.graph.forEach(i=>{
        i.falling = false
      })
      vm.moveDots = []
    },
    clearBoard() {
      const vm = this
      vm.graph.forEach(i=>{
        i.type = 0
        i.falling = false
      })
      vm.moveDots = []
    },
    move(direction) {
      const vm = this
      if (vm.gameLoading || vm.moveDots.length <= 0 || !vm.gameRunning) {
        return
      }
      const type = vm.moveDots[0].type
      const moveDots = []
      switch (direction) {
        case 'left':
          if (vm.allowLeft(vm.moveDots)) {
            vm.moveDots.forEach(dot => {
              const key = `(${dot.x-1},${dot.y})`
              moveDots.push(vm.dotMap[key])
              dot.type = 0
              dot.falling = false
            })
            moveDots.forEach(dot => {
              dot.type = type
              dot.falling = true
            })
            vm.moveDots = moveDots
          }
          break
        case 'right':
          if (vm.allowRight(vm.moveDots)) {
            vm.moveDots.forEach(dot => {
              const key = `(${dot.x+1},${dot.y})`
              moveDots.push(vm.dotMap[key])
              dot.type = 0
              dot.falling = false
            })
            moveDots.forEach(dot => {
              dot.type = type
              dot.falling = true
            })
            vm.moveDots = moveDots
          }
          break
        case 'down':
          if (vm.allowDown(vm.moveDots)) {
            vm.moveDots.forEach(dot => {
              const key = `(${dot.x},${dot.y+1})`
              moveDots.push(vm.dotMap[key])
              dot.type = 0
              dot.falling = false
            })
            moveDots.forEach(dot => {
              dot.type = type
              dot.falling = true
            })
            vm.moveDots = moveDots
          }
          break
        default:
      }
    },
    downAll(depth) {
      const vm = this
      for (let i = depth - 1; i >= 0; i--) {
        for (let j = 0; j < vm.width; j++) {
          const o_key = `(${j},${i})`
          const n_key = `(${j},${i+1})`
          const type = vm.dotMap[o_key].type
          if (type == 0) {
            continue
          }
          vm.dotMap[o_key].type = 0
          vm.dotMap[n_key].type = type
        }
      }
    },
    changeHint() {
      this.hints = _.shuffle(this.hints)
      this.hint = this.hints[0]
      return this.hints[0]
    },
    changeStatus() {
      if (this.hint.status < 4) {
        this.hint.status++
      } else {
        this.hint.status = 1
      }
    },
    allowLeft(dots) {
      const vm = this
      let flag = true
      dots.forEach(dot => {
        if (dot.x <= 0) {
          flag = false
          return
        }
        const key = `(${dot.x-1},${dot.y})`
        if (vm.dotMap[key].type != 0 && !vm.dotMap[key].falling) {
          flag = false
          return
        }
      })
      return flag
    },
    allowRight(dots) {
      const vm = this
      let flag = true
      dots.forEach(dot => {
        if (dot.x >= vm.width - 1) {
          flag = false
          return
        }
        const key = `(${dot.x+1},${dot.y})`
        if (vm.dotMap[key].type != 0 && !vm.dotMap[key].falling) {
          flag = false
          return
        }
      })
      return flag
    },
    allowDown(dots) {
      if (dots.length <= 0) {
        return
      }
      const vm = this
      let flag = true
      dots.forEach(dot => {
        if (dot.y >= vm.height - 1) {
          flag = false
          return
        }
        const key = `(${dot.x},${dot.y+1})`
        if (vm.dotMap[key].type != 0 && !vm.dotMap[key].falling) {
          flag = false
          return
        }
      })
      return flag
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
.lab-tetris {
  width: 100%;
  height: 100%;

  .toolbox{
    text-align: center;
  }

  .game-panel {
    margin: 40px auto;
    width: 800px;
    height: 600px;
    border: 1px solid @darker;
  }
  .game-board {
    width: 600px;
    height: 100%;
    overflow: hidden;
    .item-box{
      position: relative;
      float: left;
      user-select: none;
      border: 1px solid @darker;
    }
  }
  .game-info {
    position: relative;
    width: 200px;
    height: 100%;
    border-left: 1px solid @darker;
    .game-score{
      overflow: hidden;
      position: absolute;
      top:40px;
      font-size: 26px;
      line-height: 150%;
    }
    .game-hint{
      position: absolute;
      bottom:40px;
      margin:0 auto;
      padding:40px;
      width: 120px;
      height: 120px;
      border: 1px solid @darker;
      font-size: 24px;
      .hint-info{
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-weight: bold;
      }
    }
  }

  .turn-1{
    transform: rotateZ(0deg);
  }

  .turn-2{
    transform: rotateZ(90deg);
  }

  .turn-3{
    transform: rotateZ(180deg);
  }

  .turn-4{
    transform: rotateZ(270deg);
  }

  .cell-move {
    transition: transform .6s;
  }
  .dot-1 {
    background-color: @co1;
  }
  .dot-2 {
    background-color: @co2;
  }
  .dot-3 {
    background-color: @co3;
  }
  .dot-4 {
    background-color: @co4;
  }
}
</style>