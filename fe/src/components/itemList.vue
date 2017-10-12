<template>
  <div class="item-list" tabindex="-1" @keyup.left="change('left')" @keyup.right="change('right')">
    <el-carousel :interval="0" type="card" height="400px" ref="bag" @change="getIndex">
      <el-carousel-item v-for="(item,index) in 6" :key="item">
        <div class="item-panel">
          <div class="item-line">
            {{nowIndex == index ? item : ""}}
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
      nowIndex:0
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
}
</style>
<style lang="less">
@import '../style/color.less';
.item-list {
  .el-carousel__item {
    background-color: @co10;

    .item-panel {
      opacity: .24;
    }
    &.is-active {
      .item-panel {
        opacity: 1;
      }
    }
  }
}
</style>