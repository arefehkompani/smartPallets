import { createApp } from 'vue'
import panelPage from './pages/panelPage.vue'
import router from './router'
import store from './vuex'

let app = createApp(panelPage)

app.use(store)
app.use(router)
app.mount('#app')