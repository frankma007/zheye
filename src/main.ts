import { createApp } from 'vue'
import axios from 'axios'
import App from './App.vue'
import store from './store'
import router from './router'
axios.defaults.baseURL = 'http://apis.imooc.com/api/'
const Icode = 'FB4C6B8434F751FA'
axios.interceptors.request.use(function (config) {
  console.log(config, 'config')
  debugger
  config.params = { ...config.params, icode: Icode }

  if (config.data instanceof FormData) {
    config.data.append('icode', Icode)
  } else {
    config.data = { ...config.data, icode: Icode }
  }
  store.commit('setLoading', true)
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
axios.interceptors.response.use((config) => {
  setTimeout(() => {
    store.commit('setLoading', false)
  }, 3000)

  return config
})
// axios.interceptors 必须配置在顶部 不然不会被识别
// axios.get('/columns', { params: { id: '666', name: 'ddd' } }).then(resp => {
//   console.log(resp, '输出')
// })
const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
