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
            <b-btn
                :variant="'secondary'"
                @click="onEditUserClicked"
                :disabled="!selectedUser">
                Edit user
            </b-btn>
            <b-btn
                :variant="'danger'"
                @click="onRemoveUserClicked"
                :disabled="!selectedUser">
                Remove user
            </b-btn>
            <span class="request-fail">{{requestErrorMessage}}</span>
            <span class="request-ok">{{requestSuccessMessage}}</span>
        </div>
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
            :items="users"
            @row-clicked="onRowClicked">
        </b-table>
    </div>
</template>

<script>
    import Users from '../mixins/Users';
    import UserModal from './userModal/UserModal.vue';
    import constants from '../../../common/constants';

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
                userSchema: constants.USER_SCHEMA,
                selectedUser: null,


                requestErrorMessage: '',
                requestSuccessMessage: '',
            };
        },
        computed: {
            userTableFields() {
                let keys = Object.keys(this.userSchema);

                return keys.map((key) => {
                    return {
                        key: key,
                        sortable: !!this.userSchema[key].sortable,
                        formatter: this.userSchema[key].formatter
                    };
                });
            }
        },
        methods: {
            showDialog(options) {
                this.$modal.show('user-modal', options);
            },

            onCreateUser(user) {
                this.users.push(user);
            },

            onUpdateUser(user) {
                _.keys(user).forEach(key => {
                    this.selectedUser[key] = user[key];
                }, this);
            },

            onCreateUserClicked() {
                this.requestErrorMessage = '';
                this.requestSuccessMessage = '';

                this.showDialog({
                    title: 'Create new user'
                });
            },     

            onEditUserClicked() {
                this.requestErrorMessage = '';
                this.requestSuccessMessage = '';

                this.showDialog({
                    title: `Edit user ${this.selectedUser.name} ${this.selectedUser.surname}`,
                    user: this.selectedUser
                });
            },

            onRemoveUserClicked() {
                this.requestErrorMessage = '';
                this.requestSuccessMessage = '';

                this.removeUser(this.selectedUser)
                .then(
                    response => {
                        this.requestSuccessMessage = `${this.selectedUser.surname} ${this.selectedUser.name} was removed`;
                        this.users = this.users.filter(user => {
                            return user.idNumber !== this.selectedUser.idNumber;
                        })
                        this.selectedUser = null;
                    },
                    err => {
                        this.requestErrorMessage = `Can't remove ${this.selectedUser.surname} ${this.selectedUser.name}. ${err.message || ""}`;
                    }
                )
            },

            onRowClicked(item) {
                if (this.selectedUser) {
                    this.selectedUser._rowVariant = undefined;
                }
                this.selectedUser = item;
                this.selectedUser._rowVariant = 'info';
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
</style>