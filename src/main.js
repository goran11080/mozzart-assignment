import Vue from 'vue/dist/vue.js'
import Vuex from "vuex"
import VueRouter from 'vue-router';
import storeData from './store/main';
import {routes} from './routes/index';
import App from "@/App";

Vue.config.productionTip = false

Vue.use(Vuex);
Vue.use(VueRouter);

const store = new Vuex.Store(
    storeData
);

const router = new VueRouter({
  mode: 'history',
  routes,
});

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount("#app")




