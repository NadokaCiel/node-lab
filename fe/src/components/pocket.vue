<template>
  <div class="pocket">
    <div class="pocket-title" :class="pocket.name.toLowerCase() +'-title'">
      {{pocketTitle}}
    </div>
    <div class="pocket-container">
      <div class="pocket-item" flex="main:justify cross:center" v-for="line in pocket.items" :class="line.rarity">
        <div class="item-name">{{line.name}}</div>
        <div class="item-count">{{'X ' + line.count}}</div>
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
  },
  data() {
    return {
    }
  },
  created: function() {
  },
  methods:{
  },
  computed: mapState([]),
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

    .pocket-item {
      height: 26px;
      line-height: 26px;
      padding: 0 8px;
      font-size: 14px;
      border-bottom: 1px solid @a3;
      &:hover{
        padding-left: 15px;
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