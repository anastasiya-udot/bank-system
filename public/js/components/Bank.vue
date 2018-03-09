<template>
    <div>
        <navigation></navigation>
        <b-nav tabs>
            <b-nav-item href="#/bank-panel/credit-programs">Credit Programs</b-nav-item>
            <b-nav-item href="#/bank-panel/deposit-programs">Deposit Programs</b-nav-item>

            <b-nav-item href="#/bank-panel/bank-accounts">BDF Accounts</b-nav-item>
            <b-nav-item href="#/bank-panel/user-accounts">Users Accounts</b-nav-item>
            <b-nav-item href="#/bank-panel/percent-accounts">Interest Accounts</b-nav-item>
        </b-nav>
        <router-view/>
    </div>
</template>

<script>
    import Navigation from './Navigation.vue';

    export default {
        components: { 
            Navigation
        }
    }
</script>

<style scoped>

</style>