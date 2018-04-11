<template>
  <div class="lab-cartoon">
    <div flex="main:center cross:center">
      <counter class="box"></counter>
      <square class="box"></square>
      <ball class="box"></ball>
    </div>
    <div flex="main:center cross:center">
      <galaxy class="box"></galaxy>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ball from './parts/ball.vue'
import square from './parts/square.vue'
import counter from './parts/counter.vue'
import galaxy from './parts/galaxy.vue'

export default {
  name: 'lab-cartoon',
  created: function() {
    const vm = this
    // vm.$nextTick(vm.init)
  },
  data() {
    return {
      inited:false,
      dom:{},
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
  },
  computed: mapState({}),
  watch: {},
  components: {
    counter,
    ball,
    square,
    galaxy
  }
}
</script>


<style lang="less" scoped>
@import '../../style/color.less';
.lab-cartoon {
  padding: 20px;
  .box{
    padding: 20px;
    min-height: 100px;
    text-align: center;
    border: 1px solid @line;
  }
}
</style>