<template>
  <el-input class="form-string" v-model="form.value"></el-input>
</template>

<script>
export default {
  name: 'form-string',
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
        return {}
      }
    },
  },
  data() {
    return {
    }
  },
  created: function() {
    const vm = this
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