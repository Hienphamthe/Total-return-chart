import VueCompositionApi from '@vue/composition-api';
import Vue from 'vue';

import App from './App.vue';
import './assets/tailwind.css';

Vue.config.productionTip = false;
Vue.config.devtools = true;

Vue.use(VueCompositionApi);

new Vue({
	render: (h) => h(App)
}).$mount('#app');
