

<script>
    import AccountingEntryPrograms from './AccountingEntryPrograms.vue'
    import Credit from '../../../mixins/Credit';
    import schemas from '../../../../../common/schemas';

    export default {
        extends: AccountingEntryPrograms,
        mixins: [Credit],
        data() {
            return {
                title: 'Credit Programs'
            }
        },
        created() {
            this.getAllCreditPrograms()
            .then(
                response => {
                    this.programSchema = schemas.CREDIT_PROGRAM_SCHEMA;
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