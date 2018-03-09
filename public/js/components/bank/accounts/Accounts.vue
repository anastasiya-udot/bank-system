<template>
    <div>
    <h5 style="padding-left: 10px">{{title}}</h5>
    <b-btn
        :class="'end-day'"
        :variant="'secondary'"
        @click="onEndDayClicked">
        End day
    </b-btn>
    <b-card>
        <b-table 
            :striped="tableOptions.striped"
            :bordered="tableOptions.bordered"
            :outlined="tableOptions.outlined"
            :small="tableOptions.small"
            :hover="tableOptions.hover"
            :dark="tableOptions.dark"
            :fixed="tableOptions.fixed"
            :foot-clone="tableOptions.footClone"
            :fields="accountFields"
            :items="accountsTable">
        </b-table>
    </b-card>
    </div>
</template>

<script>
    import Agreement from '../../../mixins/Agreement';
    import Account from '../../../mixins/Account';
    import _ from 'lodash';

    export default {
        mixins: [Agreement, Account],
        data() {
            return {
                tableOptions: {
                    striped: true,
                    bordered: false,
                    outlined: false,
                    small: true,
                    hover: true,
                    dark: true,
                    fixed: false,
                    footClone: false
                },
                accounts: [],
                accountFields: ['number', 'name', 'amount', 'currency', 'status']
            }
        },
        computed: {
            accountsTable() {
                return _.map(this.accounts, account => {

                    return {
                        number: account.number,
                        code: account.code,
                        name: account.name,
                        amount: account.amount.toFixed(2),
                        currency: account.currency,
                        status: !account.endDate || (new Date(account.endDate).valueOf() >= (new Date()).valueOf()) ? 'Open' : 'Closed'
                    }
                });
            }
        },
        created() {
            this.getAccounts(this.accountType)
            .then(
                response => {
                    this.accounts = response.body;
                },
                error => {
                    console.log(error);
                }
            );
        },
        methods: {
            onEndDayClicked() {
                this.setEndDay(this.accountType)
                .then(
                    response => {
                        this.accounts = response.body;
                    },
                    error => {
                        console.log(error);
                    }
                )
            }
        },
    }
</script>

<style lang="scss">
    .end-day {
        margin: 8px;
    }
</style>