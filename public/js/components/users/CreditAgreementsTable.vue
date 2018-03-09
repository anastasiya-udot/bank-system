
<script>
    import AgreementsTable from './AgreementsTable.vue';
    import Credit from '../../mixins/Credit';
    import constants from '../../../../common/constants';

    export default {
        extends: AgreementsTable,
        mixins: [Credit],
        data() {
            return {
                title: 'Credit',
                entryType: constants.ACCOUNT_ENTRY_TYPES.CREDIT
            }
        },
        created() {
            this.getAllCreditPrograms()
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