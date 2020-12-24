export function download (filename, data) {
  var a = document.createElement('a')
  a.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data))
  a.setAttribute('download', filename)
  a.click()
}
export function save (filename, data) {
  localStorage.setItem(filename, data)
}
export function remove (filename) {
  localStorage.removeItem(filename)
}
export default {
  download,
  save,
  remove
}
