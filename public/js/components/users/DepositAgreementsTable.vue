
<script>
    import AgreementsTable from './AgreementsTable.vue';
    import Deposit from '../../mixins/Deposit';
    import constants from '../../../../common/constants';

    export default {
        extends: AgreementsTable,
        mixins: [Deposit],
        data() {
            return {
                title: 'Deposit',
                entryType: constants.ACCOUNT_ENTRY_TYPES.DEPOSIT
            }
        },
        created() {
            this.getAllDepositPrograms()
            .then(
                response => {
                    this.accountingEntries = response.body;
                },
                err => {
                    console.log(err);
                }
            );
        }
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