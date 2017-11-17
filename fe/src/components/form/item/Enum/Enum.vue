<template>
  <el-select size="small" class="form-enum" v-model="form.value" :placeholder="option.description || '请选择'">
    <el-option
      v-for="item in option.enum"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'c-form',
  props: {
    form: {
      type: Object,
      default: () => {
        return {}
      }
    },
    option: {
      type: Object,
      default: () => {
        return {
          enum:[]
        }
      }
    },
  },
  data() {
    return {
    }
  },
  created: function() {
    const vm = this
    if(!vm.option.enum){
      vm.option.enum = []
    }
  },
  methods:{
  	valueChange(nV) {
  		this.$emit('change')
  	}
  },
  watch:{
  	'form.value':'valueChange'
  }
}
</script>