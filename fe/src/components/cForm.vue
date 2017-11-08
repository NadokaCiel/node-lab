<template>
  <el-form class="setting-form" :model="formJson" :rules="settingRules" ref="settingConfig" label-width="25%" @submit.native.prevent>
    <el-collapse v-model="collapseList">
      <el-collapse-item v-for="(l, index) in layout" :title="l.title" :key="l.title" :name="index">
        <el-form-item :label="setting.title" v-for="(setting, name) in settings" :key="name" v-if="l.contains.includes(name)" :prop="name">
          <component class="setting-line" :is="getComName(setting.type, setting.format)" :form="settingForm[name]" :option="setting" @change="formChanged(name)"></component>
        </el-form-item>
      </el-collapse-item>
    </el-collapse>
  </el-form>
</template>


<script>
import { mapState } from 'vuex'
export default {
  name: 'pocket',
  props: {
    settings: {
      type: Array,
      default: () => {
        return []
      }
    },
    values: {
      type: Array,
      default: () => {
        return []
      }
    },
    layout:{
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      settingForm:{},
      settingRules:{},
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