import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import store from "./store"

import "@/assets/icomoon/style.css"
import MuseUI from "muse-ui"
import 'muse-ui/dist/muse-ui.css'

Vue.use(MuseUI);

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: (h)=> {return h(App)}
  }).$mount("#app")