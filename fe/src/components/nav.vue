<template>
  <el-menu :default-active="getRouter()" class="nav" @mouseenter.native="showText=!showText" @mouseleave.native="showText=!showText" @select="menuSelected">
    <template v-for="item in menu">
      <el-menu-item v-if="!item.sub || item.sub.length==0" :index="item.route" @mouseenter.native="item.isHover=!item.isHover" @mouseleave.native="item.isHover=!item.isHover">
        <i class="fa fa-fw animated" :class="[item.icon ? item.icon : 'el-icon-null',item.isHover ? 'jello' : 'rubberBand']"></i>
        <span>{{showText ? item.name : ''}}</span>
      </el-menu-item>
      <el-submenu v-if="item.sub && item.sub.length!=0" :index="item.route" @mouseenter.native="item.isHover=!item.isHover" @mouseleave.native="item.isHover=!item.isHover">
        <template slot="title">
          <i class="fa fa-fw animated" :class="[item.icon ? item.icon : 'el-icon-null',item.isHover ? 'jello' : 'rubberBand']"></i>
          <span>{{showText ? item.name : ''}}</span>
        </template>
        <el-menu-item v-for="(subItem,index) in item.sub" :index="subItem.route" :key="index" @mouseenter.native="subItem.isHover=!subItem.isHover" @mouseleave.native="subItem.isHover=!subItem.isHover">
          <i class="fa fa-fw animated" :class="[subItem.icon ? subItem.icon : 'el-icon-null',subItem.isHover ? 'jello' : 'rubberBand']"></i>
          <span>{{showText ? subItem.name : ''}}</span>
        </el-menu-item>
      </el-submenu>
    </template>
  </el-menu>
</template>


<script>
import { menuData, menuMap} from '../data/menu'
import { mapState } from 'vuex'
export default {
  name: 'nav-bar',
  data() {
    addStatus(menuData)
    return {
    	menu:menuData,
      menuMap,
      showText:false
    }
  },
  created: function() {
  },
  methods:{
    getRouter(){
      return this.menuMap[this.$route.name]
    },
    menuSelected(index,path){
      this.$router.push({name:index})
    }
  },
  computed: mapState([]),
  components: {
  }
}

function addStatus(list){
  list.forEach(i=>{
    i.isHover = false
    if(i.sub){
      addStatus(i.sub)
    }
  })
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
    margin-right: 15px;
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