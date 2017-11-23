<template>
  <el-input-number class="form-number" v-model="form.value" @change="userChange" :min="1" :max="10"></el-input-number>
</template>

<script>
export default {
  name: 'form-number',
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
    userChange: {
      type: Function,
      default: () => {}
    }
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