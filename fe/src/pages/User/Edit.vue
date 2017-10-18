<template>
  <div class="user-edit">
    <el-form class="my-form" ref="form" :model="form" label-width="80px">
      <el-form-item label="Name">
        <el-input v-model="form.user_name"></el-input>
      </el-form-item>
      <el-form-item label="Password">
        <el-input v-model="form.password"></el-input>
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
import cButton from '../../components/cButton.vue'
export default {
  name: 'user-edit',
  created: function() {
    let vm = this
    if(vm.$route.params && vm.$route.params.id && vm.$route.params.id!=0){
      vm.id = vm.$route.params.id
      vm.getData()
    }
  },
  data() {
    return {
      id: 0,
      form: {
        user_name: '',
        password: '',
      },
    }
  },
  methods: {
    toList() {
      const vm = this
      vm.$router.push({
        name: 'User-List'
      })
    },
    getData(){
      const vm = this
      return vm.$ajax('get', '/api/user/'+vm.id,{}, data => {
        vm.form = data
      }, error => {
        console.log(error)
      })
    },
    save() {
      const vm = this
      if (vm.id && vm.id!=0) {
        return vm.$ajax('put', '/api/user/'+vm.id, vm.form, data => {
          vm.toList()
        }, error => {
          console.log(error)
        })
      } else {
        return vm.$ajax('post', '/api/user', vm.form, data => {
          vm.toList()
        }, error => {
          console.log(error)
        })
      }
    }
  },
  computed: mapState({}),
  watch: {},
  components: {
    cButton
  }
}
</script>


<style lang="less" scoped>
@import '../../style/color.less';
.user-edit {
  .my-form{
    margin: 20px auto;
    padding-right: 30%;
    width: 80%;
  }
}
</style>