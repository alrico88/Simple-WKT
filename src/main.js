import Vue from 'vue';
import App from './App.vue';
import store from './store';
import Notifications from 'vue-notification';

Vue.config.productionTip = false;

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

Vue.use(Notifications);

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
