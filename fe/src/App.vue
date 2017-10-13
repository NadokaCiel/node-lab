<template>
  <div id="app" tabindex="-1" @keyup.up="change('up')" @keyup.down="change('down')" @keyup.left="change('left')" @keyup.right="change('right')">
    <div @mouseenter="onMenu(true)" @mouseleave="onMenu(false)">
      <nav-bar></nav-bar>
    </div>
    <transition name="el-fade-in-linear">
      <router-view class="app-view" :class="{'folded':expand}"></router-view>
    </transition>
  </div>
</template>

<script>
import navBar from './components/nav.vue'
import { mapState } from 'vuex'
export default {
  name: 'app',
  data() {
    return {
      expand:false,
    }
  },
  created: function() {
    const vm = this;
    let fontSize = (document.body.clientWidth / 16) + 'px';
    document.getElementsByTagName("html")[0].style.setProperty('font-size', fontSize);
    document.body.style.setProperty('font-size', '.6rem');
    window.onresize = function() {
      let fontSize = (document.body.clientWidth / 16) + 'px';
      document.getElementsByTagName("html")[0].style.setProperty('font-size', fontSize);
      document.body.style.setProperty('font-size', '.6rem');
    }
  },
  methods:{
    onMenu(isFoled){
      this.expand = isFoled
    },
    change(key){
      this.bus.$emit('keyup',key)
    }
  },
  computed: mapState(["bus"]),
  components: {
    navBar
  }
}
</script>

<style lang="less">
#app {
  font-family: "Microsoft YaHei", "Verdana", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  outline: 0;

  .app-view {
    margin-left: 50px;
    transition: all .3s ease;
  }
  .folded{
    margin-left:200px;
    transition: all .3s ease;
  }
}
* {
  box-sizing: border-box;
}
</style>