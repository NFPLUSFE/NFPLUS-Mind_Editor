<template>
  <div class="home">
    <h1>欢迎来到mind</h1>
    <div class="container">
      <div class="space-between">
        <div class="example-box r-v-center"
         v-for="item in mindList"
          :key="item.index"
          @click='goToMind(item[0])'>
          {{item[0].name}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Menu',
  components: {

  },
  data () {
    return {
      mindList: [
        [{
          name: '新节点',
          extend: false,
          children: []
        }]
      ]
    }
  },
  methods: {
    getMindList: function () {
      const that = this
      var arr = Object.entries(localStorage)
      arr.pop()
      arr.map(function (e) {
        that.mindList.push(JSON.parse(e[1]))
      })
    },
    goToMind: function (tree) {
      this.$router.push(
        {
          name: 'Mind',
          params: { tree: tree }
        }
      )
    }
  },
  created () {
    this.getMindList()
  }
}
</script>
<style lang="scss" scoped>
  .container{
    width: 30%;
    height: auto;
    margin: 0 auto;
  }
  .space-between{display: flex;flex-direction: row;justify-content: space-between;}
  .r-v-center{
    display: flex;justify-content: center;align-items: center;
  }
  .example-box{
  width: 100px;
  height: 100px;
  background-color: rgb(194, 190, 183);
  margin:1%
}
</style>
