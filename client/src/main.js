import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import db from './api/firebase';
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(Vuetify);
Vue.config.productionTip = false;
Vue.prototype.$firestoredb = db;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
