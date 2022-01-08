import Vue from 'vue'
import VueMaterial from "vue-material"
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery'
import 'popper.js/dist/popper.min'
import App from './App.vue'
import router from "@/router"

Vue.config.productionTip = false

Vue.use(VueMaterial);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
