<template>
  <div class="item-test">
    <c-form class="my-form" :settings="settings" :layout="layout" @valid="formFilled" :values="values" @change="formChange">
    </c-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import cForm from '../../components/form/cForm.vue'
export default {
  name: 'item-test',
  created: function() {
    const vm = this
  },
  data() {
    return {
      values: {
        name:"Peach",
        type:"food",
        color:"#FF6E97",
        amount:4
      },
      settings: {
        name: {
          title: "Name",
          description: "No more than 8 words",
          type: "string",
          format: "string",
          default: "ItemX",
          required: true
        },
        type: {
          title: "Type",
          description: "Item type",
          type: "string",
          format: "enum",
          enum: [{
            label: 'food',
            value: 'food'
          }, {
            label: 'weapon',
            value: 'weapon'
          }, {
            label: 'armor',
            value: 'armor'
          }],
          default: "weapon",
          required: true
        },
        color: {
          title: "Color",
          description: "Please input the color in hex-format",
          type: "string",
          format: "color",
          default: "#FFF",
          required: true,
          // pattern: "^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$"
        },
        amount: {
          title: "Amount",
          type: "number",
          format: "number",
          default: 1,
        },
      },
      layout: [{
        title: "Basic Info",
        contains: ["name","type"]
      }, {
        title: "Basic Attributes",
        contains: ["color","amount"]
      }, {
        title: "Extra Attributes",
        contains: []
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
    formChange(validity, data) {
      console.log(validity)
    },
    formFilled(data) {
      console.log(data)
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
.item-test {
  .my-form {
    margin: 60px auto;
    width: 70%;
  }
}
</style>