import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

/**
 *  vuetify
 *  1. $ npm install vuetify
 *  2. 全域註冊
 *  3. 在檔案中直接使用
 *  ref: https://vuetifyjs.com/zh-Hans/getting-started/installation/#section-5b8988c5
 */
import 'vuetify/styles'
import { createVuetify } from 'vuetify/lib/framework.mjs'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
const vuetify = createVuetify({
    components, directives
})
app.use(vuetify)
//

/**
 *  perfect scrollbar
 *  1. npm install vue3-perfect-scrollbar
 *  2. 全域註冊
 *  3. main.css 隱藏原本的 scrollbar
 *  4. 在檔案中直接使用 PerfectScrollbar
 *  5. 設定 .ps 的長寬
 *  ref: https://www.npmjs.com/package/vue3-perfect-scrollbar
 */
import { PerfectScrollbarPlugin } from 'vue3-perfect-scrollbar';
import 'vue3-perfect-scrollbar/style.css';
app.use(PerfectScrollbarPlugin)
//

app.use(createPinia())
app.use(router)
app.mount('#app')
