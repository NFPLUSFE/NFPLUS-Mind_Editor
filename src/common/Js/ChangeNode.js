import bus from './Bus.js'
export function addChildNode (e) {
  event.preventDefault()
  var node = {
    name: '新节点',
    extend: false,
    children: []
  }
  e.extend = true // 新增的同时要展开当前结点
  e.children.push(node)
  bus.$emit('addCache')
}
export function removeNode (arr, index) {
  event.preventDefault()
  if (event.currentTarget === document.getElementsByClassName('root')[0]) {
    alert('你不能这么对待根节点')
  } else {
    arr.splice(index, 1)
  }
  bus.$emit('addCache')
}
export default {
  addChildNode,
  removeNode
}
