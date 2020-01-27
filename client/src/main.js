import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import firebase from 'firebase'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyCLI3uXIn5uzmswyCV9IBkIRAr0Bji6jLI',
  authDomain: 'kanban-bd6c5.firebaseapp.com',
  databaseURL: 'https://kanban-bd6c5.firebaseio.com',
  projectId: 'kanban-bd6c5',
  storageBucket: 'kanban-bd6c5.appspot.com',
  messagingSenderId: '725153524672',
  appId: '1:725153524672:web:3c337527c960544c2bb625',
  measurementId: 'G-8TSRH73M9S'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

Vue.prototype.$db = firebase.firestore()
Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
