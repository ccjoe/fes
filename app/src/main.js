import Vue from 'vue'
import Electron from 'vue-electron'
import Resource from 'vue-resource'
import Router from 'vue-router'

import './assets/css.css'
import './assets/icon.css'

// Vue Material
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'

import App from './App'
import routes from './routes'

Vue.use(Electron)
Vue.use(Resource)
Vue.use(Router)
Vue.use(VueMaterial)
Vue.config.debug = true
//@todo use theme then material element not effect
Vue.material.theme.register('default', {
  primary: 'light-blue',
  accent: 'pink',
  warn: 'deep-orange',
  background: 'grey'
})

const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes
})

/* eslint-disable no-new */
new Vue({
  router,
  ...App
}).$mount('#app')
