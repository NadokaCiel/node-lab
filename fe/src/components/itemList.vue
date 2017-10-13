<template>
  <div class="item-list" tabindex="-1" @keyup.left="change('left')" @keyup.right="change('right')">
    <el-carousel :interval="0" type="card" height="400px" ref="bag" @change="getIndex">
      <el-carousel-item v-for="(pocket,index) in pocketList" :key="pocket.name">
        <div class="pocket-panel" :class="pocket.name+'-panel'">
          <div class="pocket-line">
            {{nowIndex == index ? pocket.name : ""}}
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>




<script>
import { mapState } from 'vuex'
export default {
  name: 'item-list',
  data() {
    return {
      nowIndex:0,
      pocketList:[{
        name:'medicines'
      },{
        name:'weapons'
      },{
        name:'equipment'
      },{
        name:'accessory'
      },{
        name:'valuables'
      }]
    }
  },
  created: function() {
  },
  methods:{
    getIndex(i){
      this.nowIndex = i
    },
    change(direction) {
      const vm = this
      if(!vm.$refs.bag){
        return
      }
      switch (direction) {
        case 'left':
          vm.$refs.bag.prev()
          break
        case 'right':
          vm.$refs.bag.next()
          break
        default:
      }
    }
  },
  computed: mapState([]),
  components: {
  }
}
</script>

<style lang="less" scoped>
@import '../style/color.less';
.item-list {
  outline: 0;
  .medicines-panel{
    background-color: @co12;
  }
  .weapons-panel{
    background-color: @co10;
  }
  .equipment-panel{
    background-color: @co16;
  }
  .accessory-panel{
    background-color: @co13;
  }
  .valuables-panel{
    background-color: @co4;
  }
}
</style>
<style lang="less">
@import '../style/color.less';
.item-list {
  .el-carousel__item {
    background-color: @co10;

    .pocket-panel {
      opacity: .24;
      height: 100%;
    }
    &.is-active {
      .pocket-panel {
        opacity: 1;
      }
    }
  }
}
</style>