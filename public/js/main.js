import Vue from 'vue';
import VueRouter from 'vue-router';
import BootstrapVue from 'bootstrap-vue';
import VueResource from 'vue-resource';
import VueModal from 'vue-js-modal'

import Users from './components/Users.vue';
import Bank from './components/Bank.vue';

import UserTable from './components/users/UsersTable.vue';
import DepositAgreementsTable from './components/users/DepositAgreementsTable.vue';
import CreditAgreementsTable from './components/users/CreditAgreementsTable.vue';

import DepositPrograms from './components/bank/programs/DepositPrograms.vue';
import CreditPrograms from './components/bank/programs/CreditPrograms.vue';

import PercentAccounts from './components/bank/accounts/PercentAccounts.vue';
import UsersAccounts from './components/bank/accounts/UsersAcconts.vue';
import BankAccounts from './components/bank/accounts/BankAccounts.vue';

Vue.use(BootstrapVue);
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VueModal);

const routes = [
	{
		path: '/users-panel',
		component: Users,
		children: [
			{ path: 'deposits', component: DepositAgreementsTable },
			{ path: 'credits', component: CreditAgreementsTable },
			{ path: 'users', component: UserTable}
		]
	},
	{
		path: '/bank-panel',
		component: Bank,
		children: [
			{ path: 'deposit-programs', component: DepositPrograms },
			{ path: 'credit-programs', component: CreditPrograms },
			
			{ path: 'user-accounts', component: UsersAccounts },
			{ path: 'percent-accounts', component: PercentAccounts },
			{ path: 'bank-accounts', component: BankAccounts },
		]
	}
];

const router = new VueRouter({ routes });

router.replace('/users-panel');

const app = new Vue({
	router
}).$mount('#app');