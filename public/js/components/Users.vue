<template>
    <div>
        <div v-for="user in users" :key="user.id">
            {{ user.name }}
        </div>
    </div>
</template>

<script>
    import Users from '../mixins/Users';

    export default {
        mixins: [Users]
    }
</script>

<style scoped>

</style>