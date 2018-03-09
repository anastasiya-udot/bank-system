

<script>
    import AccountingEntryPrograms from './AccountingEntryPrograms.vue'
    import Deposit from '../../../mixins/Deposit';
    import schemas from '../../../../../common/schemas';

    export default {
        extends: AccountingEntryPrograms,
        mixins: [Deposit],
        data() {
            return {
                title: 'Deposit Programs'
            }
        },
        created() {
            this.getAllDepositPrograms()
            .then(
                response => {
                    this.programSchema = schemas.DEPOSIT_PROGRAM_SCHEMA;
                    this.programs = response.body;
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