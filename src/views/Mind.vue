<template>
  <div class="about">
    <h1>This is a mind</h1>
      <div class="container">
        <drawLine :linePoint='linePoint'></drawLine>
        <tree :list='tree' @changeLinePoint='child' @addCache='addCacheTree'></tree>
      </div>
  </div>
</template>
<script>
import tree from '@/components/Tree.vue'
import drawLine from '@/components/DrawLine.vue'

export default {
  name: 'mind',
  components: { tree, drawLine },
  data: function () {
    return {
      tree: [{
        name: '经济',
        extend: false,
        children: [{
          name: '如家',
          extend: false,
          children: [{
            name: '上江路-如家',
            extend: false,
            children: []
          },
          {
            name: '望江路如家',
            extend: false,
            children: []
          }]
        }, {
          name: '7天',
          extend: false,
          children: [{
            name: '长江路-7天',
            extend: false,
            children: []
          },
          {
            name: '望江路-7天',
            extend: false,
            children: []
          }]
        }]
      }],
      cacheTree: [],
      linePoint: []
    }
  },
  methods: {
    child: function () {
      var that = this
      this.Bus.$on('changeLinePoint', function (e) {
        that.linePoint = e
      })
    },
    addCacheTree: function () {
      var that = this
      this.Bus.$on('addCache', function (e) {
        var cache = JSON.parse(JSON.stringify(that.tree)) // 缓存现状（注意这个时候是已经修改了的）
        if (that.cacheTree.length >= 5) { // 暂定只能撤销五步
          that.cacheTree.shift()
        }
        that.cacheTree.push(cache)
      })
    },
    cancel: function () {
      this.$nextTick(function () {
        if (this.cacheTree.length > 1) {
          this.cacheTree.pop() // 这里弹出来现状
          var nowTree = this.cacheTree[this.cacheTree.length - 1] // 这里得到上一步。
          this.tree = nowTree
        } else {
          this.cacheTree.push(JSON.parse(JSON.stringify(this.tree)))
        }
      })
      alert('剩余可回退次数：' + ((this.cacheTree.length - 2) > 0 ? (this.cacheTree.length - 2) : 0))
    }
  },
  mounted () {
    this.cacheTree.push(JSON.parse(JSON.stringify(this.tree)))
  },
  created () {
    this.child()
    this.addCacheTree()
    const that = this
    window.addEventListener('keydown', function (e) {
      var keyCode = e.keyCode || e.which || e.charCode
      if (e.ctrlKey && keyCode === 90) {
        that.cancel()
      }
      if (e.ctrlKey && keyCode === 83) {
        event.preventDefault()
        // that.File.save(that.tree[0].name, JSON.stringify(that.tree))
        that.File.download(that.tree[0].name, JSON.stringify(that.tree))
      }
    })
  }

}
</script>
<style lang="scss" scoped>
  .about{
    position: relative;
    width: 100%;
  }
  .container{
    position: relative;
    width: 100%;
    min-height: 50vh;
  }
</style>
