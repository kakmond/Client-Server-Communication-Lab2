import Vue from 'vue'
import App from './App.vue'
import router from './router'
// Adding Bootstrap styles and JavaScript
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
Vue.config.productionTip = false

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
