import { createApp } from 'vue'
import './css/input.css'
import store from './store/index.js'
import App from './App.vue'
import router from './router/index.js'

createApp(App)
  .use(store)
  .use(router)
  .mount('#app')
