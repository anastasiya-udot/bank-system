<template>
    <div>
        <user-modal 
        @createdUser="onCreateUser"
        @updatedUser="onUpdateUser"/>

        <div class="control-panel">
            <b-btn
                :variant="'secondary'"
                @click="onCreateUserClicked">
                Create new user
            </b-btn>
            <span class="request-fail">{{requestErrorMessage}}</span>
            <span class="request-ok">{{requestSuccessMessage}}</span>
        </div>
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
                :fields="userTableFields"
                :items="users">
                <template slot="actions" slot-scope="row">
                    <b-button size="sm" @click.stop="row.toggleDetails">
                    {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
                    </b-button>
                    <b-button size="sm" @click.stop="onEditUserClicked(row.item)" class="mr-1">
                        Edit
                    </b-button>
                    <b-button size="sm" :variant="'danger'" @click.stop="onRemoveUserClicked(row.item)" class="mr-1">
                        Remove
                    </b-button>
                </template>
                <template slot="row-details" slot-scope="row">
                    <b-card>
                        <b-list-group>
                            <b-list-group-item v-for="(value, key) in row.item" :key="key" v-if="showDetail(key)">
                                <b>{{getDetailsName(key)}}</b>: {{getDetailsValue(key, value)}}
                            </b-list-group-item>
                        </b-list-group>
                    </b-card>
                </template>
            </b-table>
        </b-card>
    </div>
</template>

<script>
    import Users from '../../mixins/Users';
    import UserModal from './userModal/UserModal.vue';
    import schemas from '../../../../common/schemas';
    import _ from 'lodash';

    export default {
        mixins: [Users],
        components: {
            UserModal
        },
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
                users: [],
                userSchema: schemas.USER_SCHEMA,

                requestErrorMessage: '',
                requestSuccessMessage: '',
            };
        },
        computed: {

            userTableFields() {
                let keys = Object.keys(this.userSchema);
                let items = keys.map((key) => {
                    let item = this.userSchema[key];

                    if (!item.show) {
                        return;
                    }
                    return {
                        key: key,
                        sortable: !!item.sortable,
                        formatter: item.formatter
                    };
                });

                items.push({
                    key: 'actions',
                    label: 'Actions'
                });

                return items;
            }
        },
        methods: {
            showDetail(key) {
                return !!this.userSchema[key];
            },

            getDetailsName(key) {
                let item = this.userSchema[key];

                if (!item) { 
                    return '';
                }

                return _.startCase(key);
            },

            getDetailsValue(key, value) {
                let item = this.userSchema[key];

                if (!item) { 
                    return '';
                }

                if (item.formatter) {
                    value = item.formatter(value);
                }

                return value
            },

            showDialog(options) {
                this.$modal.show('user-modal', options);
            },

            onCreateUser(user) {
                this.users.push(user);
            },

            onUpdateUser(updatedUser) {
                let prevUser = this.users.find(item =>{
                    return item.id === updatedUser.id;
                });

                if (!prevUser) {
                    return;
                }

                _.keys(prevUser).forEach(key => {
                    prevUser[key] = updatedUser[key];
                }, this);
            },

            onCreateUserClicked() {
                this.requestErrorMessage = '';
                this.requestSuccessMessage = '';

                this.showDialog({
                    title: 'Create new user'
                });
            },     

            onEditUserClicked(item) {
                this.requestErrorMessage = '';
                this.requestSuccessMessage = '';

                this.showDialog({
                    title: `Edit user ${item.name} ${item.surname}`,
                    user: item
                });
            },

            onRemoveUserClicked(item) {
                this.requestErrorMessage = '';
                this.requestSuccessMessage = '';

                this.removeUser(item)
                .then(
                    response => {
                        this.requestSuccessMessage = `${item.surname} ${item.name} was removed`;
                        this.users = this.users.filter(user => {
                            return user.idNumber !== item.idNumber;
                        })
                    },
                    err => {
                        this.requestErrorMessage = `Can't remove ${item.surname} ${item.name}. ${err.message || ""}`;
                    }
                )
            }
        },
        created() {
            this.getAllUsers().then(
                response => {
                    this.users = response.body;

                },
                err => {
                    console.log(err);
                }
            )
        }
    }
</script>

<style scoped lang="scss">
    .control-panel {
        padding: 5px;
        margin: 5px;
        width: 100%;
    }

    .request-fail {
        color: red;
        padding-left: 10px;
    }

    .request-ok {
        color: green;
        padding-left: 10px;
    }

    .card-body {
        background-color: lightgrey;
        .list-group-item {
            color: black;
        }
    }
</style>