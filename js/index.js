globalThis.__VUE_OPTIONS_API__ = true
globalThis.__VUE_PROD_DEVTOOLS__ = false

import { createApp } from 'vue'
import { Tabs, Tab } from 'vue3-tabs-component'

import App from './App.vue'

const app = createApp(App).component('tabs', Tabs).component('tab', Tab)
app.mount('#app')
