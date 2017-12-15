<template>
  <el-input-number class="form-number" v-model="form.value" @change="userChange" :min="option.min || 0" :max="option.max || Infinity"></el-input-number>
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