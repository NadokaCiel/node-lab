<template>
  <div class="pocket">
    <div class="pocket-title" :class="pocket.name.toLowerCase() +'-title'">
      {{pocketTitle}}
    </div>
    <div class="pocket-container" ref="list">
      <div class="pocket-list">
        <div class="pocket-item" flex="main:justify cross:center" v-for="(line,index) in pocket.items" :class="[line.rarity,{'is-active':index==nowIndex && isActive}]" @mouseenter="setIndex(index)">
          <div class="item-name">{{line.name}}</div>
          <div class="item-count">{{'X ' + line.count}}</div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapState } from 'vuex'
export default {
  name: 'pocket',
  props: {
    pocket: {
      type: Object,
      default: () => {
        return {
          name:'default',
          items:[]
        }
      }
    },
    pocketTitle: {
      type: String,
      default: ''
    },
    isActive:Boolean
  },
  data() {
    return {
      nowIndex:0,
    }
  },
  created: function() {
    const vm = this
    vm.bus.$on('keyup',key=>{
      vm.change(key)
    })
  },
  methods:{
    change(direction) {
      const vm = this
      if(!vm.isActive){
        return
      }
      switch (direction) {
        case 'up':
          vm.changeIndex(-1)
          break
        case 'down':
          vm.changeIndex(1)
          break
        default:
      }
    },
    changeIndex(i) {
      const vm = this
      vm.nowIndex += i
      if (vm.nowIndex < 0) {
        vm.nowIndex = vm.pocket.items.length - 1
      }
      if (vm.nowIndex > vm.pocket.items.length - 1) {
        vm.nowIndex = 0
      }
      if(!vm.$refs.list){
        return
      }else{
        vm.$refs.list.scrollTop = vm.nowIndex*26 - 52
      }
    },
    setIndex(i){
      const vm = this
      if(!vm.isActive){
        return
      }
      vm.nowIndex = i
    }
  },
  computed: mapState(["bus"]),
  components: {
  }
}
</script>

<style lang="less" scoped>
@import '../style/color.less';
.pocket {
  .pocket-title {
    height: 32px;
    line-height: 32px;
    font-size: 16px;
    color: @navsub;
    border: 1px solid @a3;
    text-align: center;
  }
  .medicines-title {
    background-color: @co12;
  }
  .weapons-title {
    background-color: @co19;
  }
  .equipment-title {
    background-color: @co20;
  }
  .accessory-title {
    background-color: @co13;
  }
  .valuables-title {
    background-color: @co4;
  }
  .pocket-container {
    color: @navsub;
    padding: 10px 5px;
    height: 100%;
    overflow: auto;

    .pocket-list {
      padding-bottom: 80px;
    }
    .pocket-item {
      position: relative;
      height: 26px;
      line-height: 26px;
      padding: 0 8px;
      font-size: 14px;
      border-bottom: 1px solid @a3;

      &.is-active {
        padding-left: 20px;

        &:before {
          content: " ";
          position: absolute;
          top: 0;
          bottom: 0;
          left: -5px;
          right: -5px;
          background-color: rgba(255, 255, 255, 0.2);
        }
        &:after {
          font: normal normal normal 14px/1 FontAwesome;
          text-rendering: auto;
          -webkit-font-smoothing: antialiased;
          content: "\f0da";
          position: absolute;
          height: 26px;
          line-height: 26px;
          font-size: 20px;
          left: 8px;
          color: @lighterblack;
        }
      }
    }
  }
}
</style>
<style lang="less">
@import '../style/color.less';
.pocket {
}
</style>