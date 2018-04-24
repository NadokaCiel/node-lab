<template>
  <div class="part-square counter-box">
    <div class="counter" ref="counter" v-once>{{num}}</div>
      <c-button type="primary" :clickFunc="[numChange]">Change Num</c-button>
  </div>
</template>

<script>
import { tween } from 'popmotion'
export default {
  name: 'part-square',
  created: function() {
    const vm = this
  },
  data() {
    return {
      num:0
    }
  },
  methods: {
    numChange(){
      const vm = this
      const updateCounter = (v) => vm.$refs.counter.innerHTML = Math.round(v)
      tween({ from: vm.num, to: vm.num+300, duration: 500}).start(updateCounter)
      vm.num += 300
    },
  },
}
</script>


<style lang="less" scoped>
@import '../../../style/color.less';
.part-square {
  .counter{
    height: 40px;
    line-height: 40px;
  }
}
</style>