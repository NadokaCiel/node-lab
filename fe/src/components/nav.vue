<template>
  <el-menu :default-active="getRouter()" class="nav" @mouseenter.native="showText=!showText" @mouseleave.native="showText=!showText" @select="menuSelected">
    <template v-for="item in menu">
      <el-menu-item v-if="!item.sub || item.sub.length==0" :index="item.route">
        <i class="fa fa-fw" :class="item.icon ? item.icon : 'el-icon-null'"></i>
        <span>{{showText ? item.name : ''}}</span>
      </el-menu-item>
      <el-submenu v-if="item.sub && item.sub.length!=0" :index="item.route">
        <template slot="title">
        <i class="fa fa-fw" :class="item.icon ? item.icon : 'el-icon-null'"></i>
        <span>{{showText ? item.name : ''}}</span>
        </template>
        <el-menu-item v-for="(subItem,index) in item.sub" :index="subItem.route" :key="index">
          <i class="fa fa-fw" :class="subItem.icon ? subItem.icon : 'el-icon-null'"></i>
          <span>{{showText ? subItem.name : ''}}</span>
        </el-menu-item>
      </el-submenu>
    </template>
  </el-menu>
</template>




<script>
import menuData from '../data/menu'
import { mapState } from 'vuex'
export default {
  name: 'nav',
  data() {
    return {
    	menu:menuData,
      showText:false
    }
  },
  created: function() {
  },
  methods:{
    getRouter(){
      return this.$route.name
    },
    menuSelected(index,path){
      this.$router.push({name:index})
    }
  },
  computed: mapState([]),
  components: {
  }
}
</script>

<style lang="less" scoped>
@import '../style/color.less';
@navpanel:darken(@co7, 10%);
.nav {
  width: 50px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: @navpanel;
  transition: all .3s ease;

  &:hover {
    width: 200px;
  }
  [class*=" el-icon-"], [class^=el-icon-], [class*=" fa-"], [class^=fa-] {
    font-size: 16px;
  }
  .el-menu-item {
    padding-left: 15px !important;
  }
  .el-icon-null {
    display: inline-block;
    width: 16px;
    height: 16px;
  }
}
</style>
<style lang="less">
@import '../style/color.less';
@navpanel: darken(@co7, 10%);

.nav {
  .el-menu-item, .el-submenu__title {
    color: @navsub;
    background-color: @navpanel;

    i {
      color: @navsub;
    }
    &:hover {
      background-color: @navsub;
      color: @navpanel;

      i {
        color: @navpanel;
      }
    }
    &.is-active {
      background-color: darken(@navsub, 10%);
      color: @navpanel;

      i {
        color: @navpanel;
      }
    }
  }
  .el-submenu {
    border-top: 2px solid darken(@co6, 10%);
    // border-left: 2px solid darken(@co6, 10%);
    border-bottom: 2px solid darken(@co6, 10%);
  }
  .el-submenu .el-menu-item {
    background-color: @co7;

    &:hover {
      background-color: @navsub;
    }
    &.is-active {
      background-color: darken(@navsub, 10%);
    }
  }
  .el-submenu__title {
    padding-left: 15px !important;

    .el-submenu__icon-arrow {
      visibility: hidden;
    }
  }
  &:hover {
    .el-submenu__title {
      .el-submenu__icon-arrow {
        visibility: visible;
      }
    }
  }
}
</style>