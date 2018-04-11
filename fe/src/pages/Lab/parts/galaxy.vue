<template>
  <div class="part-galaxy galaxy-box">
    <div class="spheres" ref="spheres">
      <div class="sphere purple"  style="width:20px; height:20px;"></div>
      <div class="sphere green"  style="width:16px; height:16px;"></div>
      <div class="sphere pink"  style="width:22px; height:22px;"></div>
      <div class="sphere blue"  style="width:12px; height:12px;"></div>
    </div>
    <div class="circles">
      <div class="circle" style="width:120px; height:120px;"></div>
      <div class="circle" style="width:160px; height:160px;"></div>
      <div class="circle" style="width:200px; height:200px;"></div>
      <div class="circle" style="width:240px; height:240px;"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { styler, everyFrame } from 'popmotion'
export default {
  name: 'part-galaxy',
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
    init() {
      const vm = this
      if (vm.inited) {
        return
      }
      vm.activation()
      vm.inited = true
    },
    activation() {
      const vm = this
      const container = vm.$refs.spheres
      const ballStylers = Array
        .from(container.childNodes)
        .map(styler)

      const distance = 60;

      everyFrame()
        .start((timestamp) => ballStylers.map((thisStyler, i) => {
          if(i%2){
            thisStyler.set('x', (distance+i*20) * Math.cos(0.004 * timestamp / (i+1) + (i * 0.5)))
            thisStyler.set('y', (distance+i*20) * Math.sin(0.004 * timestamp / (i+1) + (i * 0.5)))
          }else{
            thisStyler.set('x', (distance+i*20) * Math.sin(0.004 * timestamp / (i+1) + (i * 0.5)))
            thisStyler.set('y', (distance+i*20) * Math.cos(0.004 * timestamp / (i+1) + (i * 0.5)))
          }
          
        }))
    }
  },
}
</script>


<style lang="less" scoped>
@import '../../../style/color.less';
.part-galaxy {
  position: relative;

  .spheres {
    position: relative;
    width: 428px;
    height: 428px;
    z-index: 15;
  }
  .sphere {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    width: 20px;
    height: 20px;
    border-radius: 50%;
  }
  .circles {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10;

    .circle {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 120px;
      height: 120px;
      margin: auto;
      border-radius: 50%;
      border: 1px solid @lightergray;
    }
  }
  .purple {
    background-color: @co8;
  }
  .green {
    background-color: @co12;
  }
  .pink {
    background-color: @co11;
  }
  .blue {
    background-color: @co6;
  }
}
</style>