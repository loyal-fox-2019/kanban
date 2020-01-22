import Vue from 'vue';
import VModal from 'vue-js-modal';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(VModal, { dynamic: true, dynamicDefaults: { clickToClose: true } });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
