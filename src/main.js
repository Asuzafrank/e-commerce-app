import './assets/main.css'
import Toast from 'vue-toastification'
import 'primeicons/primeicons.css'
import "vue-toastification/dist/index.css";
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Pagination from 'v-pagination-3';

const app = createApp(App)

app.use(router)
app.component('pagination', Pagination)
app.use(Toast)

app.mount('#app')
