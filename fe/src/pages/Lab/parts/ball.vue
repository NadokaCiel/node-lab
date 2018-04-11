<template>
  <div class="part-ball ball-box">
    <div class="ball" ref="ball"></div>
    <c-button type="default" :disabled="true">Try Touch The Ball</c-button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { styler, spring, listen, pointer, value } from 'popmotion'
export default {
  name: 'part-ball',
  created: function() {
    const vm = this
    vm.$nextTick(vm.init)
  },
  data() {
    return {
      inited:false,
    }
  },
  methods: {
    init(){
      const vm = this
      if(vm.inited){
        return
      }
      vm.initListen()
      vm.inited = true
    },
    initListen() {
      const vm = this
      const ball = vm.$refs.ball
      const ballStyler = styler(ball)
      const ballXY = value({
        x: 0,
        y: 0
      }, ballStyler.set)

      listen(ball, 'mousedown touchstart')
        .start((e) => {
          e.preventDefault()
          pointer(ballXY.get()).start(ballXY)
        })

      listen(document, 'mouseup touchend')
        .start(() => {
          spring({
            from: ballXY.get(),
            velocity: ballXY.getVelocity(),
            to: {
              x: 0,
              y: 0
            },
            stiffness: 200,
            // mass: 1,
            // damping: 10
          }).start(ballXY)
        })
    },
  },
}
</script>


<style lang="less" scoped>
@import '../../../style/color.less';
.part-ball {
  .ball{
    height: 40px;
    width: 40px;
    border-radius: 50%;
    background-color: @co11;
  }
}
</style>