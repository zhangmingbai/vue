import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'font-awesome/css/font-awesome.min.css'
import request from "@/net/request";
import 'highlight.js/styles/monokai-sublime.css'

const app = createApp(App)

app.config.globalProperties.$request = request
app.use(ElementPlus)
app.use(router)
app.mount('#app')
