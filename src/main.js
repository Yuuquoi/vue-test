// ref: https://vuetifyjs.com/zh-Hans/getting-started/installation/#section-5b8988c5
// $ npm install vuetify
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify/lib/framework.mjs'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// vuetify
const vuetify = createVuetify({
    components, directives
})
app.use(vuetify)

app.use(createPinia())
app.use(router)

app.mount('#app')
