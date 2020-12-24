<template>
  <div>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
      <path  v-for='obj in PointArr' :key="obj.index"
       :d='obj.path'
      style="stroke:red;stroke-width:0.5;fill:none"></path>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'drawLine',
  props: ['linePoint'],
  data () {
    return {
      PointArr: []
    }
  },
  components: {},
  mounted () {},
  updated () {
  },
  methods: {

  },
  watch: {
    linePoint: function () {
      const that = this
      that.PointArr = []
      that.linePoint.map(e => {
        e.children.map(par => {
          let controlY = 0
          e.y >= par.y ? controlY = Math.min(e.y, par.y) : controlY = Math.max(e.y, par.y)
          that.PointArr.push({
            path: 'M' + e.x + ' ' + e.y + ' S' + e.x + ' ' + controlY + ' ' + par.x + ' ' + par.y
          })
        })
      })
    }
  }
}
</script>

<style lang='scss' scoped>

svg{
    display: block;
      position: absolute;
  z-index: -99;
  width: 100%;
  height: 100%;
}
</style>
