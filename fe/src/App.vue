<template>
  <div id="app" tabindex="-1" @keyup="getKey">
    <div @mouseenter="onMenu(true)" @mouseleave="onMenu(false)" v-if="$route.name!='Login'">
      <nav-bar></nav-bar>
    </div>
    <transition name="el-fade-in-linear">
      <router-view class="app-view" :class="{'folded':expand}"></router-view>
    </transition>
  </div>
</template>

<script>
import navBar from './components/nav.vue'
import key from './data/key'
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
    getKey(event){
      if(event && event.key && key[event.key]){
        this.bus.$emit('keyup',key[event.key])
      }
    }
  },
  computed: mapState({
    bus: 'bus',
  }),
  watch:{
  },
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