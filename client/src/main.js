import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueSweetalert2 from 'vue-sweetalert2';
import options from './config/sweetAlert'
import dotenv from 'dotenv'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'sweetalert2/dist/sweetalert2.min.css'

Vue.config.productionTip = false
dotenv.config()
Vue.use(BootstrapVue)
Vue.use(VueSweetalert2, options);
Vue.use(IconsPlugin)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
