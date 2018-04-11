<template>
  <div class="part-square square-box">
    <div class="square" ref="square"></div>
    <c-button type="primary" :clickFunc="[runSquare]">Run Square</c-button>
  </div>
</template>

<script>
import { keyframes, styler, easing } from 'popmotion'
export default {
  name: 'part-square',
  created: function() {
    const vm = this
    vm.$nextTick(vm.init)
  },
  data() {
    return {
      inited:false,
      cartoon:{}
    }
  },
  methods: {
    init(){
      const vm = this
      if(vm.inited){
        return
      }
      vm.inited = true
    },
    runSquare() {
      const vm = this
      const squareStyler = styler(vm.$refs.square)
      if(vm.cartoon['square']){
        if(vm.cartoon['square'].isActive()){
          vm.cartoon['square'].seek(0)
          vm.cartoon['square'].pause()
        }else{
          vm.cartoon['square'].resume()
        }
        return
      }
      vm.cartoon['square'] = keyframes({
        values: [{
          x: 0,
          y: 0,
          scale: 1,
          rotate: 0,
          rotateX: 0,
          rotateY: 0,
          background: "#04DD98",
        }, {
          x: 300,
          y: 0,
          scale: 1.5,
          rotate: 180,
          rotateX: 0,
          rotateY: 720,
          background: "#66CCCC",
        }, {
          x: 300,
          y: 300,
          scale: 2,
          rotate: 0,
          rotateX: 720,
          rotateY: 0,
          background: "#9966CC",
        }, {
          x: 0,
          y: 300,
          scale: 1.5,
          rotate: 180,
          rotateX: 0,
          rotateY: 720,
          background: "#5ED5D1",
        }, {
          x: 0,
          y: 0,
          scale: 1,
          // rotate: 0,
          rotateX: 0,
          rotateY: 0,
          background: "#04DD98",
        }],
        easings: [easing.easeInOut, easing.easeInOut, easing.easeInOut, easing.easeInOut],
        loop: Infinity,
        duration: 6000
      }).start(squareStyler.set)
    }
  },
}
</script>


<style lang="less" scoped>
@import '../../../style/color.less';
.part-square {
  .square{
    height: 40px;
    width: 40px;
    background-color: @co15;
  }
}
</style>