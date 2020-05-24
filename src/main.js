import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import SuiVue from 'semantic-ui-vue';
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyCPbf6bl8dQDSCR79slG4I8QpLW-6_MzyI",
    libraries: "places", // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)

    //// If you want to set the version, you can do so:
    // v: '3.26',
  },
});
Vue.use(SuiVue);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
