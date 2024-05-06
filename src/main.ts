import { createApp } from 'vue'
import axios from 'axios'
import App from './App.vue'
import store from './store'
import router from './router'
axios.defaults.baseURL = 'http://apis.imooc.com/api/'
axios.get('/columns').then(resp => {
  console.log(resp, '输出')
})
axios.interceptors.request.use(config => {
  config.params = { ...config.params, icode: 'FB4C6B8434F751FA' }
  return config
})

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
