<template>
  <div id="login">
    <div class="login-title">{{appName}}</div>
    <el-form class="login-form" ref="form" :model="form" :rules="rules" size="mini" label-position="top">
      <el-form-item label="Name" required prop="user_name">
        <el-input v-model="form.user_name" placeholder="Please Enter Your Username"></el-input>
      </el-form-item>
      <el-form-item label="Password" required prop="password">
        <el-input type="password" v-model="form.password" placeholder="Please Enter Your Password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item style="text-align: center;">
        <c-button type="primary" :clickFunc="[login]">Login</c-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
import { mapState } from 'vuex'
import cButton from '../components/cButton.vue'
export default {
  name: 'login',
  created: function() {
  },
  data() {
    return {
      form:{
        user_name:"",
        password:""
      },
      rules:{
        user_name:[{ required: true, message: 'Username cannot be empty', trigger: 'change' }],
        password:[{ required: true, message: 'Password cannot be empty', trigger: 'change' }]
      }
    }
  },
  methods: {
    async login(){
      const vm = this
      const valid = await vm.$refs.form.validate()
      if(!valid){
        return
      }
      return vm.$ajax('post', '/api/token/',vm.form, data => {
        vm.$router.push({name:"Home"})
      })
    }
  },
  computed: mapState({
    appName: state => state.appName,
  }),
  components: {
    cButton
  }
}
</script>


<style lang="less" scoped>
@import '../style/color.less';
#login {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: 0;
  padding: 0;
  z-index: 1;

  &:before {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    content: " ";
    background-image: url(../assets/login-bg.jpg);
    background-size: cover;
    filter: blur(10px);
    z-index: -1;
  }
  .login-title {
    width: 50%;
    margin: 50px auto;
    color: @sec1;
    font-size: 1rem;
    z-index: 10;
    text-align: center;
  }
  .login-form{
    width: 40%;
    min-width: 250px;
    margin: 50px auto;
    font-size: .4rem;
  }

}
</style>
<style lang="less">
@import '../style/color.less';
#login {
  .el-form-item__label {
    color: @a5;
  }

  .el-input__inner{
    background-color: transparent;
    border-top: none;
    border-left: none;
    border-right: none;
    color:@lighter;
  }
}
</style>