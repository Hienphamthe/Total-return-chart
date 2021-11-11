import VueCompositionApi from '@vue/composition-api';
import Vue from 'vue';
import VueApexCharts from 'vue-apexcharts';

import App from './App.vue';
import './assets/tailwind.css';

Vue.config.productionTip = false;
Vue.config.devtools = true;

Vue.use(VueCompositionApi);
Vue.use(VueApexCharts);

Vue.component('apexchart', VueApexCharts);

new Vue({
	render: (h) => h(App)
}).$mount('#app');
