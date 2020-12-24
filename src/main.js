import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '../public/global.css'
import Drag from '@/common/Js/DragEvents.js' // 引入封装方法
import ChangeNode from '@/common/Js/ChangeNode.js' // 引入封装方法
import File from '@/common/Js/File.js' // 引入封装方法
import Bus from '@/components/Bus.js'
Vue.prototype.Drag = Drag // 挂载到原型
Vue.prototype.Bus = Bus // 挂载到原型
Vue.prototype.File = File // 挂载到原型
Vue.prototype.ChangeNode = ChangeNode // 挂载到原型
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
