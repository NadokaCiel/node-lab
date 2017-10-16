<template>
  <div class="item-list">
    <el-carousel :interval="0" type="card" height="400px" ref="bag" @change="getIndex">
      <el-carousel-item v-for="(pocket,index) in pocketList" :key="pocket.name">
        <pocket class="pocket-panel" :pocket="pocket" :pocket-title="nowIndex == index ? pocket.name : ''" :is-active="nowIndex == index">
        </pocket>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import pocket from './pocket.vue'
export default {
  name: 'item-list',
  data() {
    const list = [{
          name:'HP potion - S',
          count:20,
          rarity:'normal'
        },{
          name:'HP potion - M',
          count:10,
          rarity:'normal'
        },{
          name:'HP potion - L',
          count:2,
          rarity:'rare'
        },{
          name:'MP potion - S',
          count:15,
          rarity:'normal'
        },{
          name:'MP potion - M',
          count:6,
          rarity:'rare'
        },{
          name:'Ginseng',
          count:1,
          rarity:'epic'
        },{
          name:'Saucer Peach',
          count:1,
          rarity:'lengendary'
        },{
          name:'HP potion - S',
          count:20,
          rarity:'normal'
        },{
          name:'HP potion - M',
          count:10,
          rarity:'normal'
        },{
          name:'HP potion - L',
          count:2,
          rarity:'rare'
        },{
          name:'MP potion - S',
          count:15,
          rarity:'normal'
        },{
          name:'MP potion - M',
          count:6,
          rarity:'rare'
        },{
          name:'Ginseng',
          count:1,
          rarity:'epic'
        },{
          name:'Saucer Peach',
          count:1,
          rarity:'lengendary'
        },{
          name:'HP potion - S',
          count:20,
          rarity:'normal'
        },{
          name:'HP potion - M',
          count:10,
          rarity:'normal'
        },{
          name:'HP potion - L',
          count:2,
          rarity:'rare'
        },{
          name:'MP potion - S',
          count:15,
          rarity:'normal'
        },{
          name:'MP potion - M',
          count:6,
          rarity:'rare'
        },{
          name:'Ginseng',
          count:1,
          rarity:'epic'
        },{
          name:'Saucer Peach',
          count:1,
          rarity:'lengendary'
        }]
    return {
      nowIndex:0,
      pocketList:[{
        name:'Medicines',
        items:list
      },{
        name:'Weapons',
        items:list
      },{
        name:'Equipment',
        items:list
      },{
        name:'Accessory',
        items:list
      },{
        name:'Valuables',
        items:list
      }]
    }
  },
  created: function() {
    const vm = this
    vm.bus.$on('keyup',key=>{
      vm.change(key)
    })
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
  computed: mapState(["bus"]),
  components: {
    pocket
  }
}
</script>

<style lang="less" scoped>
@import '../style/color.less';
.item-list {
}
</style>
<style lang="less">
@import '../style/color.less';
.item-list {
  .el-carousel__item {
    background-color: @blue;

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