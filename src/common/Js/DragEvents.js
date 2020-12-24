
// 被拖拽物
export function dragstart (obj) {
  var data = JSON.stringify(obj)
  event.dataTransfer.setData('text/plain', data)
}
export function dragend (arr, obj) {
  arr.splice(arr.indexOf(obj), 1) // 此时arr已经发生变化
}
// 在容器内释放拖拽物
export function drop (arr) {
  event.preventDefault()
  var data = event.dataTransfer.getData('text/plain')
  const obj = JSON.parse(data)
  arr.push(obj)
  event.currentTarget.style.border = ''
}
// 拖拽物进入容器
export function dragenter () {
  event.currentTarget.style.border = 'solid green 1px'
}
// 拖拽物在容器内
export function dragover () {
  event.preventDefault()
  event.currentTarget.style.border = 'solid green 1px'
}
// 拖拽物离开容器
export function dragleave () {
  event.preventDefault()
  event.currentTarget.style.border = ''
}

export default {
  dragstart,
  dragend,
  drop,
  dragenter,
  dragover,
  dragleave
}
