<template>
  <div class="item-edit">
    <c-form class="my-form" :settings="settings" :layout="layout" @valid="formFilled" :values="values">
    </c-form>
    <div class="age-info">
      <p class="info-line" v-for="(line,index) in results" :keys="index">
        <span>我出生于</span>
        <span class="lengendary">{{values.birthYear}}</span>
        <span>年，直到</span>
        <span class="lengendary">{{line.year}}</span>
        <span>岁才遇到</span>
        <span class="lengendary">{{line.diff ? line.diff : ''}}</span>
        <span>{{line.diff == 0 ? '所有数字都相同的年份。' : '个数字都不相同的年份。'}}</span>
        <span class="lengendary">({{(values.birthYear + line.year + '').padStart(4, "0")}})</span>
      </p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import cForm from '../../components/form/cForm.vue'
export default {
  name: 'item-edit',
  created: function() {
    const vm = this
  },
  data() {
    return {
      results:[],
      values: {
        birthYear:"1994",
      },
      settings: {
        birthYear: {
          title: "Year of birth",
          type: "number",
          format: "number",
          default: 1990,
          min:1,
          max:3000,
        },
      },
      layout: [{
        title: "Basic Info",
        contains: ["birthYear"]
      }],
    }
  },
  methods: {
    toList() {
      const vm = this
      vm.$router.push({
        name: 'Item-List'
      })
    },
    formFilled(data) {
      this.values = data
      this.calc()
    },
    calc() {
      const birthYear = this.values.birthYear
      const flag = {}
      this.results = []
      for (let i = birthYear + 1; i < 3000; i++) {
        const yearStr = (i + '').padStart(4, "0")
        const yearArr = yearStr.split("")
        const map = {}
        yearArr.forEach(i => {
          map[i] = true
        })
        const num = Object.keys(map).length
        if (!flag[num]) {
          flag[num] = true

          const result = {
            year: i - birthYear,
            diff: num == 1 ? 0 : num,
          }
          this.results.push(result)
        }
        if (Object.keys(flag).length >= 4) {
          return
        }
      }
    }
  },
  computed: mapState({}),
  watch: {},
  components: {
    cForm
  }
}
</script>


<style lang="less" scoped>
@import '../../style/color.less';
.item-edit {
  .my-form {
    margin: 60px auto;
    width: 70%;
  }
  .age-info {
    font-size: 14px;
    text-align: center;
    margin: 60px auto;
  }
}
</style>