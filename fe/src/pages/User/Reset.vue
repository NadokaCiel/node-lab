<template>
  <div class="user-reset">
    <el-form class="my-form" ref="form" :model="form" :rules="rules" label-position="left" label-width="160px">
      <el-form-item required label="Original Password" prop="o_password">
        <el-input type="password" v-model="form.o_password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item required label="New Password" prop="n_password">
        <el-input type="password" v-model="form.n_password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item required label="Confirm Password" prop="c_password">
        <el-input type="password" v-model="form.c_password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <c-button type="primary" :clickFunc="[save]">保存</c-button>
        <el-button @click="toList">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'user-reset',
  created: function() {
    let vm = this
    if(vm.$route.params && vm.$route.params.id && vm.$route.params.id!=0){
      vm.id = vm.$route.params.id
      vm.getData()
    }
  },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter your password.'));
      } else if (value == this.form.o_password) {
        callback(new Error('Passwords unchanged.'));
      } else {
        if (this.form.c_password !== '') {
          this.$refs.form.validateField('c_password');
        }
        callback();
      }
    }
    const validatePass_C = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter your password again.'));
      } else if (value !== this.form.n_password) {
        callback(new Error('Passwords are not inconsistent.'));
      } else {
        callback();
      }
    }
    return {
      id: 0,
      form: {
        o_password: '',
        n_password: '',
        c_password: '',
      },
      rules: {
        o_password:[{ required: true, message: 'Password cannot be empty', trigger: 'change' }],
        n_password: [{
          validator: validatePass,
          trigger: 'change'
        }],
        c_password: [{
          validator: validatePass_C,
          trigger: 'change'
        }]
      }
    }
  },
  methods: {
    toList() {
      const vm = this
      vm.$router.push({
        name: 'User-List'
      })
    },
    save() {
      const vm = this
      let flag = false
      vm.$refs.form.validate((valid) => {
        flag = valid
      })
      if(!flag) return
      return vm.$ajax('put', '/api/password/', vm.form, data => {
        vm.$hint("Password reseted.","Operation Succeeded",{
          type: 'success',
          callback:()=>{
            vm.toList()
          }
        })
      })
    }
  },
  computed: mapState({}),
  watch: {},
  components: {
  }
}
</script>


<style lang="less" scoped>
@import '../../style/color.less';
.user-reset {
  .my-form{
    margin: 20px auto;
    padding-right: 30%;
    width: 80%;
  }
}
</style>