<template>
  <div class="backpack">
    <itemList></itemList>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import itemList from '../../components/itemList.vue'
export default {
  name: 'backpack',
  created: function() {
    const vm = this
  },
  data() {
    return {
    }
  },
  methods: {
  },
  computed: mapState({}),
  watch: {},
  components: {
    itemList
  }
}
</script>


<style lang="less" scoped>
@import '../../style/color.less';
.backpack {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>