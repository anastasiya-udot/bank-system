<template>
    <div>
        <navigation></navigation>
        <b-nav tabs>
            <b-nav-item href="#/users-panel/users">Users</b-nav-item>
            <b-nav-item href="#/users-panel/deposits">Deposits Agreements</b-nav-item>
            <b-nav-item href="#/users-panel/credits">Credits Agreements</b-nav-item>
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