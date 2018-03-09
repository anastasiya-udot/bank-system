<template>
    <b-navbar toggleable="md" type="dark" variant="dark">

        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-navbar-brand>Bank System</b-navbar-brand>

        <b-collapse is-nav id="nav_collapse">

            <b-navbar-nav>
                <b-nav-item href="#/users-panel">Users</b-nav-item>
                <b-nav-item href="#/bank-panel">Bank</b-nav-item>
            </b-navbar-nav>

        </b-collapse>
    </b-navbar>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>

</style>