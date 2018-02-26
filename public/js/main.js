import Vue from 'vue';
import VueRouter from 'vue-router';
import BootstrapVue from 'bootstrap-vue';
import VueResource from 'vue-resource';
import VueModal from 'vue-js-modal'

import BaseTable from './components/Users.vue';

Vue.use(BootstrapVue);
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VueModal);

const routes = [
	{
		path: '/',
		component: BaseTable
	}
];

const router = new VueRouter({ routes });

const app = new Vue({
	router
}).$mount('#app');