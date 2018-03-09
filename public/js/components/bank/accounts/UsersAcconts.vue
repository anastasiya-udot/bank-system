<script>
    import constants from '../../../../../common/constants';
    import Accounts from './Accounts.vue';

    export default {
        extends: Accounts,
        data() {
            return {
                title: 'Users Accounts',
                accountType: constants.ACCOUNT_TYPES.USER
            }
        },
    }
</script>

<style lang="scss">
    .card-body {
        background-color: lightgrey;

        .list-group-item {
            color: black;
        }
    }
</style>