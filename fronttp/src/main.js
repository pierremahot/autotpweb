import Vue from 'vue';
import App from './App.vue'
import page404 from './pages/404.vue'
import tpimport from './pages/tpimport.vue'
import history from './pages/history.vue'
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import {
  library
} from '@fortawesome/fontawesome-svg-core';
import {
  faCheckCircle,
  faCaretRight,
  faCaretDown
} from '@fortawesome/free-solid-svg-icons';
import {
  FontAwesomeIcon
} from '@fortawesome/vue-fontawesome';

library.add(faCheckCircle, faCaretRight, faCaretDown)
Vue.use(BootstrapVue);
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false

const routes = {
  '/': App,
  '/tpimport': tpimport,
  '/history': history,
  '/404': page404 
}

new Vue({
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent () {
      return routes[this.currentRoute] || page404
    }
  },
  render (h) { return h(this.ViewComponent) }
}).$mount('#app')