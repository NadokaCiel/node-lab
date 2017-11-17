<template>
  <div class="form-color">
    <el-input class="color-shower" placeholder="请输入内容" v-model="form.value">
      <template slot="prepend">
        <el-color-picker @active-change="setColor" class="color-picker" v-model="form.value"></el-color-picker>
      </template>
    </el-input>
  </div>
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
  	setColor(nV){
  		// this.form.value = nV
  	},
  	valueChange(nV) {
  		console.log(nV)
  		this.$emit('change')
  	}
  },
  watch:{
  	'form.value':'valueChange'
  }
}
</script>

<style lang="less">
.form-color {
	.color-picker {
		float: left;
		height: 26px;

		.el-color-picker__trigger {
			border: none;
			height: 26px;
			padding: 5px;

			.el-color-picker__color {
				width: 16px;
				height: 16px;
			}
			.el-color-picker__icon {
				display: none;
			}
		}
	}
	.color-shower {
		float: left;
		margin-top: 4px;

		.el-input-group__prepend {
			padding: 0;
		}
	}
}
</style>