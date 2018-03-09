<template>
    <div>
        <h5 style="padding-left: 10px">New {{title}} agreement</h5>
        <b-card>
            <b-form @submit="onCommitAgreement">
                 <b-form-group
                        label="Type"
                        label-for="type-input">
                    <b-form-select id="type-input"
                                :options="accountingEntriesDropdown"
                                required
                                v-model="agreement.accountEntryId">
                    </b-form-select>
                </b-form-group>
                <b-form-group
                        label="User"
                        label-for="user-input">
                    <b-form-select id="user-input"
                                :options="usersDropdown"
                                required
                                v-model="agreement.userId">
                    </b-form-select>
                </b-form-group>
                <b-form-group
                        label="Currency"
                        label-for="currency-input">
                    <b-form-select id="currency-input"
                                :options="currenciesDropdown"
                                required
                                v-model="agreement.currency">
                    </b-form-select>
                </b-form-group>
                <b-form-group
                        label="Sum"
                        label-for="sum-input">
                    <b-form-input id="sum-input"
                                type="number"
                                min="0"
                                max="1000"
                                v-model="agreement.sum"
                                required
                                placeholder="Enter sum">
                    </b-form-input>
                </b-form-group>
                <b-form-group v-if="currentEntry.interestRate"
                        label="Percent"
                        label-for="percent-input">
                    <span class="form-label" id="percent-input">
                        {{currentEntry.interestRate}}%
                    </span>
                </b-form-group>
                <b-form-group v-if="currentEntry.duration"
                        label="Duration"
                        label-for="duration-input">
                    <span class="form-label" id="duration-input">
                        {{currentEntry.duration}} days
                    </span>
                </b-form-group>
                <b-form-group v-if="agreement.programStartDate"
                        label="Program Start Date"
                        label-for="duration-input">
                    <span class="form-label" id="duration-input">
                        {{formatDate(agreement.programStartDate)}}
                    </span>
                </b-form-group>
                <b-form-group v-if="agreement.programEndDate"
                        label="Program End Date"
                        label-for="duration-input">
                    <span class="form-label" id="duration-input">
                        {{formatDate(agreement.programEndDate)}}
                    </span>
                </b-form-group>
                <b-button
                    :disabled="!agreement.accountEntryId || !agreement.userId || !agreement.sum || !agreement.currency"
                    type="submit"
                    variant="primary">
                    Commit
                </b-button>
                <b-button
                    @click="clearAgreementForm"
                    type="submit"
                    variant="danger">
                    Clear
                </b-button>
            </b-form>
        </b-card>
        <h5 style="padding-left: 10px">{{title}}s Agreements</h5>
        <b-card>
            <b-table
                v-if="users.length && accountingEntries.length"
                :striped="tableOptions.striped"
                :bordered="tableOptions.bordered"
                :outlined="tableOptions.outlined"
                :small="tableOptions.small"
                :hover="tableOptions.hover"
                :dark="tableOptions.dark"
                :fixed="tableOptions.fixed"
                :foot-clone="tableOptions.footClone"
                :fields="agreementsFields"
                :items="agreementsTable">
                <!-- <template slot="agreementDetails" slot-scope="row">
                    <b-button size="sm" @click.stop="row.toggleDetails">
                    {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
                    </b-button>
                </template>
                <template slot="row-details" slot-scope="row">
                    <b-card>
                        <b-list-group>
                            <b-list-group-item v-for="(value, key) in row.item" :key="key">
                                <b>{{getDetailsName(key)}}</b>: {{getDetailsValue(key, value)}}
                            </b-list-group-item>
                        </b-list-group>
                    </b-card>
                </template> -->
            </b-table>
        </b-card>
    </div>
</template>

<script>
    import schemas from '../../../../common/schemas';
    import _ from 'lodash';
    import Users from '../../mixins/Users';
    import formatters from '../../../../common/formatters';
    import Agreement from '../../mixins/Agreement';

    const DAYS_MS = 24 * 60 * 60 * 1000;

    export default {
        mixins: [Agreement, Users],
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

                agreements: [],
                accountingEntries: [],
                users: [],

                currenciesDropdown: [],
                currentEntry: {},
                agreementsFields: ['userIdNumber', 'type', 'agreementNumber', 'sum', 'currency', 'interestRate', 'startDate', 'endDate'],

                agreement: {
                    accountEntryId: null,
                    userId: null,
                    currency: '',
                    sum: 0,
                    programStartDate: null,
                    programEndEnd: null
                }
            }
        },
        watch: {
            'agreement.accountEntryId': function(newValue, oldValue) {
                let entry = _.find(this.accountingEntries, entry => entry.id === this.agreement.accountEntryId);

                if (!entry) {
                    return {};
                }

                this.currentEntry = entry;
                this.agreement.programStartDate = new Date().valueOf();
                this.agreement.programEndDate = this.agreement.programStartDate + this.currentEntry.duration * DAYS_MS;
                this.currenciesDropdown = this.currentEntry.currencies.map(cur => {
                    return {
                        text: cur,
                        value: cur
                    }
                });
            }
        },
        created() {
            this.getAllUsers()
            .then(
                response => {
                    this.users = response.body;
                },
                error => {
                    console.log(error);
                }
            );

            this.getAgreements(this.entryType)
            .then(
                response => {
                    this.agreements = response.body;
                },
                err => {
                    console.log(err);
                }
            );
        },
        computed: {

            agreementTitle() {
                return _.startCase(this.entryType);
            },

            agreementsTable() {
                return _.map(this.agreements, function(agreement) {
                    let user = this.users.find(user => user.id === agreement.userId);
                    let program = this.accountingEntries.find(entry => {
                        return entry.id === agreement.accountEntryId;
                    });
                    
                    if (!user || !program) {
                        return;
                    }
                    
                    return {
                        userIdNumber: user.idNumber,
                        agreementNumber: agreement.number,
                        type: program.name,
                        sum: agreement.sum,
                        currency: agreement.currency,
                        interestRate: formatters.percent(program.interestRate),
                        startDate: formatters.date(agreement.programStartDate),
                        endDate: formatters.date(agreement.programEndDate)
                    };
                }.bind(this));
            },

            accountingEntriesDropdown() {
                return this.accountingEntries.map(entry => {
                    return {
                        text: entry.name,
                        value: entry.id
                    };
                });
            },

            usersDropdown() {
                return this.users.map(user => {
                    return {
                        text: `${user.name} ${user.surname} ${user.patronymic}, ${user.idNumber}`,
                        value: user.id
                    };
                });
            }
        },
        methods: {
            formatDate(value) {
                return formatters.date(value);
            },

            clearAgreementForm() {
                this.agreement.accountEntryId = null;
                this.agreement.userId = null;
                this.agreement.currency = '';
                this.agreement.sum = 0;
                this.agreement.programStartDate = null;
                this.agreement.programEndDate = null;


                this.currenciesDropdown = [];
                this.currentEntry = {};
            },

            getDetailsName(key) {
                return 'lala';
            },

            getDetailsValue(key, value) {
                return value;
            },

            showDetails() {

            },

            onCommitAgreement() {
                this.postNewAgreement(this.entryType, this.agreement)
                .then(
                    response => {
                        this.agreements.push(response.body);
                        this.clearAgreementForm();
                    },
                    err => {
                        console.log(err);
                    }
                )
            }
        },
    }
</script>