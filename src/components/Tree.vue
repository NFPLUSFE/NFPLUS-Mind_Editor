<template>
  <div class="column"

  @drop.stop='Drag.drop(list)'
  @dragenter.stop="Drag.dragenter"
  @dragover.stop="Drag.dragover"
  @dragleave.stop="Drag.dragleave"
  >
    <div class="v-center" v-for="(item, index) in list" :key="index"
      draggable="true"
      @dragstart.self='Drag.dragstart(item)'
      @dragend.self="Drag.dragend(list,item)"
    >
        <div class="root"
        @keydown.tab="ChangeNode.addChildNode(item)"
        @keydown.46='ChangeNode.removeNode(list,item.index)' >
          <textarea
            class="rect"
            @input="changeHeight"
            @change="Bus.$emit('addCache')"
            @dblclick="writeable(false)"
            @blur="writeable(true)"
            readonly
            v-model="item.name"
          ></textarea>
        </div>
        <img
          v-if="item.children.length !== 0"
          :src="changeExtendIcon(item.extend)"
          width="10px"
          @click="item.extend = !item.extend"
        />
      <tree v-if="item.children&&item.extend" :list="item.children"></tree>
    </div>
  </div>
</template>

<script>

export default {
  name: 'tree',
  props: {
    list: Array
  },
  data () {
    return {
      // 两个收纳符号的引入
      extend: require('@/assets/plus.png'),
      accpet: require('@/assets/sub.png'),
      linePoint: []
    }
  },
  components: {},
  mounted () {},
  updated () {
    this.getInfoTree()
  },
  methods: {
    // 动态改变输入框高度
    changeHeight: function (e) {
      if (e.target.scrollHeight > e.target.offsetHeight) {
        e.target.style.height = e.target.scrollHeight + 'px'
      }
    },
    // 改变文本域的为仅读或可写
    writeable: function (bool) {
      event.currentTarget.readOnly = bool
    },
    // 符号自动变化
    changeExtendIcon: function (par) {
      if (!par) {
        return this.extend
      }
      return this.accpet
    },
    // 获得信息树
    getInfoTree: function () {
      this.linePoint = []
      const roots = document.getElementsByClassName('root')
      for (let j = 0; j < roots.length; j++) {
        const root = roots[j]
        if (root.parentNode.children.length >= 3) { // 3表示有展开子节点
          const lastSiblingChildren = root.parentNode.lastChild.children // 获得最后一个同胞元素内的直接子元素.也就是子节点们.此时包裹在v-center里面
          const children = []
          for (var i = 0; i < lastSiblingChildren.length; i++) {
            children.push({
              x: lastSiblingChildren[i].firstChild.offsetLeft + Math.floor(lastSiblingChildren[i].firstChild.offsetWidth * 0.5),
              y: lastSiblingChildren[i].firstChild.offsetTop + Math.floor(lastSiblingChildren[i].firstChild.offsetHeight * 0.5)
            })
          }
          this.linePoint.push({
            x: root.offsetLeft + Math.floor(root.offsetWidth * 0.5),
            y: root.offsetTop + Math.floor(root.offsetHeight * 0.5),
            children: children
          })
        }
      }
      this.Bus.$emit('changeLinePoint', this.linePoint)
    }
  }
}
</script>

<style lang='scss' scoped>

div {
  display: inline-block;
}
/*横向排列主轴居中*/
.v-center {
  display: flex;
  align-items: center;
  flex-direction: row;
}
/*纵向排列*/
.column {
  display: flex;
  flex-direction: column;
}
/*结点样式*/
.root {
  line-height: 0;
  border: solid 1px black;
  margin: 10px;
}
/*节点选中时的样式。focus-within实现点击文本域时节点边框也能变样式*/
.root:focus-within {
  border: solid 1px rgb(149, 149, 238);
}
/*文本域样式，用于输入内容*/
.rect {
  width: 100%;
  height: 2rem;
  font-size: 1rem;
  padding: 0.5rem 0;
  overflow: hidden;
}

textarea {
  border: none;
  resize: none;
  outline: none;
  text-align: center;
}
</style>
