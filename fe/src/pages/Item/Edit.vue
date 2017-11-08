<template>
  <div class="item-edit">
    <el-form class="my-form" ref="form" :model="form" label-width="80px">
      <el-form-item label="Name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="Type">
        <el-select v-model="form.type" placeholder="choose a type">
          <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
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
  name: 'item-edit',
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
        name: '',
        type: '',
      },
      typeOptions:[{
        value:"food",
        label:"food"
      },{
        value:"weapon",
        label:"weapon"
      },{
        value:"armor",
        label:"armor"
      }]
    }
  },
  methods: {
    toList() {
      const vm = this
      vm.$router.push({
        name: 'Item-List'
      })
    },
    getData(){
      const vm = this
      return vm.$ajax('get', '/api/item/'+vm.id,{}, data => {
        vm.form = data
      })
    },
    save() {
      const vm = this
      if (vm.id && vm.id!=0) {
        return vm.$ajax('put', '/api/item/'+vm.id, vm.form, data => {
          vm.toList()
        })
      } else {
        return vm.$ajax('post', '/api/item', vm.form, data => {
          vm.toList()
        })
      }
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
.item-edit {
  .my-form{
    margin: 20px auto;
    padding-right: 30%;
    width: 80%;
  }
}
</style>